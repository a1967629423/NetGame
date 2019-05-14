import { SiteType } from "../Enums";
import { Vehicle } from "../vehicle/VehicleMachine";
import { SiteSM } from "./SiteMachine";
import { IObpool } from "../../frame/ObjectPool/ObjectPool";
import { Score } from "../manage/ScoreManage";
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
export default class SitePeople extends cc.Component implements IObpool {
    unuse() {
        Score.ScoreManage.getInstance(Score.ScoreType.people).addScore(1);
    }
    reuse() {

    }
    recycle(value: any) {

    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    @property({ type: cc.Enum(SiteType) })
    peopleType: SiteType = SiteType.rect
    sourceSite: SiteSM.SiteMachine = null
    start() {
    }
    GetInVehicle(vehicle: Vehicle.VehicleMachine): boolean {
        var dir = vehicle.rundir;
        var nowPath = vehicle.line;
        var hasOtherLineSite: Path.VehiclePath[] = [];
        while (nowPath) {
            var nowSite = dir ? nowPath.nextSite : nowPath.lastSite;
            if (nowSite !== this.sourceSite) {
                if (nowSite.SiteType === this.peopleType) {
                    return true;
                }
                else {
                    nowSite.SiteLines.forEach(P => {
                        if (!(P.mask & 13) && P.PathType !== nowPath.PathType) {
                            if (!hasOtherLineSite.some(v => v.PathType === P.PathType)) {
                                hasOtherLineSite.push(P);
                            }
                        }
                    })
                }
            }
            nowPath = dir ? nowPath.NextPath : nowPath.LastPath;
        }

        //检测从其他线能否到达目的地
        for (var i in hasOtherLineSite) {

            for (var ndir = true, idx = 0; idx < 2; idx++ , ndir = !ndir) {
                var P = hasOtherLineSite[i];
                while (P) {
                    var nowSite = ndir ? P.nextSite : P.lastSite;
                    if (nowSite.SiteType === this.peopleType && nowSite !== this.sourceSite) {
                        return true;
                    }
                    P = ndir ? P.NextPath : P.LastPath;
                }
            }
        }
        return false;
    }
    GetOffVehicle(vehicle: Vehicle.VehicleMachine): boolean {
        var hasOtherLineSite: Path.VehiclePath[] = []
        var nowSite = vehicle.nowSite;
        if (nowSite && nowSite !== this.sourceSite && nowSite.SiteType === this.peopleType) {
            return true;
        }
        nowSite.SiteLines.forEach(P => {
            if (!(P.mask & 13)) {
                if (!hasOtherLineSite.some(v => v.PathType === P.PathType)) {
                    hasOtherLineSite.push(P);
                }
            }
        });
        //检测从其他线能否到达目的地
        for (var i in hasOtherLineSite) {
            for (var ndir = true, idx = 0; idx < 2; idx++ , ndir = !ndir) {
                var P = hasOtherLineSite[i];
                while (P) {
                    var nowSite = ndir ? P.nextSite : P.lastSite;
                    if (nowSite.SiteType === this.peopleType && nowSite !== this.sourceSite) {
                        return true;
                    }
                    P = ndir ? P.NextPath : P.LastPath;
                }
            }
        }

        return false;
    }
    // update (dt) {}
}
