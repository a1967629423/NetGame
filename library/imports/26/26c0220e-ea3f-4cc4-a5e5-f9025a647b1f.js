"use strict";
cc._RF.push(module, '26c02IO6j9MxKXl+QJaZHsf', 'SiteRenderStates');
// script/render/states/SiteRenderStates.ts

Object.defineProperty(exports, "__esModule", { value: true });
var StateDec_1 = require("../../../frame/StateMachine/StateDec");
var SiteRender_1 = require("../SiteRender");
var SiteLine_1 = require("../../site/SiteLine");
var Enums_1 = require("../../Enums");
var Helper_1 = require("../../../utility/Helper");
var mState = StateDec_1.MSMDsc.mState, mLinkTo = StateDec_1.MSMDsc.mLinkTo, mDefaultState = StateDec_1.MSMDsc.mDefaultState, ActionUpdate = StateDec_1.MSMDsc.ActionUpdate;
var SiteRenderState = SiteRender_1.SiteRender.SiteRenderState, SiteRenderStateMachine = SiteRender_1.SiteRender.SiteRenderStateMachine;
var SiteLine = SiteLine_1.SLDSM.SiteLine;
var SiteRenderStates;
(function (SiteRenderStates) {
    var BaseDraw = /** @class */ (function (_super) {
        __extends(BaseDraw, _super);
        function BaseDraw() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.drawCache = [];
            return _this;
        }
        BaseDraw.prototype.draw = function () {
            var _this = this;
            var g = this.context.graphics;
            var drawedSite = [];
            this.drawCache = drawedSite;
            g.clear();
            g.moveTo(0, 0);
            var children = this.context.node.children;
            children.forEach(function (value) {
                g.circle(value.x, value.y, _this.context.SiteRadius);
            });
            g.fill();
            g.stroke();
        };
        return BaseDraw;
    }(SiteRenderState));
    SiteRenderStates.BaseDraw = BaseDraw;
    var Default = /** @class */ (function (_super) {
        __extends(Default, _super);
        function Default() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Default.prototype.Start = function () {
            this.draw();
        };
        Default = __decorate([
            mDefaultState,
            mLinkTo('Active', 'active'),
            mState('Default', SiteRenderStateMachine)
        ], Default);
        return Default;
    }(BaseDraw));
    SiteRenderStates.Default = Default;
    var Active = /** @class */ (function (_super) {
        __extends(Active, _super);
        function Active() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.base = 0;
            _this.target = 10;
            _this.nowLineWith = 0;
            return _this;
        }
        Active.prototype.action = function (dt) {
            this.nowLineWith = this.base + this.target * Helper_1.Helper.tween.easeInOutBack(dt);
        };
        Active.prototype.Start = function () {
            this.context.graphics.strokeColor = Enums_1.ConvertRGBToColor(this.context.nowShowType);
        };
        Active.prototype.draw = function () {
            var _this = this;
            _super.prototype.draw.call(this);
            var g = this.context.graphics;
            var oldWidth = g.lineWidth;
            g.lineWidth = this.nowLineWith;
            g.moveTo(0, 0);
            this.context.node.children.forEach(function (value) {
                var now = SiteLine.getBeginLine(_this.context.nowShowType);
                while (now) {
                    var nowNode = now.NowSite.node;
                    g.circle(nowNode.x, nowNode.y, _this.context.SiteRadius);
                    now = now.NextLine;
                }
            });
            g.stroke();
            g.lineWidth = oldWidth;
        };
        Active.prototype.update = function () {
            this.draw();
        };
        __decorate([
            ActionUpdate(0.4, true, 1, function () { this.context.emit('activeEnd'); })
        ], Active.prototype, "action", null);
        Active = __decorate([
            mLinkTo('Default', 'activeEnd'),
            mState('Active', SiteRenderStateMachine)
        ], Active);
        return Active;
    }(BaseDraw));
    SiteRenderStates.Active = Active;
})(SiteRenderStates = exports.SiteRenderStates || (exports.SiteRenderStates = {}));

cc._RF.pop();