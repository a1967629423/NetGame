import LineType, { ELineType } from "./LineType";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
@ccclass
@cc._decorator.executeInEditMode
@cc._decorator.requireComponent(cc.Graphics)
export default class bscManage extends cc.Component {
    @property([LineType])
    points:LineType[] = [];
    @property
    count:number = 50
    
    px:number[] =[]
    py:number[] =[]
    path:cc.Vec2[] =[]
    p:cc.Vec2[]=[];
    start()
    {
        this.print();
    }
    print()
    {
        this.px=[];
        this.py=[];
        this.path=[];
        this.points.forEach(value=>{
            if(value)
            {
                this.px.push(value.node.position.x);
                this.py.push(value.node.position.y);
            }
            else
            {
                this.px.push(0);
                this.py.push(0);
            }
        });
        if(this.points.length>0&&this.points[0])
        {
            var g = this.getComponent(cc.Graphics);
            g.clear();
            g.strokeColor = cc.Color.RED
            g.moveTo(this.points[0].node.x,this.points[0].node.y);
            for(var i=1;i<this.points.length;i++)
            {
                if(this.points[i])
                {
                    if(this.points[i].type===ELineType.line)
                    {
                        this.path.push(new cc.Vec2(this.points[i].node.x,this.points[i].node.y));
    
                    }
                    else
                    {
                        for(var i=1;i<this.count;i++)
                        {
                            
                            //g.lineTo(morebsr(i/this.count,this.px),morebsr(i/this.count,this.py))
                        }
                    }
                }
            }
            this.path.forEach(value=>{g.lineTo(value.x,value.y)})

            g.stroke()
        }
    }
    update()
    {
        if(this.points.length>0)
        {
            if(this.points.length!=this.px.length)
            {
                this.print();
            }
            else
            {
                for(var i =0;i<this.points.length;i++)
                {
                    if(this.points[i])
                    {
                        if(this.points[i].node.x!=this.px[i])
                        {
                            this.print()
                        }
                    }
                }
            }
        }
    }
}
