(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Material/ShaderDec.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c8b85IWA6xNBop5YF8+xY0g', 'ShaderDec', __filename);
// Material/ShaderDec.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ShaderDec;
(function (ShaderDec) {
    var InitConstructor = null;
    function Init(target) {
        InitConstructor = target;
    }
    ShaderDec.Init = Init;
    function Material(name) {
        var _name = name;
        function InitMaterial(target) {
            var ms = InitConstructor.prototype['Materials'];
            if (!ms) {
                ms = [];
                InitConstructor.prototype['Materials'] = ms;
            }
            ms.push({ MaterialName: _name, MaterialConstructor: target });
        }
        return function (target) {
            if (!InitConstructor) {
                setTimeout(function () { InitMaterial(target); });
            }
            else {
                InitMaterial(target);
            }
        };
    }
    ShaderDec.Material = Material;
})(ShaderDec = exports.ShaderDec || (exports.ShaderDec = {}));

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
        //# sourceMappingURL=ShaderDec.js.map
        