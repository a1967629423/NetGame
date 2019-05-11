"use strict";
cc._RF.push(module, '19f40Xx8ktOiovD3bSz2PzM', 'ScenesDefaultState');
// frame/ScenesManage/ScenesDefaultState.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ScenesManage_1 = require("../ScenesManage");
var StateDec_1 = require("../StateMachine/StateDec");
var ScenesDefaultState = /** @class */ (function (_super) {
    __extends(ScenesDefaultState, _super);
    function ScenesDefaultState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScenesDefaultState.prototype.loadScenes = function (name, time, callback) {
        cc.director.preloadScene(name);
        setTimeout(function () {
            cc.director.loadScene(name, function () { if (callback)
                callback(); });
        }, time);
    };
    Object.defineProperty(ScenesDefaultState.prototype, "context", {
        get: function () {
            return this.ctx;
        },
        set: function (val) {
            this.ctx = val;
        },
        enumerable: true,
        configurable: true
    });
    ScenesDefaultState = __decorate([
        StateDec_1.MSMDsc.mDefaultState,
        StateDec_1.MSMDsc.mState("Default", ScenesManage_1.default)
    ], ScenesDefaultState);
    return ScenesDefaultState;
}(ScenesManage_1.ScenesState));
exports.default = ScenesDefaultState;

cc._RF.pop();