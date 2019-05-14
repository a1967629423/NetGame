"use strict";
cc._RF.push(module, '71a606deZ5JTol07XK/B7xI', 'ObjectPool');
// frame/ObjectPool/ObjectPool.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ObjectPool = /** @class */ (function () {
    /**
     *
     * @param dir 弹出方向
     */
    function ObjectPool(dir) {
        if (dir === void 0) { dir = false; }
        this.__pool = [];
        /**
         * false为弹出第一个true为弹出最后一个
         */
        this.dir = false;
        this.dir = dir;
    }
    ObjectPool.prototype.UnuseCallback = function (v) {
        if (v['unuse'])
            v['unuse']();
    };
    ObjectPool.prototype.ReuseCallback = function (re, reuseValue) {
        if (re && re['reuse'])
            re['reuse'].apply(re, reuseValue);
    };
    ObjectPool.prototype.push = function (v) {
        if (v instanceof cc.Node) {
            var comps = v['_components'];
            for (var item in comps) {
                this.UnuseCallback(comps[item]);
            }
            if (v['removeFromParent'])
                v['removeFromParent']();
        }
        else {
            this.UnuseCallback(v);
            if (v['node'])
                v['node'].removeFromParent();
        }
        this.__pool.push(v);
    };
    ObjectPool.prototype.pop = function (reuseValue) {
        if (reuseValue === void 0) { reuseValue = []; }
        if (this.__pool.length) {
            var re = this.dir ? this.__pool.pop() : this.__pool.shift();
            if (re instanceof cc.Node) {
                var comps = re['_components'];
                for (var item in comps) {
                    this.ReuseCallback(comps[item], reuseValue);
                }
            }
            else {
                this.ReuseCallback(re, reuseValue);
            }
            if (!re['__factory'])
                re['__factory'] = this;
            return re;
        }
        return null;
    };
    ObjectPool.prototype.clear = function () {
        this.__pool.forEach(function (value) {
            if (value['destroy'])
                value['destroy']();
        });
        this.__pool = [];
    };
    ObjectPool.GlobalPush = function (val) {
        if (val['__factory']) {
            val['__factory'].push(val);
        }
    };
    return ObjectPool;
}());
exports.default = ObjectPool;

cc._RF.pop();