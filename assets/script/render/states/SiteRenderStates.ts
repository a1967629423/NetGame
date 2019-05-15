import { MSMDsc } from "../../../frame/StateMachine/StateDec";
import { SiteRender } from "../SiteRender";
import { SLDSM } from "../../site/SiteLine";
import { ConvertRGBToColor } from "../../Enums";
import { Helper } from "../../../utility/Helper";
import { SiteSM } from "../../site/SiteMachine";
import { Path } from "../../Path/PathSM";

const {mState,mLinkTo,mDefaultState,ActionUpdate}=MSMDsc
const {SiteRenderState,SiteRenderStateMachine}=SiteRender
const {SiteLine}=SLDSM;
export module SiteRenderStates
{
    export class BaseDraw extends SiteRenderState
    {
        drawCache:cc.Node[] = [];
        draw()
        {
            var g = this.context.graphics;
            var drawedSite:cc.Node[] = [];
            this.drawCache = drawedSite;
            g.clear();
            g.moveTo(0,0);
            var children = this.context.node.children;
            children.forEach(value=>{
                g.circle(value.x,value.y,this.context.SiteRadius);
            });
            g.fill()
            g.stroke();
        }
    }
    
    @mDefaultState
    @mLinkTo('Active','active')
    @mState('Default',SiteRenderStateMachine)
    export class Default extends BaseDraw
    {
        Start()
        {
            this.draw();
        }
    }

    
    @mLinkTo('Default','activeEnd')
    @mState('Active',SiteRenderStateMachine)
    export class Active extends BaseDraw
    {
        base=0;
        target=10;
        nowLineWith = 0;
        @ActionUpdate(0.4,true,1,function(){this.context.emit('activeEnd')})
        action(dt)
        {
            this.nowLineWith= this.base+this.target*Helper.tween.easeInOutBack(dt);
        }
        Start()
        {
            this.context.graphics.strokeColor = ConvertRGBToColor(this.context.nowShowType) 
        }
        draw()
        {
            super.draw();
            var g = this.context.graphics;
            var oldWidth = g.lineWidth;
            g.lineWidth = this.nowLineWith;
            g.moveTo(0,0);
            var firstPath = Path.VehiclePath.findForFirstPathInAllPath(this.context.nowShowType);
            while(firstPath)
            {
                var renderNode = firstPath.lastSite.node;
                if(firstPath.isEnd)
                {
                    renderNode = firstPath.nextSite.node;
                    var renderNode1 = firstPath.lastSite.node;
                    g.circle(renderNode1.x,renderNode1.y,this.context.SiteRadius)
                }
                g.circle(renderNode.x,renderNode.y,this.context.SiteRadius);
                firstPath = firstPath.NextPath;
            }
            g.stroke();
            g.lineWidth = oldWidth;
        }
        update()
        {
            this.draw();
        }
    }
}