import { SiteType } from "../Enums";
import { Vehicle } from "../vehicle/VehicleMachine";
import { SiteSM, SiteLineSM } from "./SiteMachine";
import { SLDSM } from "./SiteLine";
import ObjectPool, { IObpool, IOFPool } from "../../frame/ObjectPool/ObjectPool";
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
        var nowLine = vehicle.line;
        var nextLine = dir ? nowLine.NextPath : nowLine.LastPath;
        var hastOtherLineSite: Path.VehiclePath[] = []

        //到终点都没有
        // for (var i in hastOtherLineSite) {
        //     var value = hastOtherLineSite[i];
        //     var next = value.NextLine;
        //     while (next) {
        //         if (next.NowSite.SiteType === this.peopleType&&next.NowSite!==this.sourceSite) {
        //             console.log('要去转车')
        //             return true;
        //         }
        //         next = next.NextLine;
        //     }
        //     var last = value.LastLine;
        //     while (last) {
        //         if (last.NowSite.SiteType === this.peopleType&&last.NowSite!==this.sourceSite) {
        //             console.log('要去转车')
        //             return true
        //         }
        //         last = last.LastLine
        //     }

        // }
        return false;
    }
    GetOffVehicle(vehicle: Vehicle.VehicleMachine): boolean {
        // var dir = vehicle.rundir;
        // var nowLine = vehicle.line;
        // if (nowLine.NowSite.SiteType === this.peopleType) return true;
        // var nextLine = dir ? nowLine.NextLine : nowLine.LastLine;
        // var ni =0;
        // var oni = 0;
        // var oli = 0;
        // var mainHave = false;
        // var otherHave = false;
        // while (nextLine) {
        //     if (nextLine.NowSite.SiteType === this.peopleType&&nextLine.NowSite!=this.sourceSite) {
        //         mainHave = true;
        //         break
        //     }
        //     ni++;
        //     nextLine = dir ? nextLine.NextLine : nextLine.LastLine;
        // }
        // for (var i in nowLine.NowSite.SiteLines) {
        //     var value = nowLine.NowSite.SiteLines[i]
        //     if (value.LineType !== nowLine.LineType) {
        //         var next = value.NextLine
        //         while (next) {
        //             if (next.NowSite.SiteType === this.peopleType) {
        //                 console.log('转车')
        //                 otherHave = true;
        //                 break
        //             }
        //             oni++;
        //             next = next.NextLine;
        //         }
        //         var last = value.LastLine;
        //         if (last) {
        //             if (last.NowSite.SiteType === this.peopleType) {
        //                 console.log('转车')
        //                 otherHave = true;
        //                 break
        //             }
        //             oli++;
        //             last = last.LastLine;
        //         }

        //     }
        // }
        // if(mainHave&&otherHave)
        // {
        //     if(mainHave&&(ni<=oni||ni<=oli))
        //     {
        //         return false;
        //     }
        //     return true;
        // }
        // else
        // {
        //     if(otherHave)
        //     {
        //         return true;
        //     }
        // }

        return false;
    }
    // update (dt) {}
}
