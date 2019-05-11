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
    vehicleCount: number = 3;
    lineCount: number = 2;
    saveLineType: SiteLineType[] = []
    residueLineType: SiteLineType[] = []
    GOCache: { Vehicle: boolean, Line: boolean, Site: boolean } = { Vehicle: false, Line: false, Site: false }
    async getVehicle(nowSite: SiteSM.SiteMachine, nowProgress: number, line: SLDSM.SiteLine) {
        var config = await PrefabFactor.LoadRes(PrefabFactor.prefabConfig);
        if (config && config.json.vehicle && this.vehicleCount > 0) {
            this.vehicleCount--;
            var vehicle = await PrefabFactor.Instance.pop_path(config.json.vehicle.path)
            if (!this.GOCache.Vehicle) this.GOCache.Vehicle = true;
            if (vehicle) {
                var machine = vehicle.getComponent(Vehicle.VehicleMachine)
                machine.nowSite = nowSite;
                machine.nowProgress = nowProgress;
                machine.line = line;
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
        var nowLine = now ? now.SiteLines.find(value => value.LineType === t) : null;
        var nextLine = next ? next.SiteLines.find(value => value.LineType === t) : null;
        //var lastLine = last?last.SiteLines.find(value=>value.LineType===t):null;
        if (nowLine) {
            if (nextLine) {
                if (nowLine.NextLine == nextLine) {
                    if (nextLine.isEnd || nowLine.isBegin) {
                        return 3;
                    }
                    else {
                        return 0;
                        //新加线
                    }
                }
                else if (nowLine.LastLine == nextLine) {
                    if (nowLine.isEnd || nextLine.isBegin) {
                        return 3;
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    return 2;
                }
            }
            else {
                if (nowLine.isEnd) {
                    return 1;
                }
                else if (nowLine.isBegin) {
                    return 4;
                }
                else {
                    return 2;
                }
            }
        }
        else {
            return 1;
        }


    }
    async CreateLine(lineName:string,Site:SiteSM.SiteMachine,type:SiteLineType)
    {
        var line = await PrefabFactor.Instance.pop_path(lineName,type);
        if(line)
        {
            var Sl = line.getComponent(SLDSM.SiteLine);
            if(Sl)
            {
                Site.addLine(Sl)
                Sl.LineType = type;
                Sl.addSiteLines()
            }
            return Sl;
        }
        return null;
    }
    async getLine(type: SiteLineType, lastSite: SiteSM.SiteMachine, nowSite: SiteSM.SiteMachine, endSite: SiteSM.SiteMachine): Promise<SLDSM.SiteLine> {
        var config = await PrefabFactor.LoadRes(PrefabFactor.prefabConfig);
        if (config && config.json.line) {
            var operatorType = this.getOperatorType(type, lastSite, nowSite, endSite)
            this.getLineType(type);
            var lines: [] = config.json.line;
            var nSL = nowSite.SiteLines.find(value => value.LineType === type);
            var nextSl = endSite.SiteLines.find(value => value.LineType === type);
            var lineName = lines['baseline'];
            if (!nextSl) {
                nextSl = await this.CreateLine(lineName,endSite,type);
            }
            if (!nSL) {
                nSL = await this.CreateLine(lineName,nowSite,type)
            }
            if (!this.GOCache.Line) this.GOCache.Line = true;
            let linesnode = ScenesObject.instance.node.getChildByName('lines');
            switch (operatorType) {
                case 1:
                    //增加
                    nSL.linkTo(nextSl);
                    if(!nSL.node.parent)
                    linesnode.addChild(nSL.node);
                    linesnode.addChild(nextSl.node);
                    nSL.node.position = nowSite.node.position;
                    nSL.caculatePath();
                    break;
                case 2:
                    //修改
                    //连接原先两个点
                    //一次删两个
                    nSL.ChangeFlag = true;
                    nSL.ClearFlag = true;
                    var lastLine = nSL.LastLine;
                    var nextLine = nSL.NextLine;
                    nSL = nextSl;
                    nSL.linkTo(nextLine);
                    lastLine.linkTo(nSL);
                    linesnode.addChild(nextSl.node);
                    nextSl.node.position = endSite.node.position;
                    lastLine.caculatePath();
                    nSL.caculatePath();
                    LineClear.LineClearManage.Instance.updateClear();
                    break;
                case 3:
                    debugger;
                    var removeLine:SLDSM.SiteLine = null;
                    if (nSL.isEnd || nextSl.isBegin) {
                        removeLine = nSL;
                    }
                    if (nSL.isBegin || nextSl.isEnd) {
                        removeLine = nSL;
                    }
                    if(nSL.isEnd)
                    {
                        nSL.LastLine.HidenFlag=true;
                    }
                    removeLine.ClearFlag = true;
                    var render = ScenesObject.instance.getComponentInChildren(LineRender.LineRenderStateMachine);
                    if(render)
                    {
                        render.updateRender();
                    }
                    LineClear.LineClearManage.Instance.updateClear();

                    break;
                case 4:
                    nextSl.linkTo(nSL);
                    linesnode.addChild(nextSl.node);
                    nextSl.node.position = endSite.node.position;
                    nextSl.caculatePath();
                    break;
                //删除
                default:
                    break;
            }
            
            return nSL;
            // var LSm = await SiteLineSM.SiteLineMachine.getLM(nowSite,lastSite,endSite,type,Line);
            // if(LSm)
            // {
            //     var siteline = Line.getComponent(SLDSM.SiteLine);
            //     siteline.line = LSm;
            //     var linesnode = ScenesObject.instance.node.getChildByName('lines');
            //     linesnode.addChild(Line);
            //     Line.position = nowSite.node.position;
            //     return siteline
            // }
        }
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
