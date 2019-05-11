"use strict";
cc._RF.push(module, '9b43bBUV5VFMKchs4jBeSvh', 'TimeManageStates');
// script/manage/states/TimeManageStates.ts

Object.defineProperty(exports, "__esModule", { value: true });
var TimeManage_1 = require("../TimeManage");
var StateDec_1 = require("../../../frame/StateMachine/StateDec");
var StateMachine_1 = require("../../../frame/StateMachine/StateMachine");
var SiteMachine_1 = require("../../site/SiteMachine");
var GameObjectManange_1 = require("../GameObjectManange");
var Enums_1 = require("../../Enums");
var mState = StateDec_1.MSMDsc.mState, mDefaultState = StateDec_1.MSMDsc.mDefaultState, mLinkTo = StateDec_1.MSMDsc.mLinkTo;
var TimeManageStates;
(function (TimeManageStates) {
    var Default = /** @class */ (function (_super) {
        __extends(Default, _super);
        function Default() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Default.prototype.generateSite = function () {
            return __awaiter(this, void 0, void 0, function () {
                var containFlag, gx, gy, dw, dh, generateRect, mrect, machines, i, keys, typelen, sittype, site;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            containFlag = true;
                            _a.label = 1;
                        case 1:
                            if (!containFlag) return [3 /*break*/, 4];
                            containFlag = false;
                            gx = Math.random() * 2000 - 1000;
                            gy = Math.random() * 2000 - 1000;
                            dw = 300;
                            dh = 300;
                            generateRect = cc.rect(gx, gy, dw, dh);
                            mrect = cc.rect();
                            machines = SiteMachine_1.SiteSM.SiteMachine.SiteMachines;
                            for (i in machines) {
                                mrect.x = machines[i].node.x;
                                mrect.y = machines[i].node.y;
                                mrect.height = machines[i].node.height;
                                mrect.width = machines[i].node.width;
                                if (mrect.containsRect(generateRect)) {
                                    containFlag = true;
                                    break;
                                }
                            }
                            if (!!containFlag) return [3 /*break*/, 3];
                            keys = Object.keys(Enums_1.SiteType);
                            typelen = keys.length;
                            sittype = Math.floor(Math.random() * typelen);
                            console.log(sittype);
                            return [4 /*yield*/, GameObjectManange_1.default.Instance.getSite(sittype)];
                        case 2:
                            site = _a.sent();
                            if (site) {
                                site.node.setParent(this.context.SiteNode);
                                site.node.x = gx;
                                site.node.y = gy;
                            }
                            _a.label = 3;
                        case 3: return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        Default.prototype.Start = function () {
            var steptime = this.context.steptime;
            var node = this.context.node;
            var context = this.context;
            this.context.startCoroutine_Auto((function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!true) return [3 /*break*/, 2];
                            node.emit('timeUpdate', context.nowTime);
                            return [4 /*yield*/, new StateMachine_1.MSM.AwaitNextSecond(steptime)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 0];
                        case 2: return [2 /*return*/];
                    }
                });
            })());
            this.context.startCoroutine_Auto((function () {
                var dt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!true) return [3 /*break*/, 2];
                            return [4 /*yield*/, new StateMachine_1.MSM.AwaitNextUpdate()];
                        case 1:
                            dt = _a.sent();
                            if (context.nowTime < context.oneDayTime) {
                                context.nowTime += dt;
                            }
                            else {
                                context.nowTime = 0;
                            }
                            return [3 /*break*/, 0];
                        case 2: return [2 /*return*/];
                    }
                });
            })());
            this.context.startCoroutine_Auto((function (_this) {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!true) return [3 /*break*/, 2];
                            return [4 /*yield*/, new StateMachine_1.MSM.AwaitNextSecond(50)];
                        case 1:
                            _a.sent();
                            _this.generateSite();
                            return [3 /*break*/, 0];
                        case 2: return [2 /*return*/];
                    }
                });
            })(this));
        };
        Default = __decorate([
            mLinkTo('Pause', 'pause'),
            mDefaultState,
            mState('Default', TimeManage_1.TimeMSM.TimeManage)
        ], Default);
        return Default;
    }(TimeManage_1.TimeMSM.TimeManageState));
    TimeManageStates.Default = Default;
    var Pause = /** @class */ (function (_super) {
        __extends(Pause, _super);
        function Pause() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Pause = __decorate([
            mLinkTo('Default', 'resume'),
            mState('Pause', TimeManage_1.TimeMSM.TimeManage)
        ], Pause);
        return Pause;
    }(TimeManage_1.TimeMSM.TimeManageState));
    TimeManageStates.Pause = Pause;
})(TimeManageStates = exports.TimeManageStates || (exports.TimeManageStates = {}));

cc._RF.pop();