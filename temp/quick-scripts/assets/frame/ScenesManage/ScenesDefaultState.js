(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/frame/ScenesManage/ScenesDefaultState.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '19f40Xx8ktOiovD3bSz2PzM', 'ScenesDefaultState', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=ScenesDefaultState.js.map
        