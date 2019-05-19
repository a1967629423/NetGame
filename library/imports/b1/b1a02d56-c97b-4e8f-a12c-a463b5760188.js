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
var SiteMachine_1 = require("../site/SiteMachine");
var Helper_1 = require("../../utility/Helper");
var PolygonEditor_1 = require("../../utility/PolygonEditor");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var State = StateMachine_1.MSM.State;
var mStateMachine = StateDec_1.MSMDsc.mStateMachine, mSyncFunc = StateDec_1.MSMDsc.mSyncFunc, mSyncAttachFunc = StateDec_1.MSMDsc.mSyncAttachFunc;
var SiteRender;
(function (SiteRender) {
    var SiteRenderStateMachine = /** @class */ (function (_super) {
        __extends(SiteRenderStateMachine, _super);
        function SiteRenderStateMachine() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.hitTestArray = [];
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
            var _this = this;
            this.hitTestArray = [];
            this.node.children.forEach(function (v) {
                var sm = v.getComponent(SiteMachine_1.SiteSM.SiteMachine);
                if (sm)
                    _this.hitTestArray.push(sm);
            });
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
        SiteRenderStateMachine.prototype.hitTest = function (point) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var testPoint = this.node.convertToNodeSpaceAR(InputManage_1.IPSM.ConvertInputPointToWorld(point, this.node));
            for (var idx in this.hitTestArray) {
                var v = this.hitTestArray[idx];
                var polygon = v.getComponent(PolygonEditor_1.default);
                if (polygon) {
                    var ins = InputManage_1.IPSM.InputManage.getInstance(v);
                    if (ins.HitTest.apply(ins, [point].concat(args)))
                        return v;
                }
                else {
                    if (Helper_1.Helper.HitTestHelper.CircleHitTest(v.node.position, testPoint, this.SiteRadius))
                        return v;
                }
            }
            return null;
        };
        SiteRenderStateMachine.prototype.start = function () {
            var _this = this;
            _super.prototype.start.call(this);
            debugger;
            this.node.on(cc.Node.EventType.CHILD_ADDED, this.childChange, this);
            this.node.on(cc.Node.EventType.CHILD_REMOVED, this.childChange, this);
            this.node.on(cc.Node.EventType.CHILD_REORDER, this.childChange, this);
            var ipIns = InputManage_1.IPSM.InputManage.getInstance(this);
            ipIns.addInput(this);
            ipIns.onHitTest(function (point, lister) {
                var hitedSite = _this.hitTest(point, lister);
                if (hitedSite) {
                    _this.emit('hited', hitedSite, _this.node.convertToNodeSpaceAR(InputManage_1.IPSM.ConvertInputPointToWorld(point, _this.node)));
                    return true;
                }
                return false;
            }, this);
            this.childChange();
            this.emit('lineDrag');
        };
        SiteRenderStateMachine.prototype.update = function (dt) {
            _super.prototype.update.call(this, dt);
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
            mSyncAttachFunc,
            mSyncFunc
        ], SiteRenderStateMachine.prototype, "touch", null);
        __decorate([
            mSyncFunc
        ], SiteRenderStateMachine.prototype, "touchStart", null);
        __decorate([
            mSyncAttachFunc,
            mSyncFunc
        ], SiteRenderStateMachine.prototype, "touchEnd", null);
        __decorate([
            mSyncAttachFunc,
            mSyncFunc
        ], SiteRenderStateMachine.prototype, "touchCancel", null);
        __decorate([
            mSyncAttachFunc
        ], SiteRenderStateMachine.prototype, "update", null);
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