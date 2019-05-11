(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/frame/AnimationStateMachine.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8b67c3aYTFKTbwesPVT0i+7', 'AnimationStateMachine', __filename);
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
        //# sourceMappingURL=AnimationStateMachine.js.map
        