"use strict";
cc._RF.push(module, '55ecc8XDcRJz4IUfJwhuNkY', 'SiteMachine');
// script/site/SiteMachine.ts

Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine_1 = require("../../frame/StateMachine/StateMachine");
var StateDec_1 = require("../../frame/StateMachine/StateDec");
var InputManage_1 = require("../../frame/InputManage");
var SitePeople_1 = require("./SitePeople");
var PrefabFactory_1 = require("../../frame/PrefabFactory/PrefabFactory");
var Enums_1 = require("../Enums");
var ObjectFactory_1 = require("../../frame/ObjectPool/ObjectFactory");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var mSyncAttachFunc = StateDec_1.MSMDsc.mSyncAttachFunc, mSyncFunc = StateDec_1.MSMDsc.mSyncFunc;
var SiteLineSM;
(function (SiteLineSM) {
    var SiteLineMachine = /** @class */ (function () {
        function SiteLineMachine() {
            this.LastSite = null;
            this.LastLine = null;
            this.NowSite = null;
            this.NextLine = null;
            this.NextSite = null;
            this.allLength = 0;
            this.changPoint = [];
            this.rchangePoint = [];
            this.node = null;
            this._LineType = Enums_1.SiteLineType.red;
        }
        SiteLineMachine.prototype.recycle = function () {
            SiteLineMachine.OF.push(this);
        };
        SiteLineMachine.prototype.unuse = function () {
        };
        SiteLineMachine.prototype.reuse = function () {
        };
        Object.defineProperty(SiteLineMachine.prototype, "LineType", {
            get: function () {
                return this._LineType;
            },
            set: function (val) {
                this._LineType = val;
            },
            enumerable: true,
            configurable: true
        });
        SiteLineMachine.prototype.onLoad = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        SiteLineMachine.caculatePath = function (n, e, Line) {
            var _a = DMath.pathCalcaulate(n.node.x, n.node.y, e.node.x, e.node.y), x = _a.x, y = _a.y, allLength = _a.allLength, firstRadian = _a.firstRadian, lastRadian = _a.lastRadian, rectDir = _a.rectDir, rectH = _a.rectH, rectW = _a.rectW;
            Line.allLength = allLength;
            Line.changPoint = [];
            Line.changPoint.push({ length: rectDir ? rectW : rectH, point: cc.v2(x, y), Radian: firstRadian });
            Line.changPoint.push({ length: allLength, point: e.node.position, Radian: lastRadian });
        };
        SiteLineMachine.getLM = function (n, b, e, t, node) {
            return __awaiter(this, void 0, Promise, function () {
                var directory;
                return __generator(this, function (_a) {
                    directory = this.SiteInfo.find(function (value) { return value.key === t; });
                    if (n) {
                        // var Line = n.SiteLines.find(value => value.LineType === t);
                        // var next = e?e.SiteLines.find(value=>value.LineType===t):null;
                        // if(Line===next&&CC_DEBUG)debugger;
                        // if (!directory) {
                        //     this.SiteInfo.push({ key: t, value: [n, e] });
                        // }
                        // else if (directory.value[directory.value.length - 1] === n&&!next) {
                        //     if (directory.value[0] != e) {
                        //         directory.value.push(e);
                        //     }
                        //     else {
                        //         return null
                        //     }
                        // }
                        // else {
                        //     if(Line&&!Line.isEnd)
                        //     {
                        //         // let next = Line.NextLine;
                        //         // let last = Line.LastLine;
                        //         // var oldLine = Line;
                        //         // directory.value.splice(directory.value.findIndex(value=>value===n),1)
                        //         // directory.value.push(e);
                        //         // n.removeLine(Line);
                        //         // if(CC_DEBUG)debugger;
                        //         // var SiteLine = await GameObjectManage.Instance.getLine(t,last.NowSite,e,next.NowSite);
                        //         // if(!SiteLine)return null;
                        //         // Line = SiteLine.line;
                        //         // // Line.NowSite =e;
                        //         // // Line.LastLine = last;
                        //         // // Line.NextLine = next;
                        //         // last.NextLine = Line;
                        //         // next.LastLine = Line;
                        //         // oldLine.NextLine = Line;
                        //         // this.caculatePath(last.NowSite,Line.NowSite,last);
                        //         // this.caculatePath(Line.NowSite,next.NowSite,Line);
                        //         // n.addLine(Line);
                        //         // //next.changPoint = Line.changPoint;
                        //         // //next.allLength = Line.allLength;
                        //         // //删除b上的节点
                        //         // //新建e连接next与last
                        //     }
                        //     return null
                        // }
                        // if (!Line) {
                        //     Line = this.OF.pop()
                        //     n.SiteLines.push(Line);
                        // }
                        // //计算路径
                        // // var { x, y, allLength, firstRadian, lastRadian, rectDir, rectH, rectW } = DMath.pathCalcaulate(n.node.x, n.node.y, e.node.x, e.node.y)
                        // // Line.allLength = allLength;
                        // // Line.changPoint = []
                        // // Line.changPoint.push({ length: rectDir ? rectW : rectH, point: cc.v2(x, y), Radian: firstRadian })
                        // // Line.changPoint.push({ length: allLength, point: e.node.position, Radian: lastRadian });
                        // this.caculatePath(n,e,Line);
                        // //Line.rchangePoint = [].concat(Line.changPoint).reverse()
                        // Line.NowSite = n;
                        // Line.LineType = t;
                        // var lastSiteLine = b?b.SiteLines.find(value=>value.LineType===t):null;
                        // if(lastSiteLine&&lastSiteLine!==Line)
                        // {
                        //     Line.LastLine = lastSiteLine
                        // }
                        // Line.node = node;
                        // if(!next)
                        // {
                        //     next = this.OF.pop();
                        //     e.SiteLines.push(next);
                        // }
                        // else
                        // {
                        //     var Old = next;
                        //     next = this.OF.pop();
                        //     Old.destory(next);
                        //     e.SiteLines[e.SiteLines.findIndex(value=>value===next)]=next;
                        // }
                        // next.LineType = t;
                        // next.LastLine = Line;
                        // next.NowSite = e;
                        // next.node = e.node;
                        // next.allLength =  Line.allLength;
                        // next.changPoint = Line.changPoint;
                        // Line.NextLine = next;
                        // return Line
                    }
                    else
                        return [2 /*return*/, null];
                    return [2 /*return*/];
                });
            });
        };
        SiteLineMachine.prototype.destory = function (newLine) {
            var _this = this;
            this.NextLine = newLine;
            this.node.on('runEnd', function () {
                _this.NextLine = null;
                _this.LastLine = null;
                PrefabFactory_1.default.NodePush(_this.node);
            });
        };
        Object.defineProperty(SiteLineMachine.prototype, "isEnd", {
            get: function () {
                return !this.NextLine;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SiteLineMachine.prototype, "isBegin", {
            get: function () {
                return !this.LastLine;
            },
            enumerable: true,
            configurable: true
        });
        SiteLineMachine.prototype.getLocation = function (progress, dir) {
            if (dir === void 0) { dir = true; }
            var nLine = dir ? this : this.LastLine;
            var narr = nLine.changPoint; //dir?this.changPoint:this.rchangePoint
            var nprogress = dir ? progress : nLine.allLength - progress;
            var idx = narr.findIndex(function (value) { return value.length >= nprogress; });
            var cp = narr[idx];
            var lastp = nLine.NowSite.node.position;
            var nLenght = cp.length;
            if (idx >= 1) {
                lastp = narr[idx - 1].point;
                nprogress -= narr[idx - 1].length;
                nLenght -= narr[idx - 1].length;
            }
            var np = lastp.lerp(cp.point, nprogress / nLenght); //dir?lastp.lerp(cp.point,cl):cp.point.lerp(lastp,cl);
            return { position: np, radian: cp.Radian + (dir ? 0 : Math.PI) };
            // return dir?this.NowSite.node.position.lerp(this.NextLine.NowSite.node.position,progress):this.NextLine.NowSite.node.position.lerp(this.NowSite.node.position,progress);
        };
        SiteLineMachine.prototype.checkType = function (type, result, dir) {
            if (result.operatorInformation.unfirst && this.NowSite.SiteType === type) {
                result.operatorValue = true;
                return;
            }
            else {
                result.operatorInformation.unfirst = true;
            }
            dir ? this.NextLine ? this.NextLine.checkType(type, result, dir) : null : this.LastLine ? this.LastLine.checkType(type, result, dir) : null;
        };
        SiteLineMachine.SiteInfo = [];
        SiteLineMachine.OF = new ObjectFactory_1.default(true, SiteLineMachine);
        return SiteLineMachine;
    }());
    SiteLineSM.SiteLineMachine = SiteLineMachine;
})(SiteLineSM = exports.SiteLineSM || (exports.SiteLineSM = {}));
var SiteSM;
(function (SiteSM) {
    var SiteMachine = /** @class */ (function (_super) {
        __extends(SiteMachine, _super);
        function SiteMachine() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.SitePeople = [];
            _this.SiteLines = [];
            _this.PF = null;
            _this.SiteType = Enums_1.SiteType.rect;
            return _this;
        }
        SiteMachine_1 = SiteMachine;
        SiteMachine.prototype.pushPeople = function (people) {
        };
        SiteMachine.prototype.loadingPoeple = function (result) {
        };
        SiteMachine.prototype.checkType = function (type, result, dir) {
        };
        SiteMachine.prototype.touch = function (touchEvent) {
        };
        SiteMachine.prototype.touchStart = function (touchEvent) {
        };
        SiteMachine.prototype.touchEnd = function (touchEvent) {
        };
        SiteMachine.prototype.touchCancel = function (touchEvent) {
        };
        SiteMachine.prototype.onLoad = function () {
            InputManage_1.IPSM.InputManage.getInstance(this, true).addInput(this);
        };
        SiteMachine.prototype.start = function () {
            _super.prototype.start.call(this);
            SiteMachine_1.SiteMachines.push(this);
            this.PF = PrefabFactory_1.default.Instance;
        };
        SiteMachine.prototype.onDestroy = function () {
            var _this = this;
            var idx = SiteMachine_1.SiteMachines.findIndex(function (value) { return value === _this; });
            if (idx > -1)
                SiteMachine_1.SiteMachines.splice(idx, 1);
        };
        SiteMachine.prototype.removeLine = function (line) {
            var idx = this.SiteLines.findIndex(function (value) { return value === line; });
            if (idx > -1)
                this.SiteLines.splice(idx, 1);
        };
        SiteMachine.prototype.addLine = function (line) {
            this.SiteLines.push(line);
            line.NowSite = this;
        };
        var SiteMachine_1;
        SiteMachine.SiteMachines = [];
        __decorate([
            mSyncFunc
        ], SiteMachine.prototype, "pushPeople", null);
        __decorate([
            mSyncFunc
        ], SiteMachine.prototype, "loadingPoeple", null);
        __decorate([
            mSyncFunc
        ], SiteMachine.prototype, "checkType", null);
        __decorate([
            property([SitePeople_1.default])
        ], SiteMachine.prototype, "SitePeople", void 0);
        __decorate([
            property({ type: cc.Enum(Enums_1.SiteType) })
        ], SiteMachine.prototype, "SiteType", void 0);
        __decorate([
            mSyncFunc
        ], SiteMachine.prototype, "touch", null);
        __decorate([
            mSyncFunc
        ], SiteMachine.prototype, "touchStart", null);
        __decorate([
            mSyncFunc
        ], SiteMachine.prototype, "touchEnd", null);
        __decorate([
            mSyncFunc
        ], SiteMachine.prototype, "touchCancel", null);
        SiteMachine = SiteMachine_1 = __decorate([
            StateDec_1.MSMDsc.mStateMachine,
            ccclass
        ], SiteMachine);
        return SiteMachine;
    }(StateMachine_1.MSM.StateMachine));
    SiteSM.SiteMachine = SiteMachine;
    var SiteState = /** @class */ (function (_super) {
        __extends(SiteState, _super);
        function SiteState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SiteState.prototype.pushPeople = function (people) {
        };
        SiteState.prototype.loadingPoeple = function (result) {
        };
        SiteState.prototype.checkType = function (type, result, dir) {
        };
        SiteState.prototype.touch = function (touchEvent) {
        };
        SiteState.prototype.touchStart = function (touchEvent) {
        };
        SiteState.prototype.touchEnd = function (touchEvent) {
        };
        SiteState.prototype.touchCancel = function (touchEvent) {
        };
        return SiteState;
    }(StateMachine_1.MSM.State));
    SiteSM.SiteState = SiteState;
})(SiteSM = exports.SiteSM || (exports.SiteSM = {}));

cc._RF.pop();