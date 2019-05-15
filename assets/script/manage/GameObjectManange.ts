import PrefabFactor from "../../frame/PrefabFactory/PrefabFactory";
import { SiteType, SiteLineType } from "../Enums";
import { SiteSM, SiteLineSM } from "../site/SiteMachine";
import { Vehicle } from "../vehicle/VehicleMachine";
import SitePeople from "../site/SitePeople";
import { SLDSM } from "../site/SiteLine";
import ScenesObject from "../../utility/ScenesObject";
import { LineRender } from "../render/LineRender";
import { SiteRender } from "../render/SiteRender";
import { LineClear } from "./LineClearManage";
import ObjectFactory from "../../frame/ObjectPool/ObjectFactory";
import { Path } from "../Path/PathSM";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameObjectManage extends cc.Component {


    private static _instance: GameObjectManage = null;
    static get Instance(): GameObjectManage {
        if (!this._instance) {
            let ins = PrefabFactor.Instance
            var node = new cc.Node('GameObjectManage');
            var manage = node.addComponent(GameObjectManage);
            var _keys = Object.keys(SiteLineType);
            var keys: string[] = [];
            _keys.forEach(value => { if (Number.parseFloat(value).toString() === 'NaN') { keys.push(value) } })
            var count = keys.length - 1;
            manage.lineCount = count;
            for (var item = 0; item < count; item++) {
                var type: number = SiteLineType[keys[item]];
                manage.saveLineType.push(type);
                manage.residueLineType.push(type);
            }
            this._instance = manage;
            cc.director.getScene().addChild(node);
        }
        return this._instance;
    }
    vehicleCount: number = 2;
    lineCount: number = 2;
    saveLineType: SiteLineType[] = []
    residueLineType: SiteLineType[] = []
    GOCache: { Vehicle: boolean, Line: boolean, Site: boolean } = { Vehicle: false, Line: false, Site: false }
    PathFactory: ObjectFactory<Path.VehiclePath> = null;
    async getVehicle(nowProgress: number, line: Path.VehiclePath) {
        var config = await PrefabFactor.LoadRes(PrefabFactor.prefabConfig);
        if (config && config.json.vehicle && this.vehicleCount > 0) {
            this.vehicleCount--;
            var vehicle = await PrefabFactor.Instance.pop_path(config.json.vehicle.path)
            if (!this.GOCache.Vehicle) this.GOCache.Vehicle = true;
            if (vehicle) {
                debugger;
                var machine = vehicle.getComponent(Vehicle.VehicleMachine)
                machine.nowProgress = nowProgress;
                machine.line = line;
                machine.nowSite = nowProgress === line.allLength ? line.nextSite : line.lastSite;
                return machine;
            }
        }
    }
    getLineType(type: SiteLineType) {
        var idx = this.residueLineType.findIndex(value => value === type)
        if (idx > -1) {
            this.lineCount--;
            this.residueLineType.splice(idx, 1);
        }
    }
    addLineType(type: SiteLineType) {
        if (!this.saveLineType.findIndex(value => value === type)) {
            this.lineCount++;
            this.residueLineType.push(type);
        }
    }
    getOperatorType(t: SiteLineType, last: SiteSM.SiteMachine, now: SiteSM.SiteMachine, next: SiteSM.SiteMachine) {
        //0未知 1 增加 2 修改(中间跨越多个需要清除0) 3删除
        var nowLine = now ? now.SiteLines.find(value => value.PathType === t) : null;
        var nextLine = next ? next.SiteLines.find(value => value.PathType === t) : null;
        //var lastLine = last?last.SiteLines.find(value=>value.LineType===t):null;
        if (nowLine) {
            if (nextLine) {
                if (nextLine.isBegin || nextLine.isEnd || nowLine.isBegin || nowLine.isEnd) {
                    return 3;
                }
            }
            else if ((nowLine.nextSite===now&&nowLine.isEnd) || (nowLine.lastSite===now&&nowLine.isBegin)) {
                return 1;
            }
            else {
                return 2;
            }
        }
        else if (!nextLine) {
            return 1;
        }
        else {
            return 0;
        }


    }
    async CreateLine(nowSite: SiteSM.SiteMachine, nextSite: SiteSM.SiteMachine, type: SiteLineType) {
        if (!this.PathFactory) this.PathFactory = new ObjectFactory<Path.VehiclePath>(true, Path.VehiclePath);
        var line = this.PathFactory.pop(nowSite, nextSite, type);
        if (line) {
            nowSite.addLine(line);
            nextSite.addLine(line);
            return line;
        }
        return null;
    }
    async getLine(type: SiteLineType, lastSite: SiteSM.SiteMachine, nowSite: SiteSM.SiteMachine, endSite: SiteSM.SiteMachine): Promise<SLDSM.SiteLine> {
        var operatorType = this.getOperatorType(type, lastSite, nowSite, endSite)
        this.getLineType(type);
        var nSL = nowSite.SiteLines.find(value => value.PathType === type && !(value.mask & 13));
        var nextSl = endSite.SiteLines.find(value => value.PathType === type && !(value.mask & 13));
        var LR = ScenesObject.instance.getComponentInChildren(LineRender.LineRenderStateMachine);
        switch (operatorType) {
            case 1:
                //增加
                var newPath = await this.CreateLine(nowSite, endSite, type);
                if (newPath.isBegin && newPath.isEnd) {
                    var vehiclesNode = ScenesObject.instance.node.getChildByName('vehicles')
                    var vehicle = await this.getVehicle(0, newPath);
                    vehiclesNode.addChild(vehicle.node);
                }
                break;
            case 2:
                var nextPath = nSL.NextPath
                var nextSite = nextPath.nextSite;
                nextPath.mask|=15;
                var line1 = await this.CreateLine(endSite,nextSite,type);
                var line2 = await this.CreateLine(nowSite, endSite, type);
                LR.updateRender();
                LineClear.LineClearManage.Instance.updateClear();
                break;
            case 3:
                nSL.mask |= 5;
                LineClear.LineClearManage.Instance.updateClear();
                
                break;
            case 4:

                break;
            default:
                break;
        }
        LR.updateRender();
        return null

    }
    async getSite(stype: SiteType) {
        var config = await PrefabFactor.LoadRes(PrefabFactor.prefabConfig);
        if (config && config.json.site) {
            var sites: [] = config.json.site;
            var siteNode = await PrefabFactor.Instance.pop_path(sites[SiteType[stype]]);
            if (!this.GOCache.Site) this.GOCache.Site = true;
            var site = siteNode.getComponent(SiteSM.SiteMachine)
            return site;
        }
        return null;
    }
    async getPeople(PeopleType: SiteType, Site: SiteSM.SiteMachine): Promise<SitePeople> {
        var config = await PrefabFactor.LoadRes(PrefabFactor.prefabConfig);
        if (config && config.json.people) {
            var peoples: [] = config.json.people;
            var people = await PrefabFactor.Instance.pop_path(peoples[SiteType[PeopleType]]);
            if (people) {
                var sp = people.getComponent(SitePeople)
                sp.sourceSite = Site
                return sp;
            }
        }
        return null;
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    ScenesComponent: ScenesObject = null;
    LineRenderMachine: LineRender.LineRenderStateMachine = null;
    SiteRenderMachine: SiteRender.SiteRenderStateMachine = null;
    start() {
        this.ScenesComponent = ScenesObject.instance;
        if (this.ScenesComponent) {
            this.LineRenderMachine = this.ScenesComponent.getComponentInChildren(LineRender.LineRenderStateMachine);
            this.SiteRenderMachine = this.ScenesComponent.getComponentInChildren(SiteRender.SiteRenderStateMachine);
        }
    }

    // update (dt) {}
    onDestroy() {
        if (GameObjectManage._instance)
            GameObjectManage._instance = null;
    }
}
