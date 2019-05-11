import { SLDSM } from "../SiteLine";
import { MSMDsc } from "../../../frame/StateMachine/StateDec";
import { SiteLineType } from "../../Enums";
import { MSM } from "../../../frame/StateMachine/StateMachine";
import PrefabFactor from "../../../frame/PrefabFactory/PrefabFactory";
import GameObjectManage from "../../manage/GameObjectManange";
import ScenesObject from "../../../utility/ScenesObject";
import ScenesManage from "../../../frame/ScenesManage";
import { LineRender } from "../../render/LineRender";

const {mState,mDefaultState,mLinkTo} =MSMDsc;
export module SLDSMStates {
    @mDefaultState
    @mLinkTo('Cleared','cleared')
    @mLinkTo('Caculated','caculated')
    @mState('Default',SLDSM.SiteLine)
    export class Default extends SLDSM.SiteLineDisplayState {
        static asyncLock = true;
        async testVehicle()
        {
            Default.asyncLock = false;
            if(this.context.nowTypeVehicle.length==0)
            {
                if (this.context.isBegin) {
                    var vechicle = await GameObjectManage.Instance.getVehicle(this.context.NowSite, 0.1, this.context)
                    if (vechicle) {
                        var vehicles = ScenesObject.instance.node.getChildByName('vehicles');
                        vehicles.addChild(vechicle.node);
                        this.context.registerVehicle(vechicle);
                    }
                }
            }
            Default.asyncLock = true;
        }
        async Start()
        {
            if(!Default.asyncLock)
            {
                await this.context.AwaitUntil(()=>{
                    return Default.asyncLock
                })
            }
            await this.testVehicle();
        }
        update()
        {
            
        }
    }
    @mLinkTo('Default','drawEnd')
    @mState('Caculated',SLDSM.SiteLine)
    export class Caculated extends SLDSM.SiteLineDisplayState
    {
        Start()
        {
            //this.drawPath();
            var render = ScenesObject.instance.getComponentInChildren(LineRender.LineRenderStateMachine);
            if(render)
            {
                render.updateRender();
            }
            this.context.emit('drawEnd');
        }
    }
    
    @mLinkTo('Default','changeEnd')
    @mState('Change',SLDSM.SiteLine)
    export class Change extends SLDSM.SiteLineDisplayState
    {
        Start()
        {
        }
    }
    
    @mLinkTo('Removed','removed')
    @mState('Cleared',SLDSM.SiteLine)
    export class Cleared extends SLDSM.SiteLineDisplayState
    {
        Start()
        {
            // var next = this.context.NextLine
            this.context.removeFromSitelines();
            this.context.NowSite.removeLine(this.context);
            debugger;
            if(this.context.LastLine&&this.context.LastLine.NextLine===this.context)
            {
                //从后往前删除
                this.context.LastLine.NextLine = null;
                this.context.LastLine.changPoint = [];
            }
            else if(this.context.NextLine.LastLine === this.context)
            {
                //从前往后删除
                this.context.NextLine.LastLine = null;
            }
            if(this.context.changPoint.length==0)
            {
                this.context.LastLine.HidenFlag = false;
                PrefabFactor.NodePush(this.context.node)
            }
            this.context.NextLine = null;
            this.context.LastLine = null;
            this.context.changPoint = []
            var render = ScenesObject.instance.getComponentInChildren(LineRender.LineRenderStateMachine);
            if(render)
            {
                render.updateRender();
            }
            this.context.ClearFlag = false;
            //this.context.emit('start');

            //this.context.NowSite.removeLine(this.context)
            // if(next)
            // {
            //     if(next.isEnd)
            //     {
            //         next.NowSite.removeLine(next);
            //         PrefabFactor.NodePush(next.node);
            //     }
            //     else
            //     {
            //         next.LastLine = null;
            //     }
            // }
            //this.context.emit('removed')
            // this.context.startCoroutine_Auto((function*(_this){
            //     while(_this.vehicles.length>0)
            //     {
            //         yield MSM.AwaitNextUpdate.getInstance(2);
            //     }
            //     //_this.NowSite.removeLine(this);
            //     //_this.LastLine = null;

            //     _this.emit('removed');
            // })(this.context));
        }
    }
    @mState('Removed',SLDSM.SiteLine)
    export class Removed extends SLDSM.SiteLineDisplayState
    {
        Start()
        {
            //不显示的节点就移除
            debugger;

            this.context.emit('start');
        }
    }

}
