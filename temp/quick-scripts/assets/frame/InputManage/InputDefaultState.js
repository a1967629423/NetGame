(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/frame/InputManage/InputDefaultState.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '486d9GOq29NybIqdMxGmT4n', 'InputDefaultState', __filename);
// frame/InputManage/InputDefaultState.ts

Object.defineProperty(exports, "__esModule", { value: true });
var StateDec_1 = require("../StateMachine/StateDec");
var InputManage_1 = require("../InputManage");
var mState = StateDec_1.MSMDsc.mState, mDefaultState = StateDec_1.MSMDsc.mDefaultState;
var InputState = InputManage_1.IPSM.InputState, InputManage = InputManage_1.IPSM.InputManage;
var InputDefaultState = /** @class */ (function (_super) {
    __extends(InputDefaultState, _super);
    function InputDefaultState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputDefaultState.prototype.Start = function () {
        if (CC_DEBUG)
            console.log("default");
    };
    InputDefaultState.prototype.touch = function (touchEvent) {
        if (CC_DEBUG)
            console.log("touch" + this.context.name);
        this.context._tar.forEach(function (value) {
            if (value.touch)
                value.touch(touchEvent);
        });
    };
    InputDefaultState.prototype.touchStart = function (touchEvent) {
        if (CC_DEBUG)
            console.log("touchStart" + this.context.name);
        this.context._tar.forEach(function (value) {
            if (value.touchStart)
                value.touchStart(touchEvent);
        });
    };
    InputDefaultState.prototype.touchCancel = function (touchEvent) {
        if (CC_DEBUG)
            console.log("touchCancel" + this.context.name);
        this.context._tar.forEach(function (value) {
            if (value.touchCancel)
                value.touchCancel(touchEvent);
        });
    };
    InputDefaultState.prototype.touchEnd = function (touchEvent) {
        if (CC_DEBUG)
            console.log("touchEnd" + this.context.name);
        this.context._tar.forEach(function (value) {
            if (value.touchEnd)
                value.touchEnd(touchEvent);
        });
    };
    InputDefaultState.prototype.InputEvent = function (event, eventName) {
        this.context._tar.forEach(function (value) {
            if (value[eventName]) {
                value[eventName](event);
            }
        });
    };
    InputDefaultState = __decorate([
        mDefaultState,
        mState("default", InputManage)
    ], InputDefaultState);
    return InputDefaultState;
}(InputState));
exports.default = InputDefaultState;

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
        //# sourceMappingURL=InputDefaultState.js.map
        