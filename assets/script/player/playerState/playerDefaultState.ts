import PlayerMachine, { PlayerState } from "../playerMachine";
import Bullet from "../bullet";
import { MSMDsc } from "../../../frame/StateMachine/StateDec";
const { mState, mDefaultState }=MSMDsc

@mDefaultState
@mState('Default',PlayerMachine)
export default class PlayerDefaultState extends PlayerState {
    Start()
    {
    }
    touchStart(t:cc.Touch)
    {
        var nowPoint = this.context.node.parent.convertToNodeSpaceAR(t.getLocation())
        this.context.node.rotation = nowPoint.sub(this.context.node.position).normalize().signAngle(cc.v2(1,0))*180/Math.PI
    }
    touch(t:cc.Touch)
    {
        var nowPoint = this.context.node.parent.convertToNodeSpaceAR(t.getLocation())
        this.context.node.rotation = nowPoint.sub(this.context.node.position).normalize().signAngle(cc.v2(1,0))*180/Math.PI
    }
    touchEnd(t:cc.Touch)
    {
        var nowPoint = this.context.node.parent.convertToNodeSpaceAR(t.getLocation())
        var dir =nowPoint.sub(this.context.node.position).normalize();
        this.context.node.rotation = dir.signAngle(cc.v2(1,0))*180/Math.PI
        var node = this.context.PF.pop('bullet');
        node.getComponent(Bullet).dir = dir;
        node.setParent(this.context.node.parent);
        node.setPosition(this.context.node.position)
    }
}
