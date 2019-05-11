"use strict";
cc._RF.push(module, '1fbd4nBTlZGdZsDhKm3INlh', 'OperationStateMachine');
// frame/OperationStateMachine.ts

Object.defineProperty(exports, "__esModule", { value: true });
var StateDec_1 = require("./StateMachine/StateDec");
var StateMachine_1 = require("./StateMachine/StateMachine");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var mStateMachine = StateDec_1.MSMDsc.mStateMachine, mSyncAttachFunc = StateDec_1.MSMDsc.mSyncAttachFunc, mSyncFunc = StateDec_1.MSMDsc.mSyncFunc;
var StateMachine = StateMachine_1.MSM.StateMachine, State = StateMachine_1.MSM.State, OperatorStruct = StateMachine_1.MSM.OperatorStruct;
var OperationStateMachine = /** @class */ (function (_super) {
    __extends(OperationStateMachine, _super);
    function OperationStateMachine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.health = 100;
        return _this;
    }
    OperationStateMachine.prototype.hit = function (val, owner) {
    };
    OperationStateMachine.prototype.attack = function (damage, owner) {
    };
    __decorate([
        mSyncFunc,
        mSyncAttachFunc
    ], OperationStateMachine.prototype, "hit", null);
    __decorate([
        mSyncFunc,
        mSyncAttachFunc
    ], OperationStateMachine.prototype, "attack", null);
    OperationStateMachine = __decorate([
        mStateMachine,
        ccclass
    ], OperationStateMachine);
    return OperationStateMachine;
}(StateMachine));
exports.default = OperationStateMachine;
var OperationState = /** @class */ (function (_super) {
    __extends(OperationState, _super);
    function OperationState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OperationState.prototype.attack = function (damage, owner) {
    };
    OperationState.prototype.hit = function (val, owner) {
    };
    return OperationState;
}(State));
exports.OperationState = OperationState;

cc._RF.pop();