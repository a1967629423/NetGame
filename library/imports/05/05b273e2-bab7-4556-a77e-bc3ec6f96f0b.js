"use strict";
cc._RF.push(module, '05b27PiurdFVqd+vD7G+W8L', 'InitMaterial');
// Material/Tools/InitMaterial.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ShaderDec_1 = require("../ShaderDec");
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
var InitMaterial = /** @class */ (function (_super) {
    __extends(InitMaterial, _super);
    function InitMaterial() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.MaterialName = '';
        _this.nowMaterial = null;
        return _this;
        // update (dt) {}
    }
    InitMaterial.prototype.onLoad = function () {
        var _this = this;
        var constructor = this.Materials.find(function (v) { return v.MaterialName === _this.MaterialName; });
        this.nowMaterial = new constructor.MaterialConstructor(this.MaterialName);
    };
    InitMaterial.prototype.start = function () {
        ShaderUtitly.setMaterial(this.node, this.nowMaterial);
    };
    __decorate([
        property
    ], InitMaterial.prototype, "MaterialName", void 0);
    InitMaterial = __decorate([
        ccclass,
        ShaderDec_1.ShaderDec.Init
    ], InitMaterial);
    return InitMaterial;
}(cc.Component));
exports.default = InitMaterial;

cc._RF.pop();