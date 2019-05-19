import { MSM } from "../../frame/StateMachine/StateMachine";
import { MSMDsc } from "../../frame/StateMachine/StateDec";
import RenderBase, { RenderBaseState } from "./Render";
import { SiteLineType, SiteType } from "../Enums";
import { IInput, IPSM } from "../../frame/InputManage";
import ScenesObject from "../../utility/ScenesObject";
import { SiteSM } from "../site/SiteMachine";
import { Helper } from "../../utility/Helper";
import PolygonEditor from "../../utility/PolygonEditor";

const { ccclass, property } = cc._decorator;
const { State } = MSM;
const { mStateMachine, mSyncFunc,mSyncAttachFunc } = MSMDsc
export module SiteRender {
    @ccclass
    @mStateMachine
    export class SiteRenderStateMachine extends RenderBase implements IInput {
        @mSyncAttachFunc
        @mSyncFunc
        touch(touchEvent: cc.Touch) {
        }
        @mSyncFunc
        touchStart(touchEvent: cc.Touch) {

        }
        @mSyncAttachFunc
        @mSyncFunc
        touchEnd(touchEvent: cc.Touch) {

        }
        @mSyncAttachFunc
        @mSyncFunc
        touchCancel(touchEvent: cc.Touch) {

        }
        childChange()
        {
            this.hitTestArray = [];
            this.node.children.forEach(v=>{
                var sm = v.getComponent(SiteSM.SiteMachine);
                if(sm)this.hitTestArray.push(sm);
            })
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
        hitTestArray:SiteSM.SiteMachine[] = [];
        hitTest(point:cc.Vec2,...args):SiteSM.SiteMachine
        {
            var testPoint = this.node.convertToNodeSpaceAR(IPSM.ConvertInputPointToWorld(point,this.node));
            for(var idx in this.hitTestArray)
            {
                var v = this.hitTestArray[idx];
                var polygon = v.getComponent(PolygonEditor);
                if(polygon)
                {
                    var ins = IPSM.InputManage.getInstance(v);
                    if(ins.HitTest(point,...args))return v;
                }
                else
                {
                    if(Helper.HitTestHelper.CircleHitTest(v.node.position,testPoint,this.SiteRadius))return v;
                }
            }      
            return null;
        }
        start() {
            super.start();
            debugger;
            this.node.on(cc.Node.EventType.CHILD_ADDED,this.childChange,this)
            this.node.on(cc.Node.EventType.CHILD_REMOVED,this.childChange,this)
            this.node.on(cc.Node.EventType.CHILD_REORDER,this.childChange,this)
            var ipIns = IPSM.InputManage.getInstance(this);
            ipIns.addInput(this);
            ipIns.onHitTest((point,lister)=>{
                var hitedSite = this.hitTest(point,lister)
                if(hitedSite)
                {
                    
                    this.emit('hited',hitedSite,this.node.convertToNodeSpaceAR(IPSM.ConvertInputPointToWorld(point,this.node)));
                    return true;
                }
                return false;
                
            },this);
            this.childChange();
            this.emit('lineDrag');
        }
        @mSyncAttachFunc
        update(dt)
        {
            super.update(dt);
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