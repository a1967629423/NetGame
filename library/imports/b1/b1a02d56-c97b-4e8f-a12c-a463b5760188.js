"use strict";
cc._RF.push(module, 'b1a021WyXtOj6EspGO1dgGI', 'SiteRender');
// script/render/SiteRender.ts

Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine_1 = require("../../frame/StateMachine/StateMachine");
var StateDec_1 = require("../../frame/StateMachine/StateDec");
var Render_1 = require("./Render");
var Enums_1 = require("../Enums");
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
        SiteRenderStateMachine.prototype.childChange = function () {
            this.updateRender();
        };
        SiteRenderStateMachine.prototype.start = function () {
            _super.prototype.start.call(this);
            this.node.on(cc.Node.EventType.CHILD_ADDED, this.childChange, this);
            this.node.on(cc.Node.EventType.CHILD_REMOVED, this.childChange, this);
            this.node.on(cc.Node.EventType.CHILD_REORDER, this.childChange, this);
        };
        SiteRenderStateMachine.prototype.onDestroy = function () {
            this.node.off(cc.Node.EventType.CHILD_ADDED, this.childChange, this);
            this.node.off(cc.Node.EventType.CHILD_REMOVED, this.childChange, this);
            this.node.off(cc.Node.EventType.CHILD_REORDER, this.childChange, this);
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
        __decorate([
            property
        ], SiteRenderStateMachine.prototype, "SiteRadius", void 0);
        SiteRenderStateMachine = __decorate([
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
        return SiteRenderState;
    }(Render_1.RenderBaseState));
    SiteRender.SiteRenderState = SiteRenderState;
})(SiteRender = exports.SiteRender || (exports.SiteRender = {}));

cc._RF.pop();