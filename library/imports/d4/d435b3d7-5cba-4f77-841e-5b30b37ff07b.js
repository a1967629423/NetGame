"use strict";
cc._RF.push(module, 'd435bPXXLpPd4QeWzCzf/B7', 'testInitMaterial');
// Material/testInitMaterial.ts

Object.defineProperty(exports, "__esModule", { value: true });
var testMaterial_1 = require("./testMaterial");
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
var testInitMaterial = /** @class */ (function (_super) {
    __extends(testInitMaterial, _super);
    function testInitMaterial() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    testInitMaterial.prototype.onLoad = function () {
        this.material = new testMaterial_1.testMaterial();
    };
    testInitMaterial.prototype.start = function () {
        ShaderUtitly.setMaterial(this.node, this.material);
    };
    testInitMaterial = __decorate([
        ccclass
    ], testInitMaterial);
    return testInitMaterial;
}(cc.Component));
exports.default = testInitMaterial;

cc._RF.pop();