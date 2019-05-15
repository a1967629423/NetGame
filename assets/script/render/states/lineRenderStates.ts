import { LineRender } from "../LineRender";
import { MSMDsc } from "../../../frame/StateMachine/StateDec";
import { SLDSM } from "../../site/SiteLine";
import { SiteLineType, ConvertRGBToColor } from "../../Enums";
import { Path } from "../../Path/PathSM";
import { IPSM } from "../../../frame/InputManage";

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
        touch()
        {
            this.context.emit('drag');
        }
        updateRender()
        {
            this.draw();
        }
    }
    const {ConvertInputPointToWorld}=IPSM
    @mLinkTo('Default','dragEnd')
    @mState('DragLine',LineRenderStateMachine)
    export class DragLine extends BaseRender
    {
        nG:cc.Graphics  = null;
        firstPath:Path.VehiclePath = null;
        secondPath:Path.VehiclePath = null;
        renderPaths:Path.VehiclePath[]=[];
        stateEnd()
        {
            this.context.emit('dragEnd');
            this.context.dropGraphics(this.nG)
        }
        touchEnd()
        {
            this.stateEnd();
        }
        touchCancel()
        {
            this.stateEnd();
        }
        touch(t:cc.Touch)
        {
            if(this.firstPath)
            {
                var fp = this.firstPath;
                var sp = this.secondPath
                var location = this.context.node.convertToNodeSpaceAR(ConvertInputPointToWorld(t.getLocation(),this.context.node));

                fp.setPoint(fp.beginPoint,location);
                sp.setPoint(location,sp.endPoint);

            }
        }
        draw()
        {
            if(this.nG)
            {
                var g = this.nG
                g.clear();
                this.renderPaths.forEach(p=>{
                    var changePoint = p.changePoint;
                    changePoint.forEach((v,idx)=>{
                        if(idx===0){g.moveTo(v.point.x,v.point.y);return;}
                        g.lineTo(v.point.x,v.point.y);
                    });
                    g.stroke();
                })
            }
        }
        update()
        {
            this.draw();   
        }
        Quit()
        {
            if(this.firstPath)this.firstPath.recycle();
            if(this.secondPath)this.secondPath.recycle();
            this.renderPaths = [];
        }
        Start()
        {
            this.nG = this.context.createGraphics(this.context.graphics);
            if(this.nG&&this.context._HitedLine)
            {
                this.firstPath = this.context._HitedLine.copy();
                this.secondPath = this.context._HitedLine.copy();
                this.renderPaths = [this.firstPath,this.secondPath];
                this.nG.lineWidth = this.context.lineWidth;
                var color = ConvertRGBToColor(this.firstPath.PathType).clone();
                color.setA(125);
                this.nG.strokeColor = color;
            }
            else
            {
                this.stateEnd();
            }
            
        }
    }
}