(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Material/testMaterial.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bb7a32/FYBLyrhDXPhNORB3', 'testMaterial', __filename);
// Material/testMaterial.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ShaderMaterial_1 = require("./ShaderMaterial");
var ShaderDec_1 = require("./ShaderDec");
var testMaterial = /** @class */ (function (_super) {
    __extends(testMaterial, _super);
    function testMaterial() {
        return _super.call(this, 'test') || this;
    }
    testMaterial = __decorate([
        ShaderDec_1.ShaderDec.Material('test')
    ], testMaterial);
    return testMaterial;
}(ShaderMaterial_1.ShaderMaterial));
exports.testMaterial = testMaterial;

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
        //# sourceMappingURL=testMaterial.js.map
        