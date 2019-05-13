import { LineRender } from "../LineRender";
import { MSMDsc } from "../../../frame/StateMachine/StateDec";
import { SLDSM } from "../../site/SiteLine";
import { SiteLineType, ConvertRGBToColor } from "../../Enums";
import { Path } from "../../Path/PathSM";

const {LineRenderState,LineRenderStateMachine}=LineRender;
const {mState,mDefaultState,mLinkTo}=MSMDsc
const {SiteLine}=SLDSM;
export module LineRenderStates
{
    type LineSave = {type:SiteLineType,node:SLDSM.SiteLine[]}[]
    export class BaseRender extends LineRenderState
    {
        drawCache:LineSave = [];
        draw()
        {
            var g = this.context.graphics;
            var oldWidth = g.lineWidth;
            g.lineWidth = this.context.lineWidth;
            var drawedSite:LineSave = [];
            this.drawCache = drawedSite;
            g.clear();
            var allPath = Path.VehiclePath.allPath;
            allPath.forEach(v=>{
                var color = ConvertRGBToColor(v.PathType);
                g.strokeColor = color;
                var firstPoint = v.changePoint[0].point;
                g.moveTo(firstPoint.x,firstPoint.y);
                for(var i = 1;i<v.changePoint.length;i++)
                {
                    var np = v.changePoint[i].point;
                    g.lineTo(np.x,np.y);
                }
                g.stroke();
            })
            g.lineWidth=oldWidth;
            
        }
    }
    
    @mDefaultState
    @mLinkTo('DragLine','drag')
    @mState('Default',LineRenderStateMachine)
    export class Default extends BaseRender
    {
        updateRender()
        {
            this.draw();
        }
    }
    
    @mLinkTo('Default','dragEnd')
    @mState('DragLine',LineRenderStateMachine)
    export class DragLine extends BaseRender
    {

    }
}