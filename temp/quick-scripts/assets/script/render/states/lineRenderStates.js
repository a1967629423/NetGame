(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/render/states/lineRenderStates.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fe26cMlMflLRrxmNDGzI3cX', 'lineRenderStates', __filename);
// script/render/states/lineRenderStates.ts

Object.defineProperty(exports, "__esModule", { value: true });
var LineRender_1 = require("../LineRender");
var StateDec_1 = require("../../../frame/StateMachine/StateDec");
var SiteLine_1 = require("../../site/SiteLine");
var Enums_1 = require("../../Enums");
var PathSM_1 = require("../../Path/PathSM");
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
        