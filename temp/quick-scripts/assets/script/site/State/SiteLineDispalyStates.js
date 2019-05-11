(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/site/State/SiteLineDispalyStates.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '71e65Wa8MpPEYNyH8fgoXF7', 'SiteLineDispalyStates', __filename);
// script/site/State/SiteLineDispalyStates.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SiteLine_1 = require("../SiteLine");
var StateDec_1 = require("../../../frame/StateMachine/StateDec");
var PrefabFactory_1 = require("../../../frame/PrefabFactory/PrefabFactory");
var GameObjectManange_1 = require("../../manage/GameObjectManange");
var ScenesObject_1 = require("../../../utility/ScenesObject");
var LineRender_1 = require("../../render/LineRender");
var mState = StateDec_1.MSMDsc.mState, mDefaultState = StateDec_1.MSMDsc.mDefaultState, mLinkTo = StateDec_1.MSMDsc.mLinkTo;
var SLDSMStates;
(function (SLDSMStates) {
    var Default = /** @class */ (function (_super) {
        __extends(Default, _super);
        function Default() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Default_1 = Default;
        Default.prototype.testVehicle = function () {
            return __awaiter(this, void 0, void 0, function () {
                var vechicle, vehicles;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            Default_1.asyncLock = false;
                            if (!(this.context.nowTypeVehicle.length == 0)) return [3 /*break*/, 2];
                            if (!this.context.isBegin) return [3 /*break*/, 2];
                            return [4 /*yield*/, GameObjectManange_1.default.Instance.getVehicle(this.context.NowSite, 0.1, this.context)];
                        case 1:
                            vechicle = _a.sent();
                            if (vechicle) {
                                vehicles = ScenesObject_1.default.instance.node.getChildByName('vehicles');
                                vehicles.addChild(vechicle.node);
                                this.context.registerVehicle(vechicle);
                            }
                            _a.label = 2;
                        case 2:
                            Default_1.asyncLock = true;
                            return [2 /*return*/];
                    }
                });
            });
        };
        Default.prototype.Start = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!Default_1.asyncLock) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.context.AwaitUntil(function () {
                                    return Default_1.asyncLock;
                                })];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [4 /*yield*/, this.testVehicle()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Default.prototype.update = function () {
        };
        var Default_1;
        Default.asyncLock = true;
        Default = Default_1 = __decorate([
            mDefaultState,
            mLinkTo('Cleared', 'cleared'),
            mLinkTo('Caculated', 'caculated'),
            mState('Default', SiteLine_1.SLDSM.SiteLine)
        ], Default);
        return Default;
    }(SiteLine_1.SLDSM.SiteLineDisplayState));
    SLDSMStates.Default = Default;
    var Caculated = /** @class */ (function (_super) {
        __extends(Caculated, _super);
        function Caculated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Caculated.prototype.Start = function () {
            //this.drawPath();
            var render = ScenesObject_1.default.instance.getComponentInChildren(LineRender_1.LineRender.LineRenderStateMachine);
            if (render) {
                render.updateRender();
            }
            this.context.emit('drawEnd');
        };
        Caculated = __decorate([
            mLinkTo('Default', 'drawEnd'),
            mState('Caculated', SiteLine_1.SLDSM.SiteLine)
        ], Caculated);
        return Caculated;
    }(SiteLine_1.SLDSM.SiteLineDisplayState));
    SLDSMStates.Caculated = Caculated;
    var Change = /** @class */ (function (_super) {
        __extends(Change, _super);
        function Change() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Change.prototype.Start = function () {
        };
        Change = __decorate([
            mLinkTo('Default', 'changeEnd'),
            mState('Change', SiteLine_1.SLDSM.SiteLine)
        ], Change);
        return Change;
    }(SiteLine_1.SLDSM.SiteLineDisplayState));
    SLDSMStates.Change = Change;
    var Cleared = /** @class */ (function (_super) {
        __extends(Cleared, _super);
        function Cleared() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Cleared.prototype.Start = function () {
            // var next = this.context.NextLine
            this.context.removeFromSitelines();
            this.context.NowSite.removeLine(this.context);
            debugger;
            if (this.context.LastLine && this.context.LastLine.NextLine === this.context) {
                //从后往前删除
                this.context.LastLine.NextLine = null;
                this.context.LastLine.changPoint = [];
            }
            else if (this.context.NextLine.LastLine === this.context) {
                //从前往后删除
                this.context.NextLine.LastLine = null;
            }
            if (this.context.changPoint.length == 0) {
                this.context.LastLine.HidenFlag = false;
                PrefabFactory_1.default.NodePush(this.context.node);
            }
            this.context.NextLine = null;
            this.context.LastLine = null;
            this.context.changPoint = [];
            var render = ScenesObject_1.default.instance.getComponentInChildren(LineRender_1.LineRender.LineRenderStateMachine);
            if (render) {
                render.updateRender();
            }
            this.context.ClearFlag = false;
            //this.context.emit('start');
            //this.context.NowSite.removeLine(this.context)
            // if(next)
            // {
            //     if(next.isEnd)
            //     {
            //         next.NowSite.removeLine(next);
            //         PrefabFactor.NodePush(next.node);
            //     }
            //     else
            //     {
            //         next.LastLine = null;
            //     }
            // }
            //this.context.emit('removed')
            // this.context.startCoroutine_Auto((function*(_this){
            //     while(_this.vehicles.length>0)
            //     {
            //         yield MSM.AwaitNextUpdate.getInstance(2);
            //     }
            //     //_this.NowSite.removeLine(this);
            //     //_this.LastLine = null;
            //     _this.emit('removed');
            // })(this.context));
        };
        Cleared = __decorate([
            mLinkTo('Removed', 'removed'),
            mState('Cleared', SiteLine_1.SLDSM.SiteLine)
        ], Cleared);
        return Cleared;
    }(SiteLine_1.SLDSM.SiteLineDisplayState));
    SLDSMStates.Cleared = Cleared;
    var Removed = /** @class */ (function (_super) {
        __extends(Removed, _super);
        function Removed() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Removed.prototype.Start = function () {
            //不显示的节点就移除
            debugger;
            this.context.emit('start');
        };
        Removed = __decorate([
            mState('Removed', SiteLine_1.SLDSM.SiteLine)
        ], Removed);
        return Removed;
    }(SiteLine_1.SLDSM.SiteLineDisplayState));
    SLDSMStates.Removed = Removed;
})(SLDSMStates = exports.SLDSMStates || (exports.SLDSMStates = {}));

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
        //# sourceMappingURL=SiteLineDispalyStates.js.map
        