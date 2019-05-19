(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Material/PathMaterial.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'acbd8VChOZOQqnoQ7N+gzZu', 'PathMaterial', __filename);
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
        //# sourceMappingURL=PathMaterial.js.map
        