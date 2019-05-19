import { MSM } from "../frame/StateMachine/StateMachine";
import { MSMDsc } from "../frame/StateMachine/StateDec";
import { IPSM } from "../frame/InputManage";
import { Helper } from "./Helper";

const { ccclass, property, executeInEditMode, requireComponent } = cc._decorator;

@ccclass
@executeInEditMode
@MSMDsc.mStateMachine
export default class PolygonEditor extends MSM.StateMachine {
    @property
    editor:boolean = false;
    _display:boolean = false;
    @property
    get display()
    {
        return this._display;
    }
    set display(v)
    {
        this._display = v;
        if(v)
        {
            this.displayInit();
        }
        else
        {
            this.dropGraphics();
        }
    }
    @property([cc.Vec2])
    points: cc.Vec2[] = [];
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    g: cc.Graphics;
    childerHandle:cc.Node[] = []
    displayInit()
    {
        var node = new cc.Node("DisplayGraphics");
        this.g = node.addComponent(cc.Graphics);
        node.setParent(this.node);
    }
    dropGraphics()
    {
        this.g.node.removeFromParent();
        this.g = null;
    }
    start() {
        if(CC_EDITOR)
        {
            super.start();
            if(this._display)
            {
                this.displayInit();
            }
        }
        else
        {
            //this.node.children.forEach(v=>{if(v.name==='DisplayGraphics')v.removeFromParent()})
            var ins = IPSM.InputManage.getInstance(this);
            ins.onHitTest((p)=>{
                var testPoint = this.node.convertToNodeSpaceAR(IPSM.ConvertInputPointToWorld(p,this.node));
                return Helper.HitTestHelper.RayPolygonHitTest(this.points,testPoint);
            },this);
        }
    }

    update(dt) {
        super.update(dt);
        if (CC_EDITOR&&this._display) {
            this.g.clear();
            this.points.forEach((v, idx) => {
                if (idx === 0) {
                    this.g.moveTo(v.x, v.y);
                    return;
                }
                this.g.lineTo(v.x,v.y);
            });
            if(this.points.length>2)
            this.g.close();
            this.g.stroke();
            this.g.fill();
        }

    }
}
export module PolyGonEditorStates
{
    export class PS extends MSM.State
    {
        context:PolygonEditor
    }
    @MSMDsc.mLinkTo('Editor','editor')
    @MSMDsc.mDefaultState
    @MSMDsc.mState('Default',PolygonEditor)
    export class Default extends PS
    {
        update()
        {
            if(this.context.editor)
            {
                this.context.emit('editor');
            }
        }
    }
    @MSMDsc.mLinkTo('Default','editorEnd')
    @MSMDsc.mState('Editor',PolygonEditor)
    export class Editor extends PS
    {
        update()
        {
            if(this.context.points.length===this.context.childerHandle.length)
            {
                for(var idx in this.context.points)
                {
                    var p = this.context.points[idx];
                    var h = this.context.childerHandle[idx];
                    p.set(h.position);
                }
            }
            else
            {
                this.childerUpdate();
            }
            if(!this.context.editor)
            {
                this.context.emit('editorEnd');
            }
        }
        childerUpdate()
        {
            console.log('update');
            this.context.childerHandle.forEach(v=>{
                v.removeFromParent();
            });
            this.context.childerHandle = [];
            this.context.points.forEach((v,idx)=>{
                var node=  new cc.Node('handle.'+idx);
                this.context.childerHandle.push(node);
                node.setParent(this.context.node);
                node.setPosition(v);
            })
        }
        Start()
        {

            if(this.context.childerHandle.length===0)
            {
                this.childerUpdate();
            }
        }
        Quit()
        {
            this.context.childerHandle.forEach(v=>{
                v.removeFromParent();
            });
            this.context.childerHandle = [];
        }
    }
}
