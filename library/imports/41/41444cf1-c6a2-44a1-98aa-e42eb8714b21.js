"use strict";
cc._RF.push(module, '41444zxxqJEoZiq5C64cUsh', 'InputManageTest');
// frame/test/InputManageTest.ts

Object.defineProperty(exports, "__esModule", { value: true });
var InputManage_1 = require("../InputManage");
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
var InputManageTest = /** @class */ (function (_super) {
    __extends(InputManageTest, _super);
    function InputManageTest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vec2b = cc.v2();
        return _this;
        // update (dt) {}
    }
    InputManageTest.prototype.touchStart = function (touchEvent) {
    };
    InputManageTest.prototype.touchEnd = function (touchEvent) {
    };
    InputManageTest.prototype.touchCancel = function (touchEvent) {
    };
    InputManageTest.prototype.touch = function (touchEvent) {
        //console.log(touchEvent.getLocation());
    };
    InputManageTest.prototype.start = function () {
        var _this = this;
        if (CC_DEBUG) {
            var thisinput = InputManage.getInstance(this);
            thisinput.addInput(this);
            //var play = this.getComponent(dragonBones.ArmatureDisplay);
            thisinput.onHitTest(function (point, listener) {
                var testpoint = _this.node.convertToNodeSpace(InputManage_1.IPSM.ConvertInputPointToWorld(point, _this.node));
                if (testpoint.x >= -50 && testpoint.y >= -50 && testpoint.x < 150 && testpoint.y < 150) {
                    return true;
                }
                return false;
            });
        }
    };
    InputManageTest = __decorate([
        ccclass
    ], InputManageTest);
    return InputManageTest;
}(cc.Component));
exports.default = InputManageTest;

cc._RF.pop();