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
var PolygonEditor_1 = require("../../../utility/PolygonEditor");
var LineRender_1 = require("../LineRender");
var GameObjectManange_1 = require("../../manage/GameObjectManange");
var InputManage_1 = require("../../../frame/InputManage");
var mState = StateDec_1.MSMDsc.mState, mLinkTo = StateDec_1.MSMDsc.mLinkTo, mDefaultState = StateDec_1.MSMDsc.mDefaultState, ActionUpdate = StateDec_1.MSMDsc.ActionUpdate, mAttach = StateDec_1.MSMDsc.mAttach, mUnique = StateDec_1.MSMDsc.mUnique;
var SiteRenderState = SiteRender_1.SiteRender.SiteRenderState, SiteRenderStateMachine = SiteRender_1.SiteRender.SiteRenderStateMachine;
var SiteLine = SiteLine_1.SLDSM.SiteLine;
var ConvertInputPointToWorld = InputManage_1.IPSM.ConvertInputPointToWorld;
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
                var polygon = value.getComponent(PolygonEditor_1.default);
                if (polygon) {
                    polygon.points.forEach(function (v, idx) {
                        var point = v.add(value.position);
                        if (idx === 0)
                            g.moveTo(point.x, point.y);
                        else
                            g.lineTo(point.x, point.y);
                    });
                    if (polygon.points.length > 2)
                        g.close();
                }
                else
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
    var Hited = /** @class */ (function (_super) {
        __extends(Hited, _super);
        function Hited() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.hs = null;
            _this.graphics = null;
            _this.nowPath = null;
            _this.pathRenderArray = [];
            _this.addSiteArray = [];
            _this.removeSiteArray = [];
            _this.nowType = Enums_1.SiteLineType.red;
            return _this;
        }
        Hited.prototype.Start = function (hitedSite, point) {
            this.hs = hitedSite;
            var pathRenderIns = LineRender_1.LineRender.LineRenderStateMachine.Instance;
            this.graphics = pathRenderIns.createGraphics();
            var pathType = GameObjectManange_1.default.Instance.getLineType();
            this.nowType = pathType;
            this.nowPath = GameObjectManange_1.default.Instance.CreateLine(hitedSite.node.position, point, pathType);
            this.graphics.strokeColor = Enums_1.ConvertRGBToColor(pathType);
            this.pathRenderArray.push(this.nowPath);
            this.addSiteArray.push(this.hs);
        };
        Hited.prototype.touch = function (t) {
            var hited = this.context.hitTest(t.getLocation());
            var point = this.context.node.convertToNodeSpaceAR(ConvertInputPointToWorld(t.getLocation(), this.context.node));
            if (hited && this.addSiteArray.every(function (v) { return v !== hited; })) {
                this.hs = hited;
                this.addSiteArray.push(this.hs);
                this.nowPath.setPoint(this.nowPath.beginPoint, hited.node.position);
                var pathType = GameObjectManange_1.default.Instance.getLineType();
                this.nowPath = GameObjectManange_1.default.Instance.CreateLine(hited.node.position, point, pathType);
                this.pathRenderArray.push(this.nowPath);
            }
            this.nowPath.setPoint(this.nowPath.beginPoint, point);
        };
        Hited.prototype.endHit = function () {
            this.done();
        };
        Hited.prototype.touchCancel = function () {
            this.endHit();
        };
        Hited.prototype.touchEnd = function () {
            this.endHit();
        };
        Hited.prototype.draw = function () {
            var g = this.graphics;
            if (g) {
                g.clear();
                this.pathRenderArray.forEach(function (v) {
                    v.changePoint.forEach(function (v, idx) {
                        if (idx === 0)
                            g.moveTo(v.point.x, v.point.y);
                        else
                            g.lineTo(v.point.x, v.point.y);
                    });
                    g.stroke();
                });
            }
        };
        Hited.prototype.update = function () {
            this.draw();
        };
        Hited.prototype.Quit = function () {
            this.hs = null;
            this.context.dropGraphics(this.graphics);
            this.graphics = null;
            this.nowPath = null;
            this.nowType = Enums_1.SiteLineType.red;
            this.pathRenderArray.forEach(function (v) { v.recycle(); });
            this.pathRenderArray = [];
            for (var idx = 0; idx < this.addSiteArray.length - 1; idx++) {
                var v = this.addSiteArray[idx];
                var nv = this.addSiteArray[idx + 1];
                GameObjectManange_1.default.Instance.getLine(this.nowType, null, v, nv);
            }
            this.addSiteArray = [];
            this.removeSiteArray = [];
        };
        Hited = __decorate([
            mUnique(),
            mAttach('hited'),
            mState('Hited', SiteRenderStateMachine)
        ], Hited);
        return Hited;
    }(BaseDraw));
    SiteRenderStates.Hited = Hited;
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
                var polygon = renderNode.getComponent(PolygonEditor_1.default);
                if (firstPath.isEnd) {
                    renderNode = firstPath.nextSite.node;
                    var renderNode1 = firstPath.lastSite.node;
                    var polygon1 = renderNode1.getComponent(PolygonEditor_1.default);
                    if (polygon1) {
                        polygon1.points.forEach(function (p, idx) {
                            var point = p.add(renderNode.position);
                            if (idx === 0)
                                g.moveTo(point.x, point.y);
                            else
                                g.lineTo(point.x, point.y);
                        });
                        if (polygon1.points.length > 2)
                            g.close();
                    }
                    else {
                        g.circle(renderNode1.x, renderNode1.y, this.context.SiteRadius);
                    }
                }
                if (polygon) {
                    polygon.points.forEach(function (p, idx) {
                        var point = p.add(renderNode.position);
                        if (idx === 0)
                            g.moveTo(point.x, point.y);
                        else
                            g.lineTo(point.x, point.y);
                    });
                    if (polygon.points.length > 2)
                        g.close();
                }
                else {
                    g.circle(renderNode.x, renderNode.y, this.context.SiteRadius);
                }
                g.stroke();
                firstPath = firstPath.NextPath;
            }
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
        