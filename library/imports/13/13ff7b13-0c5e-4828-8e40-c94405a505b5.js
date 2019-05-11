"use strict";
cc._RF.push(module, '13ff7sTDF5IKI5AyUQFpQW1', 'TimeManage');
// script/manage/TimeManage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine_1 = require("../../frame/StateMachine/StateMachine");
var StateDec_1 = require("../../frame/StateMachine/StateDec");
var ScenesObject_1 = require("../../utility/ScenesObject");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TimeMSM;
(function (TimeMSM) {
    var TimeManage = /** @class */ (function (_super) {
        __extends(TimeManage, _super);
        function TimeManage() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.oneDayTime = 60;
            _this.steptime = 1;
            _this.nowStep = 0;
            _this.nowTime = 0;
            _this.SiteNode = null;
            return _this;
            // update (dt) {}
        }
        TimeManage.prototype.start = function () {
            _super.prototype.start.call(this);
            this.SiteNode = ScenesObject_1.default.instance.node.children.find(function (value) { return value.name === 'sites'; });
        };
        TimeManage.prototype.update = function (dt) {
            _super.prototype.update.call(this, dt);
        };
        __decorate([
            property
        ], TimeManage.prototype, "oneDayTime", void 0);
        __decorate([
            property
        ], TimeManage.prototype, "steptime", void 0);
        TimeManage = __decorate([
            ccclass,
            StateDec_1.MSMDsc.mStateMachine
        ], TimeManage);
        return TimeManage;
    }(StateMachine_1.MSM.StateMachine));
    TimeMSM.TimeManage = TimeManage;
    var TimeManageState = /** @class */ (function (_super) {
        __extends(TimeManageState, _super);
        function TimeManageState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TimeManageState;
    }(StateMachine_1.MSM.State));
    TimeMSM.TimeManageState = TimeManageState;
})(TimeMSM = exports.TimeMSM || (exports.TimeMSM = {}));

cc._RF.pop();