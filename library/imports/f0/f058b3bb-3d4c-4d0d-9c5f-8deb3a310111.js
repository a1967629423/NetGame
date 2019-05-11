"use strict";
cc._RF.push(module, 'f058bO7PUxNDZxfjes6MQER', 'playerMachine');
// script/player/playerMachine.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PrefabFactory_1 = require("../../frame/PrefabFactory/PrefabFactory");
var StateMachine_1 = require("../../frame/StateMachine/StateMachine");
var InputManage_1 = require("../../frame/InputManage");
var StateDec_1 = require("../../frame/StateMachine/StateDec");
var StateMachine = StateMachine_1.MSM.StateMachine, State = StateMachine_1.MSM.State;
var mStateMachine = StateDec_1.MSMDsc.mStateMachine, mSyncFunc = StateDec_1.MSMDsc.mSyncFunc;
var InputManage = InputManage_1.IPSM.InputManage;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PlayerMachine = /** @class */ (function (_super) {
    __extends(PlayerMachine, _super);
    function PlayerMachine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerMachine.prototype.touch = function (touchEvent) {
    };
    PlayerMachine.prototype.touchStart = function (touchEvent) {
    };
    PlayerMachine.prototype.touchEnd = function (touchEvent) {
    };
    PlayerMachine.prototype.touchCancel = function (touchEvent) {
    };
    PlayerMachine.prototype.start = function () {
        debugger;
        _super.prototype.start.call(this);
        this.PF = this.getComponent(PrefabFactory_1.default);
        InputManage.getInstance(this).addInput(this);
        var _this = this;
    };
    __decorate([
        mSyncFunc
    ], PlayerMachine.prototype, "touch", null);
    __decorate([
        mSyncFunc
    ], PlayerMachine.prototype, "touchStart", null);
    __decorate([
        mSyncFunc
    ], PlayerMachine.prototype, "touchEnd", null);
    __decorate([
        mSyncFunc
    ], PlayerMachine.prototype, "touchCancel", null);
    PlayerMachine = __decorate([
        mStateMachine,
        ccclass,
        cc._decorator.requireComponent(PrefabFactory_1.default)
    ], PlayerMachine);
    return PlayerMachine;
}(StateMachine));
exports.default = PlayerMachine;
var PlayerState = /** @class */ (function (_super) {
    __extends(PlayerState, _super);
    function PlayerState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PlayerState.prototype, "context", {
        get: function () {
            return this.ctx;
        },
        set: function (val) {
            this.ctx = val;
        },
        enumerable: true,
        configurable: true
    });
    PlayerState.prototype.touch = function (touchEvent) {
    };
    PlayerState.prototype.touchStart = function (touchEvent) {
    };
    PlayerState.prototype.touchEnd = function (touchEvent) {
    };
    PlayerState.prototype.touchCancel = function (touchEvent) {
    };
    return PlayerState;
}(State));
exports.PlayerState = PlayerState;

cc._RF.pop();