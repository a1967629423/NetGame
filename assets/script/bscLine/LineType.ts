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
export enum ELineType
{
    bsc,line
}
@ccclass
export default class LineType extends cc.Component {
    _type:ELineType = ELineType.line
    @property({type:cc.Enum(ELineType)})
    set type(val)
    {
        this._type = val
        this.typeSet()
    }
    get type():ELineType
    {
        return this._type
    }
    @property([cc.Node])
    handles:cc.Node[]=[]
    typeSet()
    {
        if(this.type===ELineType.bsc&&this.handles)
        {
            var node1 = new cc.Node('handleR');
            var node2 = new cc.Node('handleL');
            node1.setParent(this.node)
            node2.setParent(this.node)
            node1.position = node1.position.sub(cc.v2(10));
            node2.position = node2.position.add(cc.v2(10));
            this.handles.push(node1,node2)
        }
        else if(this.type===ELineType.line)
        {
            this.handles.forEach(value=>{value.destroy()});
            this.handles = [];
        }
    }
}
