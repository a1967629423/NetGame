"use strict";
cc._RF.push(module, 'fe26cMlMflLRrxmNDGzI3cX', 'lineRenderStates');
// script/render/states/lineRenderStates.ts

Object.defineProperty(exports, "__esModule", { value: true });
var LineRender_1 = require("../LineRender");
var StateDec_1 = require("../../../frame/StateMachine/StateDec");
var SiteLine_1 = require("../../site/SiteLine");
var Enums_1 = require("../../Enums");
var LineRenderState = LineRender_1.LineRender.LineRenderState, LineRenderStateMachine = LineRender_1.LineRender.LineRenderStateMachine;
var mState = StateDec_1.MSMDsc.mState, mDefaultState = StateDec_1.MSMDsc.mDefaultState, mLinkTo = StateDec_1.MSMDsc.mLinkTo;
var SiteLine = SiteLine_1.SLDSM.SiteLine;
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
            SiteLine.SiteLines.forEach(function (value) {
                var nowLine = SiteLine.getBeginLine(value.lineType);
                if (!nowLine.isEnd) {
                    //取得线段颜色
                    var color = Enums_1.ConvertRGBToColor(value.lineType);
                    g.strokeColor = color;
                    //取第一个节点进行定位
                    var SiteNode = nowLine;
                    if (SiteNode.mask & 1) {
                        g.strokeColor = g.strokeColor.setA(125);
                    }
                    g.moveTo(SiteNode.node.x, SiteNode.node.y);
                    SiteNode.changPoint.forEach(function (value) {
                        g.lineTo(value.point.x, value.point.y);
                    });
                    var nodes = [SiteNode];
                    drawedSite.push({ type: value.lineType, node: nodes });
                    nowLine = nowLine.NextLine;
                    g.stroke();
                    g.strokeColor = color;
                    debugger;
                    while (nowLine) {
                        var nowSiteNode = nowLine;
                        if (nowLine.mask & 1) {
                            g.strokeColor = g.strokeColor.setA(125);
                        }
                        g.moveTo(nowSiteNode.node.x, nowSiteNode.node.y);
                        nowSiteNode.changPoint.forEach(function (value) {
                            g.lineTo(value.point.x, value.point.y);
                        });
                        nowLine = nowLine.NextLine;
                        nodes.push(nowSiteNode);
                        g.stroke();
                        g.strokeColor = color;
                    }
                }
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
    var DragLine = /** @class */ (function (_super) {
        __extends(DragLine, _super);
        function DragLine() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DragLine = __decorate([
            mLinkTo('Default', 'dragEnd'),
            mState('DragLine', LineRenderStateMachine)
        ], DragLine);
        return DragLine;
    }(BaseRender));
    LineRenderStates.DragLine = DragLine;
})(LineRenderStates = exports.LineRenderStates || (exports.LineRenderStates = {}));

cc._RF.pop();