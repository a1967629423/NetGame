"use strict";
cc._RF.push(module, 'c6528Li7u9MEpZwLbPMYJ1G', 'CameraMoveMachine');
// utility/cameraMove/CameraMoveMachine.ts

Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine_1 = require("../../frame/StateMachine/StateMachine");
var StateDec_1 = require("../../frame/StateMachine/StateDec");
var InputManage_1 = require("../../frame/InputManage");
var Enums_1 = require("../../script/Enums");
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var mStateMachine = StateDec_1.MSMDsc.mStateMachine, mSyncFunc = StateDec_1.MSMDsc.mSyncFunc;
var StateMachine = StateMachine_1.MSM.StateMachine, State = StateMachine_1.MSM.State;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CameraMoveMachine;
(function (CameraMoveMachine_1) {
    var CameraMoveMachine = /** @class */ (function (_super) {
        __extends(CameraMoveMachine, _super);
        function CameraMoveMachine() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.touchs = [];
            _this.nCamera = null;
            return _this;
        }
        CameraMoveMachine.prototype.mouseDown = function (mouseEvent) {
        };
        CameraMoveMachine.prototype.mouseUp = function (mouseEvent) {
        };
        CameraMoveMachine.prototype.mouseEnter = function (mouseEvent) {
        };
        CameraMoveMachine.prototype.mouseLeave = function (mouseEvent) {
        };
        CameraMoveMachine.prototype.mouseWheel = function (mouseEvent) {
        };
        CameraMoveMachine.prototype.mouseMove = function (mouseEvent) {
        };
        CameraMoveMachine.prototype.touch = function (touchEvent) {
        };
        CameraMoveMachine.prototype.touchStart = function (touchEvent) {
        };
        CameraMoveMachine.prototype.touchEnd = function (touchEvent) {
        };
        CameraMoveMachine.prototype.touchCancel = function (touchEvent) {
        };
        CameraMoveMachine.prototype.changeCameraZoom = function (nextRatio) {
            nextRatio = Math.max(Math.min(3, nextRatio), 0.3);
            this.nCamera.zoomRatio = nextRatio;
            return nextRatio;
        };
        CameraMoveMachine.prototype.start = function () {
            _super.prototype.start.call(this);
            InputManage_1.IPSM.InputManage.getInstance().addInput(this);
            InputManage_1.IPSM.InputManage.getInstance().addInput(this, Enums_1.InputType.mouse);
            this.nCamera = this.getComponent(cc.Camera);
        };
        CameraMoveMachine.prototype.touchExit = function (t) {
            this.touchs.splice(this.touchs.findIndex(function (value) { return value.id === t.getID(); }), 1);
        };
        __decorate([
            mSyncFunc
        ], CameraMoveMachine.prototype, "mouseWheel", null);
        __decorate([
            mSyncFunc
        ], CameraMoveMachine.prototype, "touch", null);
        __decorate([
            mSyncFunc
        ], CameraMoveMachine.prototype, "touchStart", null);
        __decorate([
            mSyncFunc
        ], CameraMoveMachine.prototype, "touchEnd", null);
        __decorate([
            mSyncFunc
        ], CameraMoveMachine.prototype, "touchCancel", null);
        __decorate([
            mSyncFunc
        ], CameraMoveMachine.prototype, "touchExit", null);
        CameraMoveMachine = __decorate([
            mStateMachine,
            ccclass
        ], CameraMoveMachine);
        return CameraMoveMachine;
    }(StateMachine));
    CameraMoveMachine_1.CameraMoveMachine = CameraMoveMachine;
    var CameraMoveState = /** @class */ (function (_super) {
        __extends(CameraMoveState, _super);
        function CameraMoveState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CameraMoveState.prototype.mouseDown = function (mouseEvent) {
        };
        CameraMoveState.prototype.mouseUp = function (mouseEvent) {
        };
        CameraMoveState.prototype.mouseEnter = function (mouseEvent) {
        };
        CameraMoveState.prototype.mouseLeave = function (mouseEvent) {
        };
        CameraMoveState.prototype.mouseWheel = function (mouseEvent) {
        };
        CameraMoveState.prototype.mouseMove = function (mouseEvent) {
        };
        CameraMoveState.prototype.touch = function (touchEvent) {
        };
        CameraMoveState.prototype.touchStart = function (touchEvent) {
        };
        CameraMoveState.prototype.touchEnd = function (touchEvent) {
        };
        CameraMoveState.prototype.touchCancel = function (touchEvent) {
        };
        CameraMoveState.prototype.touchExit = function (t) {
        };
        return CameraMoveState;
    }(State));
    CameraMoveMachine_1.CameraMoveState = CameraMoveState;
})(CameraMoveMachine = exports.CameraMoveMachine || (exports.CameraMoveMachine = {}));

cc._RF.pop();