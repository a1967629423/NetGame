import { MSM } from "../../frame/StateMachine/StateMachine";
import { MSMDsc } from "../../frame/StateMachine/StateDec";
import ScenesObject from "../../utility/ScenesObject";

const { ccclass, property } = cc._decorator;
export module TimeMSM {
    @ccclass
    @MSMDsc.mStateMachine
    export class TimeManage extends MSM.StateMachine {

        @property
        oneDayTime: number = 60;
        @property
        steptime: number = 1;
        nowStep: number = 0;
        nowTime: number = 0;
        SiteNode:cc.Node = null
        start() {
            super.start();
            this.SiteNode = ScenesObject.instance.node.children.find(value=>value.name==='sites');
        }
        update(dt) {
            super.update(dt)
        }

        // update (dt) {}
    }
    export class TimeManageState extends MSM.State
    {
        context:TimeManage
    }

}
