"use strict";
cc._RF.push(module, '24d68Qv809JcLyfncBjhTa5', 'ScenesObject');
// utility/ScenesObject.ts

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ScenesObject = /** @class */ (function (_super) {
    __extends(ScenesObject, _super);
    function ScenesObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadModle = "1";
        return _this;
    }
    ScenesObject_1 = ScenesObject;
    Object.defineProperty(ScenesObject, "instance", {
        get: function () {
            if (!this._instance) {
                var snode = cc.find('Canvas/ScenesObject');
                if (!snode) {
                    snode = new cc.Node("ScenesObject");
                    cc.Canvas.instance.node.addChild(snode);
                    this._instance = snode.addComponent(ScenesObject_1);
                }
                else {
                    this._instance = snode.getComponent(ScenesObject_1);
                }
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    ScenesObject.prototype.start = function () {
        var _this = this;
        cc.loader.loadRes('SOConfig/config.json', function (err, data) {
            if (err) {
                console.error('SOConfig/config.json not exist');
            }
            else {
                var json = data['json'];
                var loadConfig = json[_this.loadModle]['children'];
                for (var key in loadConfig) {
                    debugger;
                    var item = loadConfig[key];
                    if (_this.node.children.every(function (v) { return v.name !== item; })) {
                        var node = new cc.Node(item);
                        _this.node.addChild(node);
                    }
                }
            }
        });
    };
    ScenesObject.prototype.onDestroy = function () {
        if (ScenesObject_1._instance)
            ScenesObject_1._instance = null;
    };
    var ScenesObject_1;
    ScenesObject._instance = null;
    __decorate([
        property
    ], ScenesObject.prototype, "loadModle", void 0);
    ScenesObject = ScenesObject_1 = __decorate([
        ccclass
    ], ScenesObject);
    return ScenesObject;
}(cc.Component));
exports.default = ScenesObject;

cc._RF.pop();