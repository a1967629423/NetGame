import { MSM } from "../../frame/StateMachine/StateMachine";
import { MSMDsc } from "../../frame/StateMachine/StateDec";
import RenderBase, { RenderBaseState } from "./Render";
import { IInput, IPSM } from "../../frame/InputManage";
import { Helper } from "../../utility/Helper";
import { SLDSM } from "../site/SiteLine";
import { SiteRender } from "./SiteRender";
import ScenesObject from "../../utility/ScenesObject";
import { Path } from "../Path/PathSM";


const { ccclass, property } = cc._decorator;
const { StateMachine, State } = MSM;
const { mStateMachine, mSyncFunc } = MSMDsc;
export module LineRender {
    @ccclass
    @mStateMachine
    export class LineRenderStateMachine extends RenderBase implements IInput {
        @mSyncFunc
        touch(touchEvent: cc.Touch) {
        }
        @mSyncFunc
        touchStart(touchEvent: cc.Touch) {
            if(this.siteRender)
            {
                this.siteRender.active(this._HitedLine.PathType);
            }
        }
        @mSyncFunc
        touchEnd(touchEvent: cc.Touch) {
        }
        @mSyncFunc
        touchCancel(touchEvent: cc.Touch) {
        }
        _HitedLine:Path.VehiclePath = null;
        HitTest(point:cc.Vec2,listen):boolean
        {
            var childrens = Path.VehiclePath.allPath;
            var testPoint=this.node.convertToNodeSpaceAR(IPSM.ConvertInputPointToWorld(point,this.node));
            if(childrens.length>1)
            {
                for(var i =0;i<childrens.length;i++)
                {
                    var nSite = childrens[i];
                    var points = nSite.changePoint;
                    var lastPoint:Helper.Point = nSite.lastSite.node.position; 
                    for(var idx=0;idx<points.length;idx++)
                    {
                        var nowPoint = points[idx].point;
                        if(Helper.HitTestHelper.LineHitTest(lastPoint,nowPoint,testPoint,this.lineWidth))
                        {
                            this._HitedLine = nSite;
                            return true;
                        }
                        lastPoint = nowPoint;
                    }
                }
            }
            return false;
        }
        private childChange()
        {
            this.updateRender()
        }
        @property
        lineWidth:number = 10;
        siteRender:SiteRender.SiteRenderStateMachine = null;
        start() {
            super.start();
            this.node.on(cc.Node.EventType.CHILD_ADDED,this.childChange,this);
            this.node.on(cc.Node.EventType.CHILD_REMOVED,this.childChange,this);
            this.node.on(cc.Node.EventType.CHILD_REORDER,this.childChange,this);
            var im = IPSM.InputManage.getInstance(this);
            im.addInput(this);
            im.onHitTest(this.HitTest,this);
            this.siteRender = ScenesObject.instance.node.getComponentInChildren(SiteRender.SiteRenderStateMachine);
            this.draw();
        }
        onDestroy()
        {
            this.node.off(cc.Node.EventType.CHILD_ADDED,this.childChange,this);
            this.node.off(cc.Node.EventType.CHILD_REMOVED,this.childChange,this);
            this.node.off(cc.Node.EventType.CHILD_REORDER,this.childChange,this);
        }
        draw()
        {
            super.draw();
        }

        // update (dt) {}
    }
    export class LineRenderState extends RenderBaseState implements IInput
    {
        touch(touchEvent: cc.Touch) {
        }
        touchStart(touchEvent: cc.Touch) {

        }
        touchEnd(touchEvent: cc.Touch) {

        }
        touchCancel(touchEvent: cc.Touch) {

        }
        context:LineRenderStateMachine
    }
}
