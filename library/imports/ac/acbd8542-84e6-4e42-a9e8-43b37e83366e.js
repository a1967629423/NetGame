"use strict";
cc._RF.push(module, 'acbd8VChOZOQqnoQ7N+gzZu', 'PathMaterial');
// Material/PathMaterial.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ShaderMaterial_1 = require("./ShaderMaterial");
var ShaderDec_1 = require("./ShaderDec");
var PathMaterial = /** @class */ (function (_super) {
    __extends(PathMaterial, _super);
    function PathMaterial() {
        return _super.call(this, 'Path') || this;
    }
    PathMaterial = __decorate([
        ShaderDec_1.ShaderDec.Material('Path')
    ], PathMaterial);
    return PathMaterial;
}(ShaderMaterial_1.ShaderMaterial));
exports.default = PathMaterial;

cc._RF.pop();