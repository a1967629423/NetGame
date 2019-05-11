"use strict";
cc._RF.push(module, '1e179szjl5A0pscSFZiBxu1', 'ScenesManage');
// frame/ScenesManage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine_1 = require("./StateMachine/StateMachine");
var StateDec_1 = require("./StateMachine/StateDec");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var mStateMachine = StateDec_1.MSMDsc.mStateMachine, mSyncFunc = StateDec_1.MSMDsc.mSyncFunc;
var StateMachine = StateMachine_1.MSM.StateMachine, State = StateMachine_1.MSM.State;
var ScenesManage = /** @class */ (function (_super) {
    __extends(ScenesManage, _super);
    function ScenesManage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScenesManage_1 = ScenesManage;
    ScenesManage.prototype.loadScenes = function (scenesName, time, callback) {
    };
    Object.defineProperty(ScenesManage, "Instance", {
        get: function () {
            if (!this._instance) {
                var node = new cc.Node("ScenesManange");
                this._instance = node.addComponent(ScenesManage_1);
                cc.game.addPersistRootNode(node);
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    ScenesManage.prototype.start = function () {
        _super.prototype.start.call(this);
    };
    var ScenesManage_1;
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    ScenesManage._instance = null;
    __decorate([
        mSyncFunc
    ], ScenesManage.prototype, "loadScenes", null);
    ScenesManage = ScenesManage_1 = __decorate([
        mStateMachine,
        ccclass
    ], ScenesManage);
    return ScenesManage;
}(StateMachine));
exports.default = ScenesManage;
var ScenesState = /** @class */ (function (_super) {
    __extends(ScenesState, _super);
    function ScenesState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScenesState.prototype.loadScenes = function (scenesName, time, callback) {
    };
    Object.defineProperty(ScenesState.prototype, "context", {
        get: function () {
            return _super.prototype.context;
        },
        set: function (ctx) {
            _super.prototype.context = ctx;
        },
        enumerable: true,
        configurable: true
    });
    return ScenesState;
}(State));
exports.ScenesState = ScenesState;

cc._RF.pop();