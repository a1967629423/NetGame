(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/render/states/lineRenderStates.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fe26cMlMflLRrxmNDGzI3cX', 'lineRenderStates', __filename);
// script/render/states/lineRenderStates.ts

Object.defineProperty(exports, "__esModule", { value: true });
var LineRender_1 = require("../LineRender");
var StateDec_1 = require("../../../frame/StateMachine/StateDec");
var SiteLine_1 = require("../../site/SiteLine");
var Enums_1 = require("../../Enums");
var PathSM_1 = require("../../Path/PathSM");
var InputManage_1 = require("../../../frame/InputManage");
var Render_1 = require("../Render");
var SiteRender_1 = require("../SiteRender");
var LineRenderState = LineRender_1.LineRender.LineRenderState, LineRenderStateMachine = LineRender_1.LineRender.LineRenderStateMachine;
var mState = StateDec_1.MSMDsc.mState, mDefaultState = StateDec_1.MSMDsc.mDefaultState, mLinkTo = StateDec_1.MSMDsc.mLinkTo, mUnique = StateDec_1.MSMDsc.mUnique, mAttach = StateDec_1.MSMDsc.mAttach;
var SiteLine = SiteLine_1.SLDSM.SiteLine;
var SiteRenderStateMachine = SiteRender_1.SiteRender.SiteRenderStateMachine;
var LineRenderStates;
(function (LineRenderStates) {
    var BaseRender = /** @class */ (function (_super) {
        __extends(BaseRender, _super);
        function BaseRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.drawCache = [];
            return _this;
        }
        BaseRender.prototype.draw = function () {
            var g = this.context.graphics;
            var oldWidth = g.lineWidth;
            g.lineWidth = this.context.lineWidth;
            var drawedSite = [];
            this.drawCache = drawedSite;
            g.clear();
            var allPath = PathSM_1.Path.VehiclePath.allPath;
            allPath.forEach(function (v) {
                var color = Enums_1.ConvertRGBToColor(v.PathType);
                g.strokeColor = color;
                var firstPoint = v.changePoint[0].point;
                g.moveTo(firstPoint.x, firstPoint.y);
                for (var i = 1; i < v.changePoint.length; i++) {
                    var np = v.changePoint[i].point;
                    g.lineTo(np.x, np.y);
                }
                g.stroke();
            });
            g.lineWidth = oldWidth;
        };
        return BaseRender;
    }(LineRenderState));
    LineRenderStates.BaseRender = BaseRender;
    var Default = /** @class */ (function (_super) {
        __extends(Default, _super);
        function Default() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Default.prototype.touch = function () {
            this.context.emit('drag');
        };
        Default.prototype.updateRender = function () {
            this.draw();
        };
        Default = __decorate([
            mDefaultState,
            mLinkTo('DragLine', 'drag'),
            mState('Default', LineRenderStateMachine)
        ], Default);
        return Default;
    }(BaseRender));
    LineRenderStates.Default = Default;
    var ConvertInputPointToWorld = InputManage_1.IPSM.ConvertInputPointToWorld;
    var DragLine = /** @class */ (function (_super) {
        __extends(DragLine, _super);
        function DragLine() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.nG = null;
            _this.firstPath = null;
            _this.secondPath = null;
            _this.renderPaths = [];
            return _this;
        }
        DragLine.prototype.stateEnd = function () {
            this.context.emit('dragEnd');
            this.context.dropGraphics(this.nG);
        };
        DragLine.prototype.touchEnd = function () {
            this.stateEnd();
        };
        DragLine.prototype.touchCancel = function () {
            this.stateEnd();
        };
        DragLine.prototype.touch = function (t) {
            if (this.firstPath) {
                var fp = this.firstPath;
                var sp = this.secondPath;
                var location = this.context.node.convertToNodeSpaceAR(ConvertInputPointToWorld(t.getLocation(), this.context.node));
                fp.setPoint(fp.beginPoint, location);
                sp.setPoint(location, sp.endPoint);
            }
        };
        DragLine.prototype.draw = function () {
            if (this.nG) {
                var g = this.nG;
                g.clear();
                this.renderPaths.forEach(function (p) {
                    var changePoint = p.changePoint;
                    changePoint.forEach(function (v, idx) {
                        if (idx === 0) {
                            g.moveTo(v.point.x, v.point.y);
                            return;
                        }
                        g.lineTo(v.point.x, v.point.y);
                    });
                    g.stroke();
                });
            }
        };
        DragLine.prototype.update = function () {
            this.draw();
        };
        DragLine.prototype.Quit = function () {
            if (this.firstPath)
                this.firstPath.recycle();
            if (this.secondPath)
                this.secondPath.recycle();
            this.renderPaths = [];
        };
        DragLine.prototype.Start = function () {
            this.nG = this.context.createGraphics(this.context.graphics);
            if (this.nG && this.context._HitedLine) {
                this.firstPath = this.context._HitedLine.clone();
                this.secondPath = this.firstPath.clone();
                this.renderPaths = [this.firstPath, this.secondPath];
                this.nG.lineWidth = this.context.lineWidth;
                var color = Enums_1.ConvertRGBToColor(this.firstPath.PathType).clone();
                color.setA(125);
                this.nG.strokeColor = color;
            }
            else {
                this.stateEnd();
            }
        };
        DragLine = __decorate([
            mLinkTo('Default', 'dragEnd'),
            mState('DragLine', LineRenderStateMachine)
        ], DragLine);
        return DragLine;
    }(BaseRender));
    LineRenderStates.DragLine = DragLine;
    var LineDragOp = /** @class */ (function (_super) {
        __extends(LineDragOp, _super);
        function LineDragOp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LineDragOp.prototype.Start = function () {
            console.log('test run');
            this.done();
        };
        LineDragOp = __decorate([
            mUnique(true),
            mAttach('lineDrag', true),
            mState('LineDragOp', LineRenderStateMachine)
        ], LineDragOp);
        return LineDragOp;
    }(Render_1.RenderBaseState));
    LineRenderStates.LineDragOp = LineDragOp;
})(LineRenderStates = exports.LineRenderStates || (exports.LineRenderStates = {}));

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
        //# sourceMappingURL=lineRenderStates.js.map
        