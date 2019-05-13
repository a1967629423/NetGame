(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Path/PathSM.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ff1f2U2VrhE0J9pWyby3PZm', 'PathSM', __filename);
// script/Path/PathSM.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SiteMachine_1 = require("../site/SiteMachine");
var ObjectPool_1 = require("../../frame/ObjectPool/ObjectPool");
var Enums_1 = require("../Enums");
var VehicleMachine_1 = require("../vehicle/VehicleMachine");
var Path;
(function (Path) {
    /**
 * 载具路线类
 * 储存:所有线路，上一个以及下一个线路，处于线路上的载具，当前状态遮罩
 * 功能:获取此线路上的中间插值点
 */
    var VehiclePath = /** @class */ (function () {
        function VehiclePath() {
            this.lastSite = null;
            this.nextSite = null;
            /**
             * 1111
             * cdhb
             * c:changed
             * d:deleted
             * h:hided
             * b:blocked
             */
            this.mask = 0;
            /**线的类型 */
            this.PathType = Enums_1.SiteLineType.red;
            /**线的总长度 */
            this.allLength = 0;
            /**中转点 */
            this.changePoint = [];
            /**载具集合 */
            this.vehicles = [];
            this.__np = cc.v2();
        }
        VehiclePath.prototype.unuse = function (value) {
            var _this = this;
            this.lastSite = null;
            this.nextSite = null;
            this.mask = 0;
            var idx = -1;
            this.allLength = 0;
            this.changePoint = [];
            if (VehiclePath.allPath.some(function (v, index) {
                if (v === _this) {
                    idx = index;
                    return true;
                }
            })) {
                VehiclePath.allPath.splice(idx);
            }
        };
        VehiclePath.prototype.reuse = function (lastSite, nextSite, Type) {
            if (lastSite && nextSite && Type) {
                if (lastSite instanceof SiteMachine_1.SiteSM.SiteMachine) {
                    this.lastSite = lastSite;
                    this.nextSite = nextSite;
                    this.PathType = Type;
                    VehiclePath.allPath.push(this);
                    this.caculatePath(lastSite.node.position, nextSite.node.position);
                }
                else if (lastSite['x'] && nextSite['x']) {
                    this.PathType = Type;
                    this.caculatePath(lastSite, nextSite);
                }
            }
        };
        VehiclePath.prototype.recycle = function (value) {
            ObjectPool_1.default.GlobalPush(this);
        };
        Object.defineProperty(VehiclePath.prototype, "isEnd", {
            get: function () {
                var _this = this;
                return !this.nextSite.SiteLines.some(function (v) { return v.PathType === _this.PathType && v !== _this && v.lastSite === _this.nextSite; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VehiclePath.prototype, "isBegin", {
            get: function () {
                var _this = this;
                return !this.lastSite.SiteLines.some(function (v) { return v.PathType === _this.PathType && v !== _this && v.nextSite === _this.lastSite; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VehiclePath.prototype, "NextPath", {
            get: function () {
                var _this = this;
                return this.nextSite.SiteLines.find(function (v) { return v.PathType === _this.PathType && v !== _this && !(v.mask & 13); });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VehiclePath.prototype, "LastPath", {
            get: function () {
                var _this = this;
                return this.lastSite.SiteLines.find(function (v) { return v.PathType === _this.PathType && v !== _this && !(v.mask & 13); });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VehiclePath.prototype, "ClearFlag", {
            get: function () {
                return !!(this.mask & 8);
            },
            enumerable: true,
            configurable: true
        });
        VehiclePath.prototype.caculatePath = function (n, e) {
            var Line = this;
            var _a = DMath.pathCalcaulate(n.x, n.y, e.x, e.y), x = _a.x, y = _a.y, allLength = _a.allLength, firstRadian = _a.firstRadian, lastRadian = _a.lastRadian, rectDir = _a.rectDir, rectH = _a.rectH, rectW = _a.rectW;
            Line.allLength = allLength;
            Line.changePoint = [];
            Line.changePoint.push({ length: 0, point: n, Radian: firstRadian });
            Line.changePoint.push({ length: rectDir ? rectW : rectH, point: cc.v2(x, y), Radian: firstRadian });
            Line.changePoint.push({ length: allLength, point: e, Radian: lastRadian });
        };
        /**
         * 根据运行方向以及进度获取坐标，此坐标为站点集对象下的坐标
         * @param progress 当前的进度(前进的距离)
         * @param dir 运行的方向
         */
        VehiclePath.prototype.getLocation = function (progress, dir) {
            if (dir === void 0) { dir = true; }
            //需要改动
            var nLine = this;
            var narr = nLine.changePoint; //dir?this.changPoint:this.rchangePoint
            var nprogress = dir ? progress : nLine.allLength - progress;
            var idx = narr.findIndex(function (value) { return value.length >= nprogress; });
            var cp = narr[idx];
            var lastp = this.lastSite.node.position;
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
        };
        /**
         * 当载具换线时需要注册
         * @param v 载具
         */
        VehiclePath.prototype.addVehicle = function (v) {
            if (v instanceof VehicleMachine_1.Vehicle.VehicleMachine) {
                this.vehicles.push(v);
            }
        };
        /**
         * 当载具离开时需要注销
         * @param v 载具
         */
        VehiclePath.prototype.removeVehicle = function (v) {
            if (v instanceof VehicleMachine_1.Vehicle.VehicleMachine) {
                var idx = this.vehicles.findIndex(function (value) { return value === v; });
                if (idx > -1)
                    this.vehicles.splice(idx);
            }
        };
        /**
         * 当路线从对象池中取出之后会注册到此数组中
         */
        VehiclePath.allPath = [];
        return VehiclePath;
    }());
    Path.VehiclePath = VehiclePath;
})(Path = exports.Path || (exports.Path = {}));

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
        //# sourceMappingURL=PathSM.js.map
        