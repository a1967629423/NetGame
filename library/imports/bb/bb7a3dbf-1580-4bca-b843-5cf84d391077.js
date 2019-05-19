"use strict";
cc._RF.push(module, 'bb7a32/FYBLyrhDXPhNORB3', 'testMaterial');
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