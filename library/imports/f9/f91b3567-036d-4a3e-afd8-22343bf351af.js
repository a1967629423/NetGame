"use strict";
cc._RF.push(module, 'f91b3VnA21KPq/YIjQ781Gv', 'MachineCor');
// frame/test/MachineCor.ts

Object.defineProperty(exports, "__esModule", { value: true });
var InputManage_1 = require("../InputManage");
var StateMachine_1 = require("../StateMachine/StateMachine");
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var InputManage = InputManage_1.IPSM.InputManage;
var AwaitNextSecond = StateMachine_1.MSM.AwaitNextSecond;
var MachineCor = /** @class */ (function (_super) {
    __extends(MachineCor, _super);
    function MachineCor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MachineCor.prototype.start = function () {
        if (CC_DEBUG) {
            console.log('start');
            InputManage.getInstance().startCoroutine_Auto((function (_this) {
                var i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < 10)) return [3 /*break*/, 4];
                            return [4 /*yield*/, new AwaitNextSecond(1)];
                        case 2:
                            _a.sent();
                            console.log(i);
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            })(this));
            console.log('a');
        }
    };
    MachineCor = __decorate([
        ccclass
    ], MachineCor);
    return MachineCor;
}(cc.Component));
exports.default = MachineCor;

cc._RF.pop();