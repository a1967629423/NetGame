import { MSM } from "../../frame/StateMachine/StateMachine";
import { MSMDsc } from "../../frame/StateMachine/StateDec";
import RenderBase, { RenderBaseState } from "./Render";
import { SiteLineType } from "../Enums";

const { ccclass, property } = cc._decorator;
const { State } = MSM;
const { mStateMachine, mSyncFunc } = MSMDsc
export module SiteRender {
    @ccclass
    @mStateMachine
    export class SiteRenderStateMachine extends RenderBase {
        childChange()
        {
            this.updateRender();
        }
        start() {
            super.start();
            this.node.on(cc.Node.EventType.CHILD_ADDED,this.childChange,this)
            this.node.on(cc.Node.EventType.CHILD_REMOVED,this.childChange,this)
            this.node.on(cc.Node.EventType.CHILD_REORDER,this.childChange,this)
        }
        onDestroy()
        {
            this.node.off(cc.Node.EventType.CHILD_ADDED,this.childChange,this)
            this.node.off(cc.Node.EventType.CHILD_REMOVED,this.childChange,this)
            this.node.off(cc.Node.EventType.CHILD_REORDER,this.childChange,this)
        }
        draw()
        {
            super.draw();
        }
        nowShowType:SiteLineType = SiteLineType.red;
        @property
        SiteRadius:number = 50;
        active(LineType:SiteLineType)
        {
            this.nowShowType = LineType;
            this.emit('active');
        }
        updateRender()
        {
            this.draw();
        }
    }
    export class SiteRenderState extends RenderBaseState
    {
        context:SiteRenderStateMachine;
    }

}