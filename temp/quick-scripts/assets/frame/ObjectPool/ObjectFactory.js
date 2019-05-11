(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/frame/ObjectPool/ObjectFactory.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '15e60OFOStPs4SOFYGLFiiM', 'ObjectFactory', __filename);
// frame/ObjectPool/ObjectFactory.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ObjectPool_1 = require("./ObjectPool");
var ObjectFactory = /** @class */ (function (_super) {
    __extends(ObjectFactory, _super);
    function ObjectFactory(dir, csr) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var _this = _super.call(this, dir) || this;
        _this.csr = null;
        _this.args = [];
        _this.csr = csr;
        _this.args = args;
        return _this;
    }
    ObjectFactory.prototype.pop = function () {
        var reuslt = _super.prototype.pop.call(this);
        if (!reuslt) {
            reuslt = Object.create({});
            reuslt['__proto__'] = this.csr.prototype;
            reuslt['__factory'] = this;
            this.csr.apply(reuslt, this.args);
        }
        return reuslt;
    };
    return ObjectFactory;
}(ObjectPool_1.default));
exports.default = ObjectFactory;

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
        //# sourceMappingURL=ObjectFactory.js.map
        