"use strict";
cc._RF.push(module, '15e60OFOStPs4SOFYGLFiiM', 'ObjectFactory');
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
        var v = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            v[_i] = arguments[_i];
        }
        var reuslt = _super.prototype.pop.call(this, v);
        if (!reuslt) {
            reuslt = Object.create({});
            reuslt['__proto__'] = this.csr.prototype;
            reuslt['__factory'] = this;
            this.csr.apply(reuslt, this.args);
            this.UnuseCallback(reuslt);
        }
        this.ReuseCallback(reuslt, v);
        return reuslt;
    };
    ObjectFactory.S_Push = function (val) {
        if (val['__factory']) {
            val['__factory'].push(val);
        }
    };
    return ObjectFactory;
}(ObjectPool_1.default));
exports.default = ObjectFactory;

cc._RF.pop();