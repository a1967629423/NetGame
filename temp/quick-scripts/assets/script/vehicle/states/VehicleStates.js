(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/vehicle/states/VehicleStates.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b8079qE9dlFTpnnBRRu76QW', 'VehicleStates', __filename);
// script/vehicle/states/VehicleStates.ts

Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine_1 = require("../../../frame/StateMachine/StateMachine");
var StateDec_1 = require("../../../frame/StateMachine/StateDec");
var VehicleMachine_1 = require("../VehicleMachine");
/**
 * 已完成载具移动（依赖于线计算位置）
 * 已完成到达站点卸人载人（是否上下车依赖站点检查类型）
 * 已完成自动转向
 */
var mDefaultState = StateDec_1.MSMDsc.mDefaultState, mLinkTo = StateDec_1.MSMDsc.mLinkTo, mState = StateDec_1.MSMDsc.mState;
var VehicleStates;
(function (VehicleStates) {
    var Default = /** @class */ (function (_super) {
        __extends(Default, _super);
        function Default() {
            var _this_1 = _super !== null && _super.apply(this, arguments) || this;
            _this_1.lastLine = null;
            return _this_1;
        }
        Default.prototype.Start = function () {
            this.context.line.addVehicle(this.context);
        };
        Default.prototype.update = function (dt) {
            var nPro = this.context.nowProgress + dt * this.context.rate;
            var sLine = this.context.line;
            if (nPro > 0 && nPro < this.context.line.allLength) {
                var _a = this.context.line.getLocation(nPro, this.context.rundir), position = _a.position, radian = _a.radian;
                this.context.node.position = position;
                this.context.nowProgress = nPro;
                this.context.node.rotation = DMath.radianToAngle(radian);
            }
            else {
                if (this.context.rundir) {
                    this.context.nowSite = this.context.line.nextSite;
                    if (this.context.line.isEnd) {
                        this.context.rundir = !this.context.rundir;
                    }
                    else if (this.context.line.NextPath) {
                        this.context.line = this.context.line.NextPath;
                    }
                }
                else {
                    this.context.nowSite = this.context.line.lastSite;
                    if (this.context.line.isBegin) {
                        this.context.rundir = !this.context.rundir;
                    }
                    else if (this.context.line.LastPath) {
                        this.context.line = this.context.line.LastPath;
                    }
                }
                sLine.removeVehicle(this.context);
                //this.context.line = this.context.nowSite.SiteLines.find(value=>value.LineType==this.context.line.LineType);
                //this.context.nowSite = this.context.rundir? this.context.line.NextLine?this.context.line.NextLine.NowSite:this.context.line.NowSite:this.context.line.LastLine?this.context.line.LastLine.LastSite:this.context.line.NowSite;
                // if (this.context.line.isBegin || this.context.line.isEnd||this.context.getNextLine().ClearFlag) {
                //     this.context.rundir = !this.context.rundir;
                //     //this.context.nowProgress= this.context.line.isBegin?0.9:0.1;
                // }
                this.context.nowProgress = 0;
                this.context.emit('loading');
            }
        };
        Default = __decorate([
            mDefaultState,
            mLinkTo('Load', 'loading'),
            mState('Default', VehicleMachine_1.Vehicle.VehicleMachine)
        ], Default);
        return Default;
    }(VehicleMachine_1.Vehicle.VehicleState));
    VehicleStates.Default = Default;
    var Loading = /** @class */ (function (_super) {
        __extends(Loading, _super);
        function Loading() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Loading.prototype.Start = function () {
            var nowSite = this.context.nowSite;
            var sitePeople = nowSite.SitePeople;
            var peoples = this.context.peoples;
            var _this = this;
            this.context.startCoroutine_Auto((function () {
                var i, np, item, loadpeop, OS;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = peoples.length - 1;
                            _a.label = 1;
                        case 1:
                            if (!(i >= 0)) return [3 /*break*/, 4];
                            np = peoples[i];
                            if (!(np && np.GetOffVehicle(_this.context))) return [3 /*break*/, 3];
                            return [4 /*yield*/, StateMachine_1.MSM.AwaitNextSecond.getInstance(0.4)];
                        case 2:
                            _a.sent();
                            _this.context.node.removeChild(np.node);
                            nowSite.pushPeople(StateMachine_1.MSM.OperatorStruct.getinstance(np));
                            peoples.splice(i, 1);
                            _a.label = 3;
                        case 3:
                            i--;
                            return [3 /*break*/, 1];
                        case 4:
                            item = sitePeople.length;
                            _a.label = 5;
                        case 5:
                            if (!(item >= 0)) return [3 /*break*/, 8];
                            loadpeop = sitePeople[item];
                            if (!(loadpeop && loadpeop.GetInVehicle(_this.context))) return [3 /*break*/, 7];
                            return [4 /*yield*/, StateMachine_1.MSM.AwaitNextSecond.getInstance(0.4)];
                        case 6:
                            _a.sent();
                            OS = StateMachine_1.MSM.OperatorStruct.getinstance(loadpeop);
                            nowSite.loadingPoeple(OS);
                            loadpeop.node.setParent(_this.context.node);
                            peoples.unshift(loadpeop);
                            OS.recycle();
                            _a.label = 7;
                        case 7:
                            item--;
                            return [3 /*break*/, 5];
                        case 8:
                            _this.context.emit('loaded');
                            return [2 /*return*/];
                    }
                });
            })());
        };
        Loading = __decorate([
            mLinkTo('Default', 'loaded'),
            mState('Load', VehicleMachine_1.Vehicle.VehicleMachine)
        ], Loading);
        return Loading;
    }(VehicleMachine_1.Vehicle.VehicleState));
    VehicleStates.Loading = Loading;
})(VehicleStates = exports.VehicleStates || (exports.VehicleStates = {}));

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
        //# sourceMappingURL=VehicleStates.js.map
        