import { MSM } from "../../frame/StateMachine/StateMachine";
import { MSMDsc } from "../../frame/StateMachine/StateDec";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const { ccclass, property } = cc._decorator;
export module LineClear {
    @ccclass
    @MSMDsc.mStateMachine
    export class LineClearManage extends MSM.StateMachine {
        static _instance:LineClearManage = null;
        static get Instance():LineClearManage
        {
            this.InitInstance();
            return this._instance;
        }
        static InitInstance()
        {
            if(!this._instance)
            {
                var node = new cc.Node('LineClearManage');
                this._instance = node.addComponent(LineClearManage);
                cc.director.getScene().addChild(node);
            }
            return this._instance;
        }
        onLoad()
        {
            this.Init();
        }
        start()
        {
            super.start();
        }
        updateClear()
        {
            this.emit('clear');
        }
        onDestroy()
        {
            if(LineClearManage._instance)LineClearManage._instance = null;
        }
        // update (dt) {}
    }
    export class LineClearState extends MSM.State
    {
        context:LineClearManage
    }
}
