"use strict";
cc._RF.push(module, '35f91p5F5tDZLox10qS5J1z', 'CameraMoveStates');
// utility/cameraMove/States/CameraMoveStates.ts

Object.defineProperty(exports, "__esModule", { value: true });
var CameraMoveMachine_1 = require("../CameraMoveMachine");
var StateDec_1 = require("../../../frame/StateMachine/StateDec");
var CameraMoveStates;
(function (CameraMoveStates) {
    var DefaultState = /** @class */ (function (_super) {
        __extends(DefaultState, _super);
        function DefaultState() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.lastScrollY = 1;
            return _this;
        }
        DefaultState.prototype.Start = function () {
            this.context.listen('pause');
            this.lastScrollY = 1;
        };
        DefaultState.prototype.touchEnd = function (t) {
            this.context.touchExit(t);
        };
        DefaultState.prototype.touchCancel = function (t) {
            this.context.touchExit(t);
        };
        DefaultState.prototype.touch = function (t) {
            var nid = t.getID();
            if (!this.context.touchs.find(function (value) { return value.id === nid; })) {
                this.context.touchs.push({ id: nid, point: t.getLocation() });
            }
            if (this.context.touchs.length > 1) {
                this.context.emit('scale');
            }
            else {
                var add = t.getDelta().neg().mul(1 / this.context.nCamera.zoomRatio);
                this.context.node.position = this.context.node.position.add(add);
            }
        };
        DefaultState.prototype.mouseWheel = function (mouseEvent) {
            this.lastScrollY += mouseEvent.getScrollY() / 1200;
            this.lastScrollY = this.context.changeCameraZoom(this.lastScrollY);
        };
        DefaultState.prototype.Quit = function () {
            this.lastScrollY = 1;
            this.context.cancelListen('pause');
        };
        DefaultState = __decorate([
            StateDec_1.MSMDsc.mDefaultState,
            StateDec_1.MSMDsc.mLinkTo('Pause', 'pause'),
            StateDec_1.MSMDsc.mLinkTo('Scale', 'scale'),
            StateDec_1.MSMDsc.mState('Default', CameraMoveMachine_1.CameraMoveMachine.CameraMoveMachine)
        ], DefaultState);
        return DefaultState;
    }(CameraMoveMachine_1.CameraMoveMachine.CameraMoveState));
    CameraMoveStates.DefaultState = DefaultState;
    var PauseState = /** @class */ (function (_super) {
        __extends(PauseState, _super);
        function PauseState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PauseState.prototype.Start = function () {
            this.context.listen('resume');
        };
        PauseState.prototype.Quit = function () {
            this.context.cancelListen('resume');
        };
        PauseState = __decorate([
            StateDec_1.MSMDsc.mLinkTo('Default', 'resume'),
            StateDec_1.MSMDsc.mState('Pause', CameraMoveMachine_1.CameraMoveMachine.CameraMoveMachine)
        ], PauseState);
        return PauseState;
    }(CameraMoveMachine_1.CameraMoveMachine.CameraMoveState));
    CameraMoveStates.PauseState = PauseState;
    var ScaleState = /** @class */ (function (_super) {
        __extends(ScaleState, _super);
        function ScaleState() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.nscale = null;
            return _this;
        }
        ScaleState.prototype.touchExit = function (t) {
            if (this.context.touchs.length <= 1) {
                this.context.emit('exit');
            }
        };
        ScaleState.prototype.touchCancel = function (t) {
            this.context.touchExit(t);
        };
        ScaleState.prototype.touchEnd = function (t) {
            this.context.touchExit(t);
        };
        ScaleState.prototype.touch = function (t) {
            var nid = t.getID();
            var savetouch = this.context.touchs.find(function (value) { return value.id === nid; });
            if (!savetouch) {
                this.context.touchs.push({ id: nid, point: t.getLocation() });
            }
            else {
                savetouch.point = t.getLocation();
            }
            if (this.context.touchs.length > 1) {
                var sub = this.context.touchs[0].point.sub(this.context.touchs[1].point).mag();
                if (!this.nscale) {
                    this.nscale = sub;
                }
                var add = sub - this.nscale;
                var nextRatio = this.context.nCamera.zoomRatio + (add / 1000);
                this.context.changeCameraZoom(nextRatio);
                this.nscale = sub;
            }
        };
        ScaleState.prototype.Quit = function () {
            this.nscale = null;
        };
        ScaleState = __decorate([
            StateDec_1.MSMDsc.mLinkTo('Default', 'exit'),
            StateDec_1.MSMDsc.mState('Scale', CameraMoveMachine_1.CameraMoveMachine.CameraMoveMachine)
        ], ScaleState);
        return ScaleState;
    }(CameraMoveMachine_1.CameraMoveMachine.CameraMoveState));
    CameraMoveStates.ScaleState = ScaleState;
})(CameraMoveStates = exports.CameraMoveStates || (exports.CameraMoveStates = {}));

cc._RF.pop();