"use strict";
cc._RF.push(module, '9dd30Rtgk1HCp4jicetNEiX', 'PathContral');
// Material/PathContral.ts

Object.defineProperty(exports, "__esModule", { value: true });
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
var PathContral = /** @class */ (function (_super) {
    __extends(PathContral, _super);
    function PathContral() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    PathContral.prototype.start = function () {
        var PM = ShaderUtitly.getMaterial(this.node);
        debugger;
        PM.color = { r: this.node.color.getR() / 255, g: this.node.color.getG() / 255, b: this.node.color.getB() / 255, a: 1 };
    };
    PathContral = __decorate([
        ccclass
    ], PathContral);
    return PathContral;
}(cc.Component));
exports.default = PathContral;

cc._RF.pop();