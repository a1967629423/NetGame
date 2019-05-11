import { MSM } from "../../frame/StateMachine/StateMachine";
import { MSMDsc } from "../../frame/StateMachine/StateDec";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property,requireComponent} = cc._decorator;

@ccclass
@requireComponent(cc.Graphics)
export default class RenderBase extends MSM.StateMachine {
    graphics:cc.Graphics = null;
    start()
    {
        this.graphics = this.getComponent(cc.Graphics);
        super.start();
    }
    drawBegin(){this.graphics.moveTo(0,0)}
    @MSMDsc.mSyncFunc
    draw(){}
    @MSMDsc.mSyncFunc
    updateRender(){}
}
export class RenderBaseState extends MSM.State
{
    context:RenderBase
    draw(){}
    updateRender(){}
}
