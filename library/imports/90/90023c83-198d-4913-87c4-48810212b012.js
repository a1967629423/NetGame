"use strict";
cc._RF.push(module, '90023yDGY1JE4fESIECErAS', 'PrefabFactory');
// frame/PrefabFactory/PrefabFactory.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ObjectPool_1 = require("../ObjectPool/ObjectPool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * Prefab工厂类，将此类放置在node上并填入需要使用的Prefab就会自动实例化
 */
var PrefabFactor = /** @class */ (function (_super) {
    __extends(PrefabFactor, _super);
    function PrefabFactor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Prefabs = [];
        _this.InitValue = 10;
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        _this.PrefabPool = [];
        _this.isStatic = false;
        _this.isLoaded = false;
        return _this;
        // update (dt) {}
    }
    PrefabFactor_1 = PrefabFactor;
    PrefabFactor.NodePush = function (node) {
        var factory = node['__factory'];
        if (factory) {
            factory.push(node);
        }
        else {
            if (CC_DEBUG) {
                console.log('node not have factory');
                console.log(node);
            }
        }
    };
    Object.defineProperty(PrefabFactor, "Instance", {
        get: function () {
            if (!this._Instance) {
                var node = new cc.Node('staticPF');
                var pf = node.addComponent(PrefabFactor_1);
                pf.isStatic = true;
                this._Instance = pf;
                cc.game.addPersistRootNode(node);
            }
            return this._Instance;
        },
        enumerable: true,
        configurable: true
    });
    PrefabFactor.prototype.Nodefactory = function (pree) {
        var pre = pree.prefab;
        var node = cc.instantiate(pre);
        node['__factoryName'] = pre.name;
        node['__factory'] = this;
        return node;
    };
    PrefabFactor.LoadRes = function (path, type) {
        return new Promise(function (res, rej) {
            if (type) {
                cc.loader.loadRes(path, type, function (err, data) {
                    if (err) {
                        console.error('cc.loader.loadRes prefab/config.json ' + err.message);
                        rej();
                    }
                    else {
                        res(data);
                    }
                });
            }
            else {
                cc.loader.loadRes(path, function (err, data) {
                    if (err) {
                        console.error('cc.loader.loadRes prefab/config.json ' + err.message);
                        rej();
                    }
                    else {
                        res(data);
                    }
                });
            }
        });
    };
    PrefabFactor.prototype.LoadAllRes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, config, _a, _b, _i, item, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, PrefabFactor_1.LoadRes(PrefabFactor_1.prefabConfig)];
                    case 1:
                        data = _f.sent();
                        if (!data) return [3 /*break*/, 6];
                        config = data.json;
                        _a = [];
                        for (_b in config.path)
                            _a.push(_b);
                        _i = 0;
                        _f.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        item = _a[_i];
                        _d = (_c = this.Prefabs).push;
                        _e = {};
                        return [4 /*yield*/, PrefabFactor_1.LoadRes(config.path[item], cc.Prefab)];
                    case 3:
                        _d.apply(_c, [(_e.prefab = _f.sent(), _e.path = config.path[item], _e)]);
                        _f.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        this.PrefabPoolInit();
                        _f.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PrefabFactor.prototype.PrefabPoolInit = function () {
        var _this = this;
        if (this.PrefabPool.length != this.Prefabs.length) {
            this.Prefabs.forEach(function (value) {
                var pool = new ObjectPool_1.default(true);
                for (var i = 0; i < _this.InitValue; i++) {
                    pool.push(_this.Nodefactory(value));
                }
                _this.PrefabPool.push({ name: value.prefab.name, pool: pool, prefab: value.prefab, path: value.path });
            });
        }
        this.node.emit(PrefabFactor_1.Loaded);
    };
    PrefabFactor.prototype.LPoolInit = function (pree) {
        var value = pree;
        var pool = new ObjectPool_1.default(true);
        for (var i = 0; i < this.InitValue; i++) {
            pool.push(this.Nodefactory(value));
        }
        var p = { name: value.prefab.name, pool: pool, prefab: value.prefab, path: value.path };
        this.PrefabPool.push(p);
        return p;
    };
    PrefabFactor.prototype.start = function () {
        if (this.isStatic) {
            this.LoadAllRes();
        }
        else {
            this.PrefabPoolInit();
        }
    };
    PrefabFactor.prototype.pop = function (name) {
        var rePool = null;
        if (typeof name === 'string') {
            rePool = this.PrefabPool.find(function (value) { return value.name === name; });
        }
        else if (typeof name === 'number')
            [
                rePool = this.PrefabPool.length > name ? this.PrefabPool[name] : null
            ];
        if (rePool) {
            var renode = rePool.pool.pop();
            if (!renode) {
                renode = this.Nodefactory(rePool);
                rePool.pool.push(renode);
            }
            return renode;
        }
    };
    PrefabFactor.prototype.pop_path = function (path) {
        var reuseValue = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            reuseValue[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var result, prefab, renode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = this.PrefabPool.find(function (value) { return value.path === path; });
                        if (!!result) return [3 /*break*/, 2];
                        return [4 /*yield*/, PrefabFactor_1.LoadRes(path, cc.Prefab)];
                    case 1:
                        prefab = _a.sent();
                        result = this.LPoolInit({ prefab: prefab, path: path });
                        _a.label = 2;
                    case 2:
                        renode = result.pool.pop(reuseValue);
                        if (!renode) {
                            renode = this.Nodefactory(result);
                            renode['__poolInit'] = true;
                            //result.pool.push(renode);
                        }
                        return [2 /*return*/, renode];
                }
            });
        });
    };
    PrefabFactor.prototype.push = function (node, name) {
        var prefabName = name ? name : node['__factoryName'];
        if (!prefabName) {
            if (CC_DEBUG) {
                console.warn('node not have name');
            }
        }
        var rePool = this.PrefabPool.find(function (value) { return value.name === prefabName; });
        if (rePool) {
            rePool.pool.push(node);
        }
        else {
            if (CC_DEBUG) {
                console.warn("Pool not find name:%s", prefabName);
            }
        }
    };
    var PrefabFactor_1;
    PrefabFactor._Instance = null;
    PrefabFactor.Loaded = 'Loaded';
    PrefabFactor.prefabConfig = 'prefab/config';
    __decorate([
        property([cc.Prefab])
    ], PrefabFactor.prototype, "Prefabs", void 0);
    __decorate([
        property
    ], PrefabFactor.prototype, "InitValue", void 0);
    PrefabFactor = PrefabFactor_1 = __decorate([
        ccclass
    ], PrefabFactor);
    return PrefabFactor;
}(cc.Component));
exports.default = PrefabFactor;

cc._RF.pop();