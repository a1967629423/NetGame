"use strict";
cc._RF.push(module, '2f45e1W/H9JvaGny4q1fqbP', 'SiteLine');
// script/site/SiteLine.ts

Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine_1 = require("../../frame/StateMachine/StateMachine");
var StateDec_1 = require("../../frame/StateMachine/StateDec");
var Enums_1 = require("../Enums");
var VehicleMachine_1 = require("../vehicle/VehicleMachine");
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var mSyncFunc = StateDec_1.MSMDsc.mSyncFunc, mSyncAttachFunc = StateDec_1.MSMDsc.mSyncAttachFunc;
var SLDSM;
(function (SLDSM) {
    var SiteLine = /** @class */ (function (_super) {
        __extends(SiteLine, _super);
        function SiteLine() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.line = null;
            _this.showState = Enums_1.SiteLineShowState.show;
            _this._ClearFlag = false;
            _this._ChangeFlag = false;
            _this.mask = 0;
            _this.vehicles = [];
            _this.LastLine = null;
            _this.NowSite = null;
            _this._NextLine = null;
            _this.InitFlag = false;
            _this.allLength = 0;
            _this.changPoint = [];
            _this._LineType = Enums_1.SiteLineType.red;
            _this.__np = null;
            return _this;
            // update (dt) {}
        }
        SiteLine_1 = SiteLine;
        SiteLine.prototype.unuse = function () {
            _super.prototype.unuse.call(this);
            this.NowSite = null;
            this.LastLine = null;
            this.NextLine = null;
            this.removeFromSitelines();
            this.ClearFlag = false;
            this.ChangeFlag = false;
        };
        SiteLine.prototype.reuse = function (LineType) {
            _super.prototype.reuse.call(this);
            //this.LineType = LineType;
            //this.addSiteLines();
            //this.addSiteLines()
            //this.addSiteLines();
        };
        SiteLine.prototype.linkTo = function (nextLine) {
            this.NextLine = nextLine;
            nextLine.LastLine = this;
        };
        SiteLine.prototype.recycle = function (newLine) {
            this.emit('cleared');
        };
        Object.defineProperty(SiteLine.prototype, "isShowNode", {
            get: function () {
                return !!this.node.parent;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 在线段池中查找指定类型的头端
         * @param lineType 需要查找的类型
         */
        SiteLine.getBeginLine = function (lineType) {
            var siteline = this.SiteLines.find(function (value) { return value.lineType === lineType; });
            var nowLine = null;
            if (siteline && siteline.lines && siteline.lines.length > 0) {
                nowLine = siteline.lines[0];
                while (!nowLine.isBegin) {
                    nowLine = nowLine.LastLine;
                }
            }
            return nowLine;
        };
        SiteLine.prototype.onLoad = function () {
            this.Init();
        };
        SiteLine.prototype.addSiteLines = function () {
            var _this = this;
            var siteline = SiteLine_1.SiteLines.find(function (value) { return value.lineType === _this.LineType; });
            if (siteline) {
                siteline.lines.push(this);
            }
            else {
                SiteLine_1.SiteLines.push({ lineType: this.LineType, lines: [this] });
            }
        };
        SiteLine.prototype.removeFromSitelines = function () {
            var _this = this;
            var siteline = SiteLine_1.SiteLines.find(function (value) { return value.lineType === _this.LineType; });
            if (siteline) {
                var idx = siteline.lines.findIndex(function (value) { return value === _this; });
                if (idx > -1)
                    siteline.lines.splice(idx, 1);
            }
        };
        /**
         * 在这条线上注册载具
         * @param v
         */
        SiteLine.prototype.registerVehicle = function (v) {
            var _this = this;
            var lvs = SiteLine_1.LineVehicles.find(function (value) { return value.lineType === _this.LineType; });
            if (lvs) {
                var vs = lvs.Vehicles;
                if (!vs.find(function (value) { return value === v; })) {
                    vs.push(v);
                }
            }
            else {
                SiteLine_1.LineVehicles.push({ lineType: this.LineType, Vehicles: [v] });
            }
        };
        /**
         * 在这条线上注销载具
         * @param v
         */
        SiteLine.prototype.unregisterVehicle = function (v) {
            var _this = this;
            var lvs = SiteLine_1.LineVehicles.find(function (value) { return value.lineType === _this.LineType; });
            if (lvs) {
                var vs = lvs.Vehicles;
                var idx = vs.findIndex(function (value) { return value === v; });
                if (vs && idx > -1)
                    vs.splice(idx);
            }
        };
        SiteLine.prototype.addVehicle = function (v) {
            if (v instanceof VehicleMachine_1.Vehicle.VehicleMachine) {
                this.vehicles.push(v);
            }
        };
        SiteLine.prototype.removeVehicle = function (v) {
            if (v instanceof VehicleMachine_1.Vehicle.VehicleMachine) {
                var idx = this.vehicles.findIndex(function (value) { return value === v; });
                if (idx > -1)
                    this.vehicles.splice(idx);
                if (this.vehicles.length === 0) {
                    this.node.emit('vehicleClear');
                }
            }
        };
        SiteLine.prototype.start = function () {
            //this.caculatePath();
            _super.prototype.start.call(this);
            this.node.on('isRun', this.addVehicle, this);
            this.node.on('runEnd', this.removeVehicle, this);
            this.InitFlag = true;
        };
        Object.defineProperty(SiteLine.prototype, "ClearFlag", {
            get: function () {
                return !!(this.mask & 2);
            },
            set: function (val) {
                if (val) {
                    this.mask = this.mask | 3;
                }
                else {
                    this.mask = this.mask & (~3);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SiteLine.prototype, "ChangeFlag", {
            get: function () {
                return !!(this.mask & 4);
            },
            set: function (val) {
                if (val) {
                    this.mask = this.mask | 5;
                }
                else {
                    this.mask = this.mask & (~5);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SiteLine.prototype, "HidenFlag", {
            get: function () {
                return !!(this.mask & 1);
            },
            set: function (val) {
                this.mask = val ? this.mask | 1 : this.mask & (~1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SiteLine.prototype, "NextLine", {
            get: function () {
                return this._NextLine;
            },
            set: function (val) {
                this._NextLine = val;
            },
            enumerable: true,
            configurable: true
        });
        SiteLine.prototype.getAllLength = function (dir) {
            return dir ? this.allLength : this.LastLine ? this.LastLine.allLength : 0;
        };
        SiteLine.prototype.getChangPoint = function (dir) {
            return dir ? this.changPoint : this.LastLine ? this.LastLine.changPoint : [];
        };
        Object.defineProperty(SiteLine.prototype, "LineType", {
            get: function () {
                return this._LineType;
            },
            set: function (val) {
                this._LineType = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SiteLine.prototype, "isEnd", {
            get: function () {
                return !this.NextLine;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SiteLine.prototype, "isBegin", {
            get: function () {
                return !this.LastLine;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SiteLine.prototype, "nowTypeVehicle", {
            get: function () {
                var _this = this;
                var lvs = SiteLine_1.LineVehicles.find(function (value) { return value.lineType === _this.LineType; });
                return lvs ? lvs.Vehicles : [];
            },
            enumerable: true,
            configurable: true
        });
        SiteLine.prototype.caculatePath = function () {
            var n = this.NowSite;
            var e = this.NextLine.NowSite;
            var Line = this;
            var _a = DMath.pathCalcaulate(n.node.x, n.node.y, e.node.x, e.node.y), x = _a.x, y = _a.y, allLength = _a.allLength, firstRadian = _a.firstRadian, lastRadian = _a.lastRadian, rectDir = _a.rectDir, rectH = _a.rectH, rectW = _a.rectW;
            Line.allLength = allLength;
            Line.changPoint = [];
            Line.changPoint.push({ length: rectDir ? rectW : rectH, point: cc.v2(x, y), Radian: firstRadian });
            Line.changPoint.push({ length: allLength, point: e.node.position, Radian: lastRadian });
            this.emit('caculated');
            //nextLine.changPoint = Line.changPoint;
            //nextLine.allLength = allLength;
        };
        SiteLine.prototype.onDisable = function () {
            _super.prototype.onDisable.call(this);
            this.node.off('isRun', this.addVehicle, this);
            this.node.off('runEnd', this.removeVehicle, this);
        };
        SiteLine.prototype.getLocation = function (progress, dir) {
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
            if (!this.__np)
                this.__np = cc.v2();
            lastp.lerp(cp.point, nprogress / nLenght, this.__np); //dir?lastp.lerp(cp.point,cl):cp.point.lerp(lastp,cl);
            return { position: this.__np, radian: cp.Radian + (dir ? 0 : Math.PI) };
            // return dir?this.NowSite.node.position.lerp(this.NextLine.NowSite.node.position,progress):this.NextLine.NowSite.node.position.lerp(this.NowSite.node.position,progress);
        };
        var SiteLine_1;
        SiteLine.LineVehicles = [];
        /**
         * 用于保存所有的线
         */
        SiteLine.SiteLines = [];
        SiteLine.SiteInfo = [];
        SiteLine = SiteLine_1 = __decorate([
            StateDec_1.MSMDsc.mStateMachine,
            ccclass
        ], SiteLine);
        return SiteLine;
    }(StateMachine_1.MSM.StateMachine));
    SLDSM.SiteLine = SiteLine;
    var SiteLineDisplayState = /** @class */ (function (_super) {
        __extends(SiteLineDisplayState, _super);
        function SiteLineDisplayState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SiteLineDisplayState.prototype.unuse = function () {
        };
        SiteLineDisplayState.prototype.reuse = function () {
        };
        SiteLineDisplayState.prototype.recycle = function () {
        };
        return SiteLineDisplayState;
    }(StateMachine_1.MSM.State));
    SLDSM.SiteLineDisplayState = SiteLineDisplayState;
})(SLDSM = exports.SLDSM || (exports.SLDSM = {}));
/*
    _hitTest (point, listener) {
        let w = this._contentSize.width,
            h = this._contentSize.height,
            cameraPt = _vec2a,
            testPt = _vec2b;

        let camera = cc.Camera.findCamera(this);
        if (camera) {
            camera.getCameraToWorldPoint(point, cameraPt);
        }
        else {
            cameraPt.set(point);
        }

        this._updateWorldMatrix();
        math.mat4.invert(_mat4_temp, this._worldMatrix);
        math.vec2.transformMat4(testPt, cameraPt, _mat4_temp);
        testPt.x += this._anchorPoint.x * w;
        testPt.y += this._anchorPoint.y * h;

        if (testPt.x >= 0 && testPt.y >= 0 && testPt.x <= w && testPt.y <= h) {
            if (listener && listener.mask) {
                var mask = listener.mask;
                var parent = this;
                for (var i = 0; parent && i < mask.index; ++i, parent = parent.parent) {
                }
                // find mask parent, should hit test it
                if (parent === mask.node) {
                    var comp = parent.getComponent(cc.Mask);
                    return (comp && comp.enabledInHierarchy) ? comp._hitTest(cameraPt) : true;
                }
                // mask parent no longer exists
                else {
                    listener.mask = null;
                    return true;
                }
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    }
*/

cc._RF.pop();