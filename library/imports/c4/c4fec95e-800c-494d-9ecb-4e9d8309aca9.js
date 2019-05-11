"use strict";
cc._RF.push(module, 'c4feclegAxJTZ7LTp2DCayp', 'ClearManageStates');
// script/manage/states/ClearManageStates.ts

Object.defineProperty(exports, "__esModule", { value: true });
var StateDec_1 = require("../../../frame/StateMachine/StateDec");
var LineClearManage_1 = require("../LineClearManage");
var StateMachine_1 = require("../../../frame/StateMachine/StateMachine");
var SiteLine_1 = require("../../site/SiteLine");
var LineClearManage = LineClearManage_1.LineClear.LineClearManage, LineClearState = LineClearManage_1.LineClear.LineClearState;
var mDefaultState = StateDec_1.MSMDsc.mDefaultState, mLinkTo = StateDec_1.MSMDsc.mLinkTo, mState = StateDec_1.MSMDsc.mState, mAttach = StateDec_1.MSMDsc.mAttach, mUnique = StateDec_1.MSMDsc.mUnique;
var AwaitNextUpdate = StateMachine_1.MSM.AwaitNextUpdate;
var SiteLine = SiteLine_1.SLDSM.SiteLine;
var ClearManageStates;
(function (ClearManageStates) {
    var Default = /** @class */ (function (_super) {
        __extends(Default, _super);
        function Default() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Default = __decorate([
            mDefaultState,
            mLinkTo('Clear', 'clear'),
            mState('Default', LineClearManage)
        ], Default);
        return Default;
    }(LineClearState));
    ClearManageStates.Default = Default;
    var Clear = /** @class */ (function (_super) {
        __extends(Clear, _super);
        function Clear() {
            var _this_1 = _super !== null && _super.apply(this, arguments) || this;
            _this_1.haveTageLines = [];
            _this_1.wellBeClaer = [];
            return _this_1;
        }
        Clear.prototype.checkLineHaveClearFlag = function () {
            var _this_1 = this;
            SiteLine.SiteLines.forEach(function (lineStruct) {
                lineStruct.lines.forEach(function (line) {
                    if (line.ClearFlag && !_this_1.haveTageLines.find(function (value) { return value === line; })) {
                        _this_1.haveTageLines.push(line);
                    }
                });
            });
        };
        Clear.prototype.updateMaskAndClear = function () {
            var saveLine = [];
            SiteLine.LineVehicles.forEach(function (value) {
                value.Vehicles.forEach(function (vehicle) {
                    var vline = vehicle.line;
                    saveLine.push(vline);
                    var rundir = vehicle.rundir;
                    if (vline.isBegin) {
                        var nl = vline.NextLine;
                        saveLine.push(nl);
                    }
                    if (vline.NextLine && vline.NextLine.isEnd && rundir) {
                        saveLine.push(vline.NextLine);
                    }
                    if (vline.LastLine && vline.LastLine.isBegin && !rundir) {
                        saveLine.push(vline.LastLine);
                    }
                });
            });
            for (var i = this.haveTageLines.length - 1; i >= 0; i--) {
                var tl = this.haveTageLines[i];
                if (!saveLine.find(function (v) { return v === tl; })) {
                    tl.recycle();
                    this.haveTageLines.splice(i);
                }
            }
        };
        Clear.prototype.Start = function () {
            this.checkLineHaveClearFlag();
            this.context.node.on('clear', this.checkLineHaveClearFlag, this);
            this.context.startCoroutine_Auto((function (_this) {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!true) return [3 /*break*/, 2];
                            return [4 /*yield*/, AwaitNextUpdate.getInstance(1)];
                        case 1:
                            _a.sent();
                            if (_this.haveTageLines.length == 0) {
                                _this.context.emit('clearEnd');
                                return [3 /*break*/, 2];
                            }
                            _this.updateMaskAndClear();
                            return [3 /*break*/, 0];
                        case 2: return [2 /*return*/];
                    }
                });
            })(this));
        };
        Clear.prototype.Quit = function () {
            this.context.node.off('clear', this.checkLineHaveClearFlag, this);
        };
        Clear = __decorate([
            mLinkTo('Default', 'clearEnd'),
            mState('Clear', LineClearManage)
        ], Clear);
        return Clear;
    }(LineClearState));
    ClearManageStates.Clear = Clear;
    var Change = /** @class */ (function (_super) {
        __extends(Change, _super);
        function Change() {
            var _this_1 = _super !== null && _super.apply(this, arguments) || this;
            _this_1.haveTageLines = [];
            return _this_1;
        }
        Change.prototype.checkLIneHaveChangeFlag = function () {
            SiteLine_1.SLDSM.SiteLine.SiteLines.forEach(function (Linestruct) {
                Linestruct.lines.forEach(function (line) {
                });
            });
        };
        Change.prototype.Start = function () {
            this.context.node.on('change', this.checkLIneHaveChangeFlag, this);
            this.context.startCoroutine_Auto((function (_this) {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!true) return [3 /*break*/, 2];
                            return [4 /*yield*/, AwaitNextUpdate.getInstance()];
                        case 1:
                            _a.sent();
                            if (_this.haveTageLines.length === 0) {
                                _this.done();
                                return [3 /*break*/, 2];
                            }
                            return [3 /*break*/, 0];
                        case 2: return [2 /*return*/];
                    }
                });
            })(this));
        };
        Change.prototype.Quit = function () {
            this.context.node.off('change', this.checkLIneHaveChangeFlag, this);
        };
        Change = __decorate([
            mUnique,
            mAttach('change'),
            mState('Change', LineClearManage)
        ], Change);
        return Change;
    }(LineClearState));
    ClearManageStates.Change = Change;
})(ClearManageStates = exports.ClearManageStates || (exports.ClearManageStates = {}));

cc._RF.pop();