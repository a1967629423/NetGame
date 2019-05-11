"use strict";
cc._RF.push(module, '8b67c3aYTFKTbwesPVT0i+7', 'AnimationStateMachine');
// frame/AnimationStateMachine.ts

Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine_1 = require("./StateMachine/StateMachine");
var StateDec_1 = require("./StateMachine/StateDec");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var mStateMachine = StateDec_1.MSMDsc.mStateMachine, mState = StateDec_1.MSMDsc.mState;
var StateMachine = StateMachine_1.MSM.StateMachine, State = StateMachine_1.MSM.State;
var AnimationStateMachine = /** @class */ (function (_super) {
    __extends(AnimationStateMachine, _super);
    function AnimationStateMachine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimationStateMachine.prototype.start = function () {
    };
    AnimationStateMachine = __decorate([
        mStateMachine,
        ccclass,
        cc._decorator.requireComponent(dragonBones.ArmatureDisplay)
    ], AnimationStateMachine);
    return AnimationStateMachine;
}(StateMachine));
exports.default = AnimationStateMachine;
var AnimationState = /** @class */ (function (_super) {
    __extends(AnimationState, _super);
    function AnimationState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AnimationState;
}(State));
exports.AnimationState = AnimationState;

cc._RF.pop();