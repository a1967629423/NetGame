
import PrefabFactor from "../../frame/PrefabFactory/PrefabFactory";
import { MSM } from "../../frame/StateMachine/StateMachine";
import { IInput, IPSM } from "../../frame/InputManage";
import { MSMDsc } from "../../frame/StateMachine/StateDec";
const {StateMachine,State}=MSM;
const{mStateMachine,mSyncFunc} = MSMDsc
const{InputManage}=IPSM
export interface IPlayer extends IInput
{

}
const {ccclass, property} = cc._decorator;
@mStateMachine
@ccclass
@cc._decorator.requireComponent(PrefabFactor)
export default class PlayerMachine extends StateMachine implements IPlayer {
    @mSyncFunc
    touch(touchEvent: cc.Touch) {

    }
    @mSyncFunc
    touchStart(touchEvent: cc.Touch) {
        
    }
    @mSyncFunc
    touchEnd(touchEvent: cc.Touch) {
        
    }
    @mSyncFunc
    touchCancel(touchEvent: cc.Touch) {
        
    }
    PF:PrefabFactor
    start () {
        debugger;
        super.start();
        this.PF = this.getComponent(PrefabFactor);
        InputManage.getInstance(this).addInput(this);
        var _this = this;
    }

    // update (dt) {}
}
export class PlayerState extends State implements IPlayer
{
    private ctx:PlayerMachine;
    get context():PlayerMachine
    {
        return this.ctx
    }

    set context(val)
    {
        this.ctx=val;  
    }
    touch(touchEvent: cc.Touch) {

    }    
    touchStart(touchEvent: cc.Touch) {
    }
    touchEnd(touchEvent: cc.Touch) {
        
    }
    touchCancel(touchEvent: cc.Touch) {
    }


}
