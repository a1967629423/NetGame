"use strict";
cc._RF.push(module, 'bf308BdYxpMHariZ765QAUv', 'ScoreManage');
// script/manage/ScoreManage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Score;
(function (Score) {
    var ScoreType;
    (function (ScoreType) {
        ScoreType[ScoreType["normal"] = 0] = "normal";
        ScoreType[ScoreType["people"] = 1] = "people";
    })(ScoreType = Score.ScoreType || (Score.ScoreType = {}));
    var ScoreEvent = /** @class */ (function () {
        function ScoreEvent() {
        }
        ScoreEvent.SCORE_CHANGE = 'ScoreChange';
        ScoreEvent.SCORE_ADD = 'ScoreAdd';
        ScoreEvent.SCORE_SUB = 'ScoreSub';
        return ScoreEvent;
    }());
    Score.ScoreEvent = ScoreEvent;
    var ScoreManage = /** @class */ (function (_super) {
        __extends(ScoreManage, _super);
        function ScoreManage() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.scoreCache = [];
            _this.nowScore = 0;
            _this.stype = ScoreType.normal;
            return _this;
        }
        ScoreManage.getInstance = function (type) {
            var ii = this._instance.find(function (value) { return value.type === type; });
            var result = null;
            if (ii) {
                if (ii.SM) {
                    result = ii.SM;
                }
                else {
                    var node = new cc.Node('ScoreManage');
                    result = ii.SM = node.addComponent(ScoreManage);
                    result.stype = type;
                    node.setParent(cc.director.getScene());
                }
            }
            else {
                var node = new cc.Node('ScoreManage');
                result = node.addComponent(ScoreManage);
                node.setParent(cc.director.getScene());
                result.stype = type;
                this._instance.push({ type: type, SM: result });
            }
            return result;
        };
        ScoreManage.prototype.addScore = function (score) {
            this.node.emit(ScoreEvent.SCORE_ADD, score);
            this.scoreCache.push(score);
        };
        ScoreManage.prototype.subScore = function (score) {
            this.node.emit(ScoreEvent.SCORE_SUB, score);
            this.scoreCache.push(-score);
        };
        ScoreManage.prototype.update = function () {
            if (this.scoreCache.length > 0) {
                var Sum = 0;
                while (this.scoreCache.length) {
                    Sum += this.scoreCache.pop();
                }
                if (Sum !== 0) {
                    var newScore = this.nowScore + Sum;
                    this.node.emit(ScoreEvent.SCORE_CHANGE, newScore, this.nowScore);
                    this.nowScore = newScore;
                }
            }
        };
        ScoreManage.prototype.onDestroy = function () {
            var _this = this;
            var mi = ScoreManage._instance.find(function (value) { return value.type === _this.stype; });
            if (mi && mi.SM) {
                mi.SM = null;
            }
        };
        ScoreManage._instance = [];
        return ScoreManage;
    }(cc.Component));
    Score.ScoreManage = ScoreManage;
})(Score = exports.Score || (exports.Score = {}));

cc._RF.pop();