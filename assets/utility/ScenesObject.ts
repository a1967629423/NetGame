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
export default class ScenesObject extends cc.Component {
    private static _instance:ScenesObject = null;
    static get instance()
    {
        if(!this._instance)
        {
            var snode  = cc.find('Canvas/ScenesObject')
            if(!snode)
            {
                snode = new cc.Node("ScenesObject");
                cc.Canvas.instance.node.addChild(snode);
                this._instance = snode.addComponent(ScenesObject)
            }
            else
            {
                this._instance = snode.getComponent(ScenesObject);
            }
        }
        return this._instance;
    }
    onDestroy()
    {
        if(ScenesObject._instance)ScenesObject._instance = null;
    }
}
