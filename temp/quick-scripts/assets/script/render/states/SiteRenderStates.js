(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/render/states/SiteRenderStates.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '26c02IO6j9MxKXl+QJaZHsf', 'SiteRenderStates', __filename);
// script/render/states/SiteRenderStates.ts

Object.defineProperty(exports, "__esModule", { value: true });
var StateDec_1 = require("../../../frame/StateMachine/StateDec");
var SiteRender_1 = require("../SiteRender");
var SiteLine_1 = require("../../site/SiteLine");
var Enums_1 = require("../../Enums");
var Helper_1 = require("../../../utility/Helper");
var PathSM_1 = require("../../Path/PathSM");
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
            mLinkTo('Drag', 'drag'),
            mState('Default', SiteRenderStateMachine)
        ], Default);
        return Default;
    }(BaseDraw));
    SiteRenderStates.Default = Default;
    var Drag = /** @class */ (function (_super) {
        __extends(Drag, _super);
        function Drag() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Drag = __decorate([
            mLinkTo('Default', 'dragEnd'),
            mState('Drag', SiteRenderStateMachine)
        ], Drag);
        return Drag;
    }(BaseDraw));
    SiteRenderStates.Drag = Drag;
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
            _super.prototype.draw.call(this);
            var g = this.context.graphics;
            var oldWidth = g.lineWidth;
            g.lineWidth = this.nowLineWith;
            g.moveTo(0, 0);
            var firstPath = PathSM_1.Path.VehiclePath.findForFirstPathInAllPath(this.context.nowShowType);
            while (firstPath) {
                var renderNode = firstPath.lastSite.node;
                if (firstPath.isEnd) {
                    renderNode = firstPath.nextSite.node;
                    var renderNode1 = firstPath.lastSite.node;
                    g.circle(renderNode1.x, renderNode1.y, this.context.SiteRadius);
                }
                g.circle(renderNode.x, renderNode.y, this.context.SiteRadius);
                firstPath = firstPath.NextPath;
            }
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
        //# sourceMappingURL=SiteRenderStates.js.map
        