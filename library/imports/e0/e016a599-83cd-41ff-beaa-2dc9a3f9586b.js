"use strict";
cc._RF.push(module, 'e016aWZg81B/76qLcmj+Vhr', 'SiteStates');
// script/site/State/SiteStates.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SiteMachine_1 = require("../SiteMachine");
var StateDec_1 = require("../../../frame/StateMachine/StateDec");
var StateMachine_1 = require("../../../frame/StateMachine/StateMachine");
var GameObjectManange_1 = require("../../manage/GameObjectManange");
var Enums_1 = require("../../Enums");
var PrefabFactory_1 = require("../../../frame/PrefabFactory/PrefabFactory");
var mDefaultState = StateDec_1.MSMDsc.mDefaultState, mLinkTo = StateDec_1.MSMDsc.mLinkTo, mState = StateDec_1.MSMDsc.mState;
var SiteStates;
(function (SiteStates) {
    var Default = /** @class */ (function (_super) {
        __extends(Default, _super);
        function Default() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Default.prototype.checkType = function (type, result, dir) {
            if (!result.operatorValue) {
                this.context.SiteLines.forEach(function (value) {
                    //if(value!=this.context.)
                    //value.checkType(type,result,true);
                    //value.checkType(type,result,false);
                });
            }
        };
        Default.prototype.update = function (dt) {
        };
        Default.prototype.touch = function (t) {
        };
        Default.prototype.touchStart = function (t) {
        };
        Default.prototype.InitPoeple = function (people) {
            return __awaiter(this, void 0, void 0, function () {
                var len, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!people) return [3 /*break*/, 2];
                            len = Object.keys(Enums_1.SiteType).length - 1;
                            i = Math.floor(Math.random() * len);
                            return [4 /*yield*/, GameObjectManange_1.default.Instance.getPeople(i, this.context)];
                        case 1:
                            people = _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            console.log(people);
                            _a.label = 3;
                        case 3:
                            if (!people.node.parent) {
                                this.context.node.addChild(people.node);
                                this.context.SitePeople.push(people);
                            }
                            else {
                                console.log('have parent');
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        Default.prototype.loadingPoeple = function (result) {
            this.context.SitePeople.splice(this.context.SitePeople.findIndex(function (value) { return result.operatorValue === value; }), 1);
            //result.operatorValue.node.removeFromParent();
            this.context.node.removeChild(result.operatorValue.node);
            console.log('loaded a people');
        };
        Default.prototype.pushPeople = function (people) {
            var p = people.operatorValue;
            if (!p && CC_DEBUG) {
                debugger;
            }
            if (p.peopleType === this.context.SiteType) {
                PrefabFactory_1.default.NodePush(p.node);
            }
            else {
                console.log('转站');
                this.InitPoeple(p);
            }
            console.log('push a people');
        };
        Default.prototype.Start = function () {
            this.context.startCoroutine_Auto((function (_this) {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!true) return [3 /*break*/, 2];
                            return [4 /*yield*/, StateMachine_1.MSM.AwaitNextSecond.getInstance(8)];
                        case 1:
                            _a.sent();
                            if (Math.random() > 0.5) {
                                _this.InitPoeple();
                            }
                            return [3 /*break*/, 0];
                        case 2: return [2 /*return*/];
                    }
                });
            })(this));
        };
        Default.prototype.touchCancel = function (t) {
            return __awaiter(this, void 0, void 0, function () {
                var __pool, _a, _b, _i, f, value, next, type, nLine, lastSite, line;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            __pool = SiteMachine_1.SiteSM.SiteMachine.SiteMachines;
                            _a = [];
                            for (_b in __pool)
                                _a.push(_b);
                            _i = 0;
                            _c.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            f = _a[_i];
                            value = __pool[f].node;
                            if (!value.activeInHierarchy) return [3 /*break*/, 3];
                            if (!value['_hitTest'](t.getLocation())) return [3 /*break*/, 3];
                            next = value.getComponent(SiteMachine_1.SiteSM.SiteMachine);
                            type = 0;
                            if (this.context.SiteLines.length > 0) {
                                //站点上有线默认就使用第一个
                                type = this.context.SiteLines[0].LineType;
                            }
                            else {
                                //站点没线默认使用剩下的第一个
                                if (GameObjectManange_1.default.Instance.lineCount > 0)
                                    type = GameObjectManange_1.default.Instance.residueLineType[0];
                                else
                                    return [2 /*return*/];
                            }
                            nLine = this.context.SiteLines.find(function (value) { return value.LineType === type; });
                            lastSite = nLine && nLine.LastLine ? nLine.LastLine.NowSite : null;
                            return [4 /*yield*/, GameObjectManange_1.default.Instance.getLine(type, lastSite, this.context, next)];
                        case 2:
                            line = _c.sent();
                            if (line) {
                                //this.context.SiteLines.push(line.line);
                                //next.SiteLines.push(line.line);
                                //this.context.node.addChild(line.node);
                                return [3 /*break*/, 4];
                            }
                            if (CC_DEBUG) {
                                console.log('line add');
                            }
                            _c.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        Default = __decorate([
            mDefaultState,
            mState('Default', SiteMachine_1.SiteSM.SiteMachine)
        ], Default);
        return Default;
    }(SiteMachine_1.SiteSM.SiteState));
    SiteStates.Default = Default;
})(SiteStates = exports.SiteStates || (exports.SiteStates = {}));

cc._RF.pop();