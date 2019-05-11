import { LineRender } from "../LineRender";
import { MSMDsc } from "../../../frame/StateMachine/StateDec";
import { SLDSM } from "../../site/SiteLine";
import { SiteLineType, ConvertRGBToColor } from "../../Enums";

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
            SiteLine.SiteLines.forEach(value=>{
                var nowLine = SiteLine.getBeginLine(value.lineType);
                if(!nowLine.isEnd)
                {
                    //取得线段颜色
                    var color = ConvertRGBToColor(value.lineType)
                    g.strokeColor =  color
                    //取第一个节点进行定位
                    var SiteNode = nowLine;
                    if(SiteNode.mask&1)
                    {
                        g.strokeColor = g.strokeColor.setA(125);
                    }
                    g.moveTo(SiteNode.node.x,SiteNode.node.y);
                    SiteNode.changPoint.forEach(value=>{
                        g.lineTo(value.point.x,value.point.y);
                    })
                    var nodes = [SiteNode];
                    drawedSite.push({type:value.lineType,node:nodes});
                    nowLine = nowLine.NextLine;
                    g.stroke();
                    g.strokeColor = color;
                    debugger;
                    while(nowLine)
                    {
                        var nowSiteNode = nowLine;
                        if(nowLine.mask&1)
                        {
                            g.strokeColor = g.strokeColor.setA(125);
                        }
                        g.moveTo(nowSiteNode.node.x,nowSiteNode.node.y);
                        nowSiteNode.changPoint.forEach(value=>{
                            g.lineTo(value.point.x,value.point.y);
                        })
                        nowLine = nowLine.NextLine;
                        nodes.push(nowSiteNode);
                        g.stroke();
                        g.strokeColor = color;
                    }
                    
                }
            });
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