(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/render/Render.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bb89be24mxOc62LU8N/nsNW', 'Render', __filename);
// script/render/Render.ts

Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine_1 = require("../../frame/StateMachine/StateMachine");
var StateDec_1 = require("../../frame/StateMachine/StateDec");
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent;
var RenderBase = /** @class */ (function (_super) {
    __extends(RenderBase, _super);
    function RenderBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.graphics = null;
        return _this;
    }
    RenderBase.prototype.start = function () {
        this.graphics = this.getComponent(cc.Graphics);
        _super.prototype.start.call(this);
    };
    RenderBase.prototype.drawBegin = function () { this.graphics.moveTo(0, 0); };
    RenderBase.prototype.draw = function () { };
    RenderBase.prototype.updateRender = function () { };
    RenderBase.prototype.createGraphics = function (source, parent) {
        var node = new cc.Node('childeGraphics');
        var ng = node.addComponent(cc.Graphics);
        if (parent) {
            parent.addChild(node);
        }
        else {
            this.node.addChild(node);
        }
        if (source) {
            ng.fillColor = source.fillColor;
            ng.strokeColor = source.strokeColor;
            ng.lineWidth = source.lineWidth;
            ng.lineCap = source.lineCap;
            ng.lineJoin = source.lineJoin;
            ng.miterLimit = source.miterLimit;
        }
        return ng;
    };
    RenderBase.prototype.dropGraphics = function (g) {
        if (g) {
            g.clear();
            g.node.removeFromParent();
        }
    };
    __decorate([
        StateDec_1.MSMDsc.mSyncFunc
    ], RenderBase.prototype, "draw", null);
    __decorate([
        StateDec_1.MSMDsc.mSyncFunc
    ], RenderBase.prototype, "updateRender", null);
    RenderBase = __decorate([
        ccclass,
        requireComponent(cc.Graphics)
    ], RenderBase);
    return RenderBase;
}(StateMachine_1.MSM.StateMachine));
exports.default = RenderBase;
var RenderBaseState = /** @class */ (function (_super) {
    __extends(RenderBaseState, _super);
    function RenderBaseState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RenderBaseState.prototype.draw = function () { };
    RenderBaseState.prototype.updateRender = function () { };
    return RenderBaseState;
}(StateMachine_1.MSM.State));
exports.RenderBaseState = RenderBaseState;

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
        //# sourceMappingURL=Render.js.map
        