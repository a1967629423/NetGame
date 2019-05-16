"use strict";
cc._RF.push(module, 'b1a021WyXtOj6EspGO1dgGI', 'SiteRender');
// script/render/SiteRender.ts

Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine_1 = require("../../frame/StateMachine/StateMachine");
var StateDec_1 = require("../../frame/StateMachine/StateDec");
var Render_1 = require("./Render");
var Enums_1 = require("../Enums");
var InputManage_1 = require("../../frame/InputManage");
var ScenesObject_1 = require("../../utility/ScenesObject");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var State = StateMachine_1.MSM.State;
var mStateMachine = StateDec_1.MSMDsc.mStateMachine, mSyncFunc = StateDec_1.MSMDsc.mSyncFunc;
var SiteRender;
(function (SiteRender) {
    var SiteRenderStateMachine = /** @class */ (function (_super) {
        __extends(SiteRenderStateMachine, _super);
        function SiteRenderStateMachine() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.nowShowType = Enums_1.SiteLineType.red;
            _this.SiteRadius = 50;
            return _this;
        }
        SiteRenderStateMachine_1 = SiteRenderStateMachine;
        SiteRenderStateMachine.prototype.touch = function (touchEvent) {
        };
        SiteRenderStateMachine.prototype.touchStart = function (touchEvent) {
        };
        SiteRenderStateMachine.prototype.touchEnd = function (touchEvent) {
        };
        SiteRenderStateMachine.prototype.touchCancel = function (touchEvent) {
        };
        SiteRenderStateMachine.prototype.childChange = function () {
            this.updateRender();
        };
        Object.defineProperty(SiteRenderStateMachine, "Instance", {
            get: function () {
                if (!this._Instance) {
                    this._Instance = ScenesObject_1.default.instance.getComponentInChildren(SiteRenderStateMachine_1);
                }
                return this._Instance;
            },
            enumerable: true,
            configurable: true
        });
        SiteRenderStateMachine.prototype.hitTest = function () {
            return null;
        };
        SiteRenderStateMachine.prototype.start = function () {
            _super.prototype.start.call(this);
            this.node.on(cc.Node.EventType.CHILD_ADDED, this.childChange, this);
            this.node.on(cc.Node.EventType.CHILD_REMOVED, this.childChange, this);
            this.node.on(cc.Node.EventType.CHILD_REORDER, this.childChange, this);
            var ipIns = InputManage_1.IPSM.InputManage.getInstance(this);
            ipIns.onHitTest(function (point) {
                return false;
            }, this);
        };
        SiteRenderStateMachine.prototype.onDestroy = function () {
            this.node.off(cc.Node.EventType.CHILD_ADDED, this.childChange, this);
            this.node.off(cc.Node.EventType.CHILD_REMOVED, this.childChange, this);
            this.node.off(cc.Node.EventType.CHILD_REORDER, this.childChange, this);
            if (SiteRenderStateMachine_1._Instance)
                SiteRenderStateMachine_1._Instance = null;
        };
        SiteRenderStateMachine.prototype.draw = function () {
            _super.prototype.draw.call(this);
        };
        SiteRenderStateMachine.prototype.active = function (LineType) {
            this.nowShowType = LineType;
            this.emit('active');
        };
        SiteRenderStateMachine.prototype.updateRender = function () {
            this.draw();
        };
        var SiteRenderStateMachine_1;
        SiteRenderStateMachine._Instance = null;
        __decorate([
            mSyncFunc
        ], SiteRenderStateMachine.prototype, "touch", null);
        __decorate([
            mSyncFunc
        ], SiteRenderStateMachine.prototype, "touchStart", null);
        __decorate([
            mSyncFunc
        ], SiteRenderStateMachine.prototype, "touchEnd", null);
        __decorate([
            mSyncFunc
        ], SiteRenderStateMachine.prototype, "touchCancel", null);
        __decorate([
            property
        ], SiteRenderStateMachine.prototype, "SiteRadius", void 0);
        SiteRenderStateMachine = SiteRenderStateMachine_1 = __decorate([
            ccclass,
            mStateMachine
        ], SiteRenderStateMachine);
        return SiteRenderStateMachine;
    }(Render_1.default));
    SiteRender.SiteRenderStateMachine = SiteRenderStateMachine;
    var SiteRenderState = /** @class */ (function (_super) {
        __extends(SiteRenderState, _super);
        function SiteRenderState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SiteRenderState.prototype.touch = function (touchEvent) {
        };
        SiteRenderState.prototype.touchStart = function (touchEvent) {
        };
        SiteRenderState.prototype.touchEnd = function (touchEvent) {
        };
        SiteRenderState.prototype.touchCancel = function (touchEvent) {
        };
        return SiteRenderState;
    }(Render_1.RenderBaseState));
    SiteRender.SiteRenderState = SiteRenderState;
})(SiteRender = exports.SiteRender || (exports.SiteRender = {}));

cc._RF.pop();