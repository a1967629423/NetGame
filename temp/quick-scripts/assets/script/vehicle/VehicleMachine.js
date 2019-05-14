(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/vehicle/VehicleMachine.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '75a57PFd7FHjKwZ/ZZLqkY5', 'VehicleMachine', __filename);
// script/vehicle/VehicleMachine.ts

Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine_1 = require("../../frame/StateMachine/StateMachine");
var StateDec_1 = require("../../frame/StateMachine/StateDec");
var SitePeople_1 = require("../site/SitePeople");
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
var mSyncAttachFunc = StateDec_1.MSMDsc.mSyncAttachFunc, mSyncFunc = StateDec_1.MSMDsc.mSyncFunc;
var Vehicle;
(function (Vehicle) {
    var VehicleMachine = /** @class */ (function (_super) {
        __extends(VehicleMachine, _super);
        function VehicleMachine() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.peoples = [];
            _this.line = null;
            _this.nowSite = null;
            _this.nowProgress = 0;
            _this.allLength = 0;
            _this.rate = 100;
            _this.rundir = true;
            return _this;
        }
        VehicleMachine_1 = VehicleMachine;
        VehicleMachine.prototype.getNowSite = function () {
            return this.rundir ? this.line.lastSite : this.line.nextSite;
        };
        VehicleMachine.prototype.unuse = function () {
            var _this = this;
            _super.prototype.unuse.call(this);
            var idx = VehicleMachine_1.allVehicle.findIndex(function (v) { return v === _this; });
            if (idx !== -1) {
                VehicleMachine_1.allVehicle.splice(idx);
            }
        };
        VehicleMachine.prototype.reuse = function () {
            _super.prototype.reuse.call(this);
            VehicleMachine_1.allVehicle.push(this);
        };
        VehicleMachine.prototype.getNextLine = function () {
            if (this.line) {
                return this.rundir ? this.line.NextPath : this.line.LastPath;
            }
        };
        VehicleMachine.prototype.getLastLine = function () {
            if (this.line) {
                return this.rundir ? this.line.NextPath : this.line.LastPath;
            }
        };
        VehicleMachine.Factory = function (line, progress, node) {
            var vehicle = node.getComponent(VehicleMachine_1);
            var position = null;
            if (progress instanceof cc.Vec2) {
                position = progress;
            }
            else {
                var result = line.getLocation(progress);
                position = result.position;
            }
            node.position = position;
            vehicle.line = line;
        };
        var VehicleMachine_1;
        VehicleMachine.allVehicle = [];
        __decorate([
            property(SitePeople_1.default)
        ], VehicleMachine.prototype, "peoples", void 0);
        VehicleMachine = VehicleMachine_1 = __decorate([
            StateDec_1.MSMDsc.mStateMachine,
            ccclass
        ], VehicleMachine);
        return VehicleMachine;
    }(StateMachine_1.MSM.StateMachine));
    Vehicle.VehicleMachine = VehicleMachine;
    var VehicleState = /** @class */ (function (_super) {
        __extends(VehicleState, _super);
        function VehicleState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return VehicleState;
    }(StateMachine_1.MSM.State));
    Vehicle.VehicleState = VehicleState;
})(Vehicle = exports.Vehicle || (exports.Vehicle = {}));

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
        //# sourceMappingURL=VehicleMachine.js.map
        