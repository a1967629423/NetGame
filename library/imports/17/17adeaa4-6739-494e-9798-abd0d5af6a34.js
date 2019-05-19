"use strict";
cc._RF.push(module, '17adeqkZzlJTpeYq9DVr2o0', 'LineRender');
// script/render/LineRender.ts

Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine_1 = require("../../frame/StateMachine/StateMachine");
var StateDec_1 = require("../../frame/StateMachine/StateDec");
var Render_1 = require("./Render");
var InputManage_1 = require("../../frame/InputManage");
var Helper_1 = require("../../utility/Helper");
var SiteRender_1 = require("./SiteRender");
var ScenesObject_1 = require("../../utility/ScenesObject");
var PathSM_1 = require("../Path/PathSM");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StateMachine = StateMachine_1.MSM.StateMachine, State = StateMachine_1.MSM.State;
var mStateMachine = StateDec_1.MSMDsc.mStateMachine, mSyncFunc = StateDec_1.MSMDsc.mSyncFunc;
var LineRender;
(function (LineRender) {
    var LineRenderStateMachine = /** @class */ (function (_super) {
        __extends(LineRenderStateMachine, _super);
        function LineRenderStateMachine() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._HitedLine = null;
            _this.lineWidth = 10;
            _this.siteRender = null;
            return _this;
            // update (dt) {}
        }
        LineRenderStateMachine_1 = LineRenderStateMachine;
        LineRenderStateMachine.prototype.touch = function (touchEvent) {
        };
        LineRenderStateMachine.prototype.touchStart = function (touchEvent) {
            if (this.siteRender) {
                this.siteRender.active(this._HitedLine.PathType);
            }
        };
        LineRenderStateMachine.prototype.touchEnd = function (touchEvent) {
        };
        LineRenderStateMachine.prototype.touchCancel = function (touchEvent) {
        };
        LineRenderStateMachine.prototype.HitTest = function (point, listen) {
            var childrens = PathSM_1.Path.VehiclePath.allPath;
            var testPoint = this.node.convertToNodeSpaceAR(InputManage_1.IPSM.ConvertInputPointToWorld(point, this.node));
            for (var i = 0; i < childrens.length; i++) {
                var nSite = childrens[i];
                var points = nSite.changePoint;
                var lastPoint = nSite.lastSite.node.position;
                for (var idx = 0; idx < points.length; idx++) {
                    var nowPoint = points[idx].point;
                    if (Helper_1.Helper.HitTestHelper.LineHitTest(lastPoint, nowPoint, testPoint, this.lineWidth)) {
                        this._HitedLine = nSite;
                        return true;
                    }
                    lastPoint = nowPoint;
                }
            }
            return false;
        };
        LineRenderStateMachine.prototype.childChange = function () {
            this.updateRender();
        };
        Object.defineProperty(LineRenderStateMachine, "Instance", {
            get: function () {
                if (!this._Instance) {
                    this._Instance = ScenesObject_1.default.instance.getComponentInChildren(LineRenderStateMachine_1);
                }
                return this._Instance;
            },
            enumerable: true,
            configurable: true
        });
        LineRenderStateMachine.prototype.start = function () {
            _super.prototype.start.call(this);
            this.node.on(cc.Node.EventType.CHILD_ADDED, this.childChange, this);
            this.node.on(cc.Node.EventType.CHILD_REMOVED, this.childChange, this);
            this.node.on(cc.Node.EventType.CHILD_REORDER, this.childChange, this);
            var im = InputManage_1.IPSM.InputManage.getInstance(this);
            im.addInput(this);
            im.onHitTest(this.HitTest, this);
            this.siteRender = ScenesObject_1.default.instance.node.getComponentInChildren(SiteRender_1.SiteRender.SiteRenderStateMachine);
            this.draw();
            this.emit('lineDrag');
        };
        LineRenderStateMachine.prototype.onDestroy = function () {
            this.node.off(cc.Node.EventType.CHILD_ADDED, this.childChange, this);
            this.node.off(cc.Node.EventType.CHILD_REMOVED, this.childChange, this);
            this.node.off(cc.Node.EventType.CHILD_REORDER, this.childChange, this);
            if (LineRenderStateMachine_1._Instance)
                LineRenderStateMachine_1._Instance = null;
        };
        LineRenderStateMachine.prototype.draw = function () {
            _super.prototype.draw.call(this);
        };
        LineRenderStateMachine.prototype.createGraphics = function (s, p) {
            var g = _super.prototype.createGraphics.call(this, s, p);
            g.lineWidth = this.lineWidth;
            return g;
        };
        var LineRenderStateMachine_1;
        LineRenderStateMachine._Instance = null;
        __decorate([
            mSyncFunc
        ], LineRenderStateMachine.prototype, "touch", null);
        __decorate([
            mSyncFunc
        ], LineRenderStateMachine.prototype, "touchStart", null);
        __decorate([
            mSyncFunc
        ], LineRenderStateMachine.prototype, "touchEnd", null);
        __decorate([
            mSyncFunc
        ], LineRenderStateMachine.prototype, "touchCancel", null);
        __decorate([
            property
        ], LineRenderStateMachine.prototype, "lineWidth", void 0);
        LineRenderStateMachine = LineRenderStateMachine_1 = __decorate([
            ccclass,
            mStateMachine
        ], LineRenderStateMachine);
        return LineRenderStateMachine;
    }(Render_1.default));
    LineRender.LineRenderStateMachine = LineRenderStateMachine;
    var LineRenderState = /** @class */ (function (_super) {
        __extends(LineRenderState, _super);
        function LineRenderState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LineRenderState.prototype.touch = function (touchEvent) {
        };
        LineRenderState.prototype.touchStart = function (touchEvent) {
        };
        LineRenderState.prototype.touchEnd = function (touchEvent) {
        };
        LineRenderState.prototype.touchCancel = function (touchEvent) {
        };
        return LineRenderState;
    }(Render_1.RenderBaseState));
    LineRender.LineRenderState = LineRenderState;
})(LineRender = exports.LineRender || (exports.LineRender = {}));

cc._RF.pop();