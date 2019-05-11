(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/utility/NodeSync.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '89812ZvfuZC+7/u7cb25oT4', 'NodeSync', __filename);
// utility/NodeSync.ts

Object.defineProperty(exports, "__esModule", { value: true });
var EventCenter_1 = require("../frame/EventCenter");
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var SyncEnum;
(function (SyncEnum) {
    SyncEnum[SyncEnum["disable"] = 0] = "disable";
    SyncEnum[SyncEnum["mainCamera"] = 1] = "mainCamera";
    SyncEnum[SyncEnum["mainPlay"] = 2] = "mainPlay";
})(SyncEnum || (SyncEnum = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NodeSync = /** @class */ (function (_super) {
    __extends(NodeSync, _super);
    function NodeSync() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tageNode = null;
        _this.SyncTypeEnum = SyncEnum.disable;
        _this.Synclocation = true;
        _this.SyncSize = false;
        _this.workInStart = false;
        _this.workInResize = false;
        _this.negation = false;
        return _this;
    }
    NodeSync.prototype.onLoad = function () {
        switch (this.SyncTypeEnum) {
            case SyncEnum.mainCamera:
                this.tageNode = cc.Camera.main.node;
                break;
            case SyncEnum.mainPlay:
                break;
            default:
                break;
        }
    };
    NodeSync.prototype.start = function () {
        // var _this = this;
        // GlobalTime.Instantiation.Coroutines((function*(){
        //     while(_this.tageNode)
        //     {
        //         _this.node.position =  _this.node.getParent().convertToNodeSpaceAR(_this.tageNode.getParent().convertToWorldSpaceAR(_this.tageNode.position));
        //         yield CoroutinesType.frame;
        //     }
        // })())
        if (this.workInStart) {
            if (this.Synclocation) {
                this.tracePosition();
            }
            if (this.SyncSize) {
                this.traceSize();
            }
        }
        if (this.workInResize) {
            if (this.Synclocation) {
                EventCenter_1.default.Instance.node.on("resize", this.tracePosition, this);
            }
            if (this.SyncSize) {
                EventCenter_1.default.Instance.node.on("resize", this.traceSize, this);
            }
        }
    };
    NodeSync.prototype.tracePosition = function () {
        var parent = this.node.getParent();
        var tarparent = this.tageNode.getParent();
        var po = parent.convertToNodeSpaceAR(tarparent.convertToWorldSpaceAR(this.tageNode.position));
        this.node.position = this.negation ? po.neg() : po;
        po = null;
        parent = null;
        tarparent = null;
    };
    NodeSync.prototype.traceSize = function () {
        this.node.setContentSize(this.tageNode.getContentSize());
    };
    NodeSync.prototype.update = function (dt) {
        if (this.tageNode && !this.workInStart) {
            if (this.Synclocation) {
                this.tracePosition();
            }
            if (this.SyncSize) {
                this.traceSize();
            }
        }
    };
    NodeSync.prototype.onDestroy = function () {
        if (this.workInResize) {
            if (EventCenter_1.default.Instance) {
                EventCenter_1.default.Instance.node.off("resize", this.tracePosition, this);
                EventCenter_1.default.Instance.node.off("resize", this.traceSize, this);
            }
        }
    };
    __decorate([
        property(cc.Node)
    ], NodeSync.prototype, "tageNode", void 0);
    __decorate([
        property({ type: cc.Enum(SyncEnum) })
    ], NodeSync.prototype, "SyncTypeEnum", void 0);
    __decorate([
        property
    ], NodeSync.prototype, "Synclocation", void 0);
    __decorate([
        property
    ], NodeSync.prototype, "SyncSize", void 0);
    __decorate([
        property
    ], NodeSync.prototype, "workInStart", void 0);
    __decorate([
        property
    ], NodeSync.prototype, "workInResize", void 0);
    __decorate([
        property
    ], NodeSync.prototype, "negation", void 0);
    NodeSync = __decorate([
        ccclass
    ], NodeSync);
    return NodeSync;
}(cc.Component));
exports.default = NodeSync;

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
        //# sourceMappingURL=NodeSync.js.map
        