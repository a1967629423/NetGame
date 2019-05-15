import { IInput, IPSM } from "../../frame/InputManage";
import { LineRender } from "../render/LineRender";
import ScenesObject from "../../utility/ScenesObject";
import GameObjectManage from "../manage/GameObjectManange";
import { SiteSM } from "../site/SiteMachine";
import { SLDSM } from "../site/SiteLine";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class VehicleButton extends cc.Component implements IInput {
    touch(touchEvent: cc.Touch) {
    }
    touchStart(touchEvent: cc.Touch) {

    }
    async touchEnd(touchEvent: cc.Touch) {
        if(this.lineRender.HitTest(touchEvent.getLocation(),null))
        {
            var site = ScenesObject.instance.getComponentInChildren(SiteSM.SiteMachine);
            var lien = site.SiteLines[0];
            var vechicle = await GameObjectManage.Instance.getVehicle(0,lien);
            if(vechicle)
            {
                var vehicles = ScenesObject.instance.node.getChildByName('vehicles');
                vehicles.addChild(vechicle.node);
                lien.addVehicle(vechicle);
            }
        }
    }
    async touchCancel(touchEvent: cc.Touch) {
        if(this.lineRender.HitTest(touchEvent.getLocation(),null))
        {
            var site = ScenesObject.instance.getComponentInChildren(SiteSM.SiteMachine);
            var lien = site.SiteLines[0];
            var vechicle = await GameObjectManage.Instance.getVehicle(0,lien);
            if(vechicle)
            {
                var vehicles = ScenesObject.instance.node.getChildByName('vehicles');
                vehicles.addChild(vechicle.node);
                lien.addVehicle(vechicle);
            }
        }
    }

    @property(cc.Label)
    label: cc.Label = null;
    @property(LineRender.LineRenderStateMachine)
    lineRender:LineRender.LineRenderStateMachine = null;
    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.lineRender = ScenesObject.instance.getComponentInChildren(LineRender.LineRenderStateMachine);
        var input = IPSM.InputManage.getInstance(this);
        input.addInput(this);
    }

    // update (dt) {}
}
