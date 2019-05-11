"use strict";
cc._RF.push(module, '5a208nCos9J3IXRUrwolchH', 'playerDefaultState');
// script/player/playerState/playerDefaultState.ts

Object.defineProperty(exports, "__esModule", { value: true });
var playerMachine_1 = require("../playerMachine");
var bullet_1 = require("../bullet");
var StateDec_1 = require("../../../frame/StateMachine/StateDec");
var mState = StateDec_1.MSMDsc.mState, mDefaultState = StateDec_1.MSMDsc.mDefaultState;
var PlayerDefaultState = /** @class */ (function (_super) {
    __extends(PlayerDefaultState, _super);
    function PlayerDefaultState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerDefaultState.prototype.Start = function () {
    };
    PlayerDefaultState.prototype.touchStart = function (t) {
        var nowPoint = this.context.node.parent.convertToNodeSpaceAR(t.getLocation());
        this.context.node.rotation = nowPoint.sub(this.context.node.position).normalize().signAngle(cc.v2(1, 0)) * 180 / Math.PI;
    };
    PlayerDefaultState.prototype.touch = function (t) {
        var nowPoint = this.context.node.parent.convertToNodeSpaceAR(t.getLocation());
        this.context.node.rotation = nowPoint.sub(this.context.node.position).normalize().signAngle(cc.v2(1, 0)) * 180 / Math.PI;
    };
    PlayerDefaultState.prototype.touchEnd = function (t) {
        var nowPoint = this.context.node.parent.convertToNodeSpaceAR(t.getLocation());
        var dir = nowPoint.sub(this.context.node.position).normalize();
        this.context.node.rotation = dir.signAngle(cc.v2(1, 0)) * 180 / Math.PI;
        var node = this.context.PF.pop('bullet');
        node.getComponent(bullet_1.default).dir = dir;
        node.setParent(this.context.node.parent);
        node.setPosition(this.context.node.position);
    };
    PlayerDefaultState = __decorate([
        mDefaultState,
        mState('Default', playerMachine_1.default)
    ], PlayerDefaultState);
    return PlayerDefaultState;
}(playerMachine_1.PlayerState));
exports.default = PlayerDefaultState;

cc._RF.pop();