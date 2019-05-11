"use strict";
cc._RF.push(module, '0ab06hFbGZFH5HkFWWlafzi', 'showScore');
// utility/showScore.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ScoreManage_1 = require("../script/manage/ScoreManage");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var showScore = /** @class */ (function (_super) {
    __extends(showScore, _super);
    function showScore() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showlabel = null;
        _this.showtext = '当前分数%d';
        _this.showType = ScoreManage_1.Score.ScoreType.normal;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    showScore.prototype.start = function () {
        var _this = this;
        ScoreManage_1.Score.ScoreManage.getInstance(this.showType).node.on(ScoreManage_1.Score.ScoreEvent.SCORE_CHANGE, function (newscore) {
            _this.showlabel.string = _this.showtext.replace('%d', newscore);
        });
    };
    __decorate([
        property(cc.Label)
    ], showScore.prototype, "showlabel", void 0);
    __decorate([
        property
    ], showScore.prototype, "showtext", void 0);
    __decorate([
        property({ type: cc.Enum(ScoreManage_1.Score.ScoreType) })
    ], showScore.prototype, "showType", void 0);
    showScore = __decorate([
        ccclass
    ], showScore);
    return showScore;
}(cc.Component));
exports.default = showScore;

cc._RF.pop();