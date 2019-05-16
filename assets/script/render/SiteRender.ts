import { MSM } from "../../frame/StateMachine/StateMachine";
import { MSMDsc } from "../../frame/StateMachine/StateDec";
import RenderBase, { RenderBaseState } from "./Render";
import { SiteLineType } from "../Enums";
import { IInput, IPSM } from "../../frame/InputManage";
import ScenesObject from "../../utility/ScenesObject";
import { SiteSM } from "../site/SiteMachine";

const { ccclass, property } = cc._decorator;
const { State } = MSM;
const { mStateMachine, mSyncFunc } = MSMDsc
export module SiteRender {
    @ccclass
    @mStateMachine
    export class SiteRenderStateMachine extends RenderBase implements IInput {
        @mSyncFunc
        touch(touchEvent: cc.Touch) {

        }
        @mSyncFunc
        touchStart(touchEvent: cc.Touch) {

        }
        @mSyncFunc
        touchEnd(touchEvent: cc.Touch) {

        }
        @mSyncFunc
        touchCancel(touchEvent: cc.Touch) {

        }
        childChange()
        {
            this.updateRender();
        }
        private static _Instance:SiteRenderStateMachine = null;
        static get Instance()
        {
            if(!this._Instance)
            {
                this._Instance = ScenesObject.instance.getComponentInChildren(SiteRenderStateMachine);
            }
            return this._Instance;
        }
        hitTest():SiteSM.SiteMachine
        {
            return null;
        }
        start() {
            super.start();
            this.node.on(cc.Node.EventType.CHILD_ADDED,this.childChange,this)
            this.node.on(cc.Node.EventType.CHILD_REMOVED,this.childChange,this)
            this.node.on(cc.Node.EventType.CHILD_REORDER,this.childChange,this)
            var ipIns = IPSM.InputManage.getInstance(this);
            ipIns.onHitTest(point=>{
                
                return false;
            },this)
        }
        onDestroy()
        {
            this.node.off(cc.Node.EventType.CHILD_ADDED,this.childChange,this)
            this.node.off(cc.Node.EventType.CHILD_REMOVED,this.childChange,this)
            this.node.off(cc.Node.EventType.CHILD_REORDER,this.childChange,this)
            if(SiteRenderStateMachine._Instance)SiteRenderStateMachine._Instance = null;
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
    export class SiteRenderState extends RenderBaseState implements IInput
    {
        touch(touchEvent: cc.Touch) {

        }
        touchStart(touchEvent: cc.Touch) {

        }
        touchEnd(touchEvent: cc.Touch) {

        }
        touchCancel(touchEvent: cc.Touch) {

        }
        context:SiteRenderStateMachine;
    }

}