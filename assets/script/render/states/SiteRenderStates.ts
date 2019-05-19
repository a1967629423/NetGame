import { MSMDsc } from "../../../frame/StateMachine/StateDec";
import { SiteRender } from "../SiteRender";
import { SLDSM } from "../../site/SiteLine";
import { ConvertRGBToColor, SiteLineType } from "../../Enums";
import { Helper } from "../../../utility/Helper";
import { SiteSM } from "../../site/SiteMachine";
import { Path } from "../../Path/PathSM";
import PolygonEditor from "../../../utility/PolygonEditor";
import { LineRender } from "../LineRender";
import GameObjectManage from "../../manage/GameObjectManange";
import { IPSM } from "../../../frame/InputManage";

const {mState,mLinkTo,mDefaultState,ActionUpdate,mAttach,mUnique}=MSMDsc
const {SiteRenderState,SiteRenderStateMachine}=SiteRender
const {SiteLine}=SLDSM;
const {ConvertInputPointToWorld}=IPSM
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
                var polygon = value.getComponent(PolygonEditor);
                if(polygon)
                {
                    polygon.points.forEach((v,idx)=>{
                        var point = v.add(value.position);
                        if(idx===0)g.moveTo(point.x,point.y);
                        else
                        g.lineTo(point.x,point.y);
                    });
                    if(polygon.points.length>2)
                    g.close();
                }
                else
                g.circle(value.x,value.y,this.context.SiteRadius);
            });
            g.fill()
            g.stroke();
        }
    }
    
    @mDefaultState
    @mLinkTo('Active','active')
    @mLinkTo('Drag','drag')
    @mState('Default',SiteRenderStateMachine)
    export class Default extends BaseDraw
    {
        Start()
        {
            this.draw();
        }
    }
    @mLinkTo('Default','dragEnd')
    @mState('Drag',SiteRenderStateMachine)
    export class Drag extends BaseDraw
    {

    }
    @mUnique()
    @mAttach('hited')
    @mState('Hited',SiteRenderStateMachine)
    export class Hited extends BaseDraw
    {
        hs:SiteSM.SiteMachine = null;
        graphics:cc.Graphics= null;
        nowPath:Path.VehiclePath = null;
        pathRenderArray:Path.VehiclePath[]=[];
        addSiteArray:SiteSM.SiteMachine[]=[];
        removeSiteArray:SiteSM.SiteMachine[]=[];
        nowType:SiteLineType = SiteLineType.red;
        Start(hitedSite:SiteSM.SiteMachine,point:cc.Vec2)
        {
            this.hs = hitedSite;
            var pathRenderIns = LineRender.LineRenderStateMachine.Instance;
            this.graphics = pathRenderIns.createGraphics();
            var pathType = GameObjectManage.Instance.getLineType();
            this.nowType = pathType;
            this.nowPath = GameObjectManage.Instance.CreateLine(hitedSite.node.position,point,pathType);
            this.graphics.strokeColor = ConvertRGBToColor(pathType);
            this.pathRenderArray.push(this.nowPath);
            this.addSiteArray.push(this.hs);
        }
        touch(t:cc.Touch)
        {
            var hited = this.context.hitTest(t.getLocation());
            var point = this.context.node.convertToNodeSpaceAR(ConvertInputPointToWorld(t.getLocation(),this.context.node));
            if(hited&&this.addSiteArray.every(v=>v!==hited))
            {
                this.hs = hited;
                this.addSiteArray.push(this.hs);
                this.nowPath.setPoint(this.nowPath.beginPoint,hited.node.position);
                var pathType = GameObjectManage.Instance.getLineType();
                this.nowPath = GameObjectManage.Instance.CreateLine(hited.node.position,point,pathType);
                this.pathRenderArray.push(this.nowPath);
            }
            this.nowPath.setPoint(this.nowPath.beginPoint,point);
        }
        endHit()
        {
            this.done();
        }
        touchCancel()
        {
            this.endHit();
        }
        touchEnd()
        {
            this.endHit();
        }
        draw()
        {
            var g = this.graphics;
            if(g)
            {
                g.clear();
                this.pathRenderArray.forEach(v=>{
                    v.changePoint.forEach((v,idx)=>{
                        if(idx===0)g.moveTo(v.point.x,v.point.y);
                        else
                        g.lineTo(v.point.x,v.point.y);
                    })
                    g.stroke();
                });
            }
            
        }
        update()
        {
            this.draw();
        }
        Quit()
        {
            this.hs = null;
            this.context.dropGraphics(this.graphics);
            this.graphics = null;
            this.nowPath = null;
            this.nowType = SiteLineType.red;
            this.pathRenderArray.forEach(v=>{v.recycle()});
            this.pathRenderArray = [];
            for(var idx =0;idx<this.addSiteArray.length-1;idx++)
            {
                var v = this.addSiteArray[idx];
                var nv = this.addSiteArray[idx+1];
                GameObjectManage.Instance.getLine(this.nowType,null,v,nv)
            }
            this.addSiteArray =[];
            this.removeSiteArray=[];
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
                var polygon = renderNode.getComponent(PolygonEditor);
                if(firstPath.isEnd)
                {
                    renderNode = firstPath.nextSite.node;
                    var renderNode1 = firstPath.lastSite.node;
                    var polygon1 = renderNode1.getComponent(PolygonEditor);
                    
                    if(polygon1)
                    {
                        polygon1.points.forEach((p,idx)=>{
                            var point = p.add(renderNode.position)
                            if(idx===0)g.moveTo(point.x,point.y);
                            else
                            g.lineTo(point.x,point.y);
                        });
                        if(polygon1.points.length>2)g.close();
                    }
                    else
                    {
                        g.circle(renderNode1.x,renderNode1.y,this.context.SiteRadius)
                    }
                }
                if(polygon)
                {
                    polygon.points.forEach((p,idx)=>{
                        var point = p.add(renderNode.position)
                        if(idx===0)g.moveTo(point.x,point.y);
                        else
                        g.lineTo(point.x,point.y);
                    });
                    if(polygon.points.length>2)g.close();
                }
                else
                {
                    g.circle(renderNode.x,renderNode.y,this.context.SiteRadius);
                }
                g.stroke();
                firstPath = firstPath.NextPath;
            }
            g.lineWidth = oldWidth;
        }
        update()
        {
            this.draw();
        }
    }
}