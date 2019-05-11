"use strict";
cc._RF.push(module, '8a14az6kD1CKra+jZmCLk8Y', 'InputManage');
// frame/InputManage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var setToFullScene_1 = require("../utility/setToFullScene");
var StateDec_1 = require("./StateMachine/StateDec");
var StateMachine_1 = require("./StateMachine/StateMachine");
var Enums_1 = require("../script/Enums");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var mStateMachine = StateDec_1.MSMDsc.mStateMachine, mSyncFunc = StateDec_1.MSMDsc.mSyncFunc;
var StateMachine = StateMachine_1.MSM.StateMachine, State = StateMachine_1.MSM.State;
var IPSM;
(function (IPSM) {
    var InputManage = /** @class */ (function (_super) {
        __extends(InputManage, _super);
        function InputManage() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.targets = [];
            /**
             * 0=local
             * 1=global
             */
            _this.exState = 0;
            _this._tar = [];
            _this.customHitTest = [];
            _this.InputEventList = [];
            _this.enableListens = { touch: false, mouse: false, keyboard: false };
            return _this;
        }
        InputManage_1 = InputManage;
        InputManage.prototype.touchStart = function (touchEvent) {
        };
        InputManage.prototype.touchEnd = function (touchEvent) {
        };
        InputManage.prototype.touchCancel = function (touchEvent) {
        };
        InputManage.prototype.touch = function (touchEvent) {
        };
        InputManage.prototype.InputEvent = function (event, eventName) {
        };
        InputManage.prototype._InputEventAdd = function (eventName, eventType) {
            var _this = this;
            var fun = function (event) {
                _this.InputEvent(event, eventName);
            };
            this.InputEventList.push({ callback: fun, eventType: eventType });
            return fun;
        };
        InputManage.prototype.instanceofIInput = function (a) {
            if (a['touch'])
                return true;
            return false;
        };
        InputManage.getInstance = function (tg, collider) {
            var _this = this;
            if (collider === void 0) { collider = false; }
            var ins = null;
            if (tg) {
                ins = tg.getComponent(InputManage_1);
                if (!ins) {
                    ins = tg.addComponent(InputManage_1);
                    ins.exState = 0;
                    if (collider && !this.enableCollider) {
                        cc.director.getCollisionManager().enabled = true;
                        this.enableCollider = true;
                    }
                }
            }
            else {
                var store = this.g_InputManage.find(function (value) { return value.Camera == cc.Camera.main; });
                if (!store) {
                    if (cc.Camera.main) {
                        var newNode = new cc.Node("inputManage");
                        ins = newNode.addComponent(InputManage_1);
                        newNode.addComponent(setToFullScene_1.default);
                        newNode.setParent(cc.Camera.main.node);
                        ins.exState = 1;
                        this.g_InputManage.push({ Camera: cc.Camera.main, Manage: ins });
                    }
                    else {
                        cc.Camera.cameras.forEach(function (value) {
                            var newNode = new cc.Node("inputManage");
                            ins = newNode.addComponent(InputManage_1);
                            newNode.addComponent(setToFullScene_1.default);
                            newNode.setParent(value.node);
                            ins.exState = 1;
                            _this.g_InputManage.push({ Camera: value, Manage: ins });
                        });
                    }
                }
                else {
                    ins = store.Manage;
                }
            }
            return ins;
        };
        InputManage.prototype.addInput = function (inp, type) {
            if (type) {
                switch (type) {
                    case Enums_1.InputType.mouse:
                        this._addInput_mouse(inp);
                        break;
                    case Enums_1.InputType.keyboard:
                        this._addInput_keyboard(inp);
                        break;
                }
            }
            if (!this._tar.find(function (value) { return value === inp; })) {
                this._tar.push(inp);
            }
        };
        InputManage.prototype._addInput_mouse = function (inp) {
            if (!this.enableListens.mouse) {
                var downType = cc.Node.EventType.MOUSE_DOWN;
                var upType = cc.Node.EventType.MOUSE_UP;
                var enterType = cc.Node.EventType.MOUSE_ENTER;
                var leaveType = cc.Node.EventType.MOUSE_LEAVE;
                var wheelType = cc.Node.EventType.MOUSE_WHEEL;
                var moveType = cc.Node.EventType.MOUSE_MOVE;
                this.node.on(downType, this._InputEventAdd('mouseDown', downType), this);
                this.node.on(upType, this._InputEventAdd('mouseUp', upType), this);
                this.node.on(enterType, this._InputEventAdd('mouseEnter', enterType), this);
                this.node.on(leaveType, this._InputEventAdd('mouseLeave', leaveType), this);
                this.node.on(wheelType, this._InputEventAdd('mouseWheel', wheelType), this);
                this.node.on(moveType, this._InputEventAdd('mouseMove', moveType), this);
                this.enableListens.mouse = true;
            }
        };
        InputManage.prototype._addInput_keyboard = function (inp) {
            if (!this.enableListens.keyboard) {
                this.enableListens.keyboard = true;
            }
        };
        // addInput(inp:IInput_mouse)
        // {
        // }
        InputManage.prototype.removeInput = function (inp) {
            this._tar.splice(this._tar.findIndex(function (value) { return value === inp; }), 1);
        };
        InputManage.prototype.start = function () {
            var _this = this;
            _super.prototype.start.call(this);
            this.targets.forEach(function (value) {
                var inter = value;
                if (_this.instanceofIInput(value)) {
                    _this._tar.push(inter);
                }
                else {
                    console.warn("对象未实现接口IInput");
                    console.warn(value);
                }
            });
            if (this.exState === 0) {
                var test = this.node['_hitTest'];
                //hookHitTest
                this.node['_hitTest'] = function () {
                    var result = false;
                    for (var i = _this.customHitTest.length - 1; i >= 0; i--) {
                        var target = _this.customHitTest[i].target;
                        if (!target)
                            target = _this.node;
                        if (_this.customHitTest[i].callback.apply(target, arguments))
                            result = true;
                    }
                    if (test.apply(_this.node, arguments))
                        result = true;
                    return result;
                };
            }
            this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touch, this);
            this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
            this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
            this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        };
        InputManage.prototype.onHitTest = function (hitTest, target) {
            if (target === void 0) { target = null; }
            if (!this.customHitTest.find(function (value) { return value.callback === hitTest && value.target === target; })) {
                this.customHitTest.unshift({ callback: hitTest, target: target });
            }
        };
        InputManage.prototype.offHitTest = function (hitTest, target) {
            if (target === void 0) { target = null; }
            var idx = this.customHitTest.findIndex(function (value) { return value.callback === hitTest && value.target === target; });
            if (idx > -1)
                this.customHitTest.splice(idx, 1);
        };
        InputManage.prototype.onDisable = function () {
            var _this = this;
            _super.prototype.onDisable.call(this);
            this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touch, this);
            this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
            this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
            this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
            if (this.InputEventList.length > 0) {
                this.InputEventList.forEach(function (value) {
                    _this.node.off(value.eventType, value.callback, _this);
                });
                this.InputEventList = [];
            }
        };
        var InputManage_1;
        InputManage.g_InputManage = [];
        InputManage.enableCollider = false;
        __decorate([
            mSyncFunc
        ], InputManage.prototype, "touchStart", null);
        __decorate([
            mSyncFunc
        ], InputManage.prototype, "touchEnd", null);
        __decorate([
            mSyncFunc
        ], InputManage.prototype, "touchCancel", null);
        __decorate([
            mSyncFunc
        ], InputManage.prototype, "touch", null);
        __decorate([
            mSyncFunc
        ], InputManage.prototype, "InputEvent", null);
        __decorate([
            property([cc.Component])
        ], InputManage.prototype, "targets", void 0);
        InputManage = InputManage_1 = __decorate([
            mStateMachine,
            ccclass
        ], InputManage);
        return InputManage;
    }(StateMachine));
    IPSM.InputManage = InputManage;
    var InputState = /** @class */ (function (_super) {
        __extends(InputState, _super);
        function InputState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InputState.prototype.touchStart = function (touchEvent) {
        };
        InputState.prototype.touchEnd = function (touchEvent) {
        };
        InputState.prototype.touchCancel = function (touchEvent) {
        };
        InputState.prototype.touch = function (touchEvent) {
        };
        Object.defineProperty(InputState.prototype, "context", {
            get: function () {
                return this.ctx;
            },
            set: function (value) {
                this.ctx = value;
            },
            enumerable: true,
            configurable: true
        });
        InputState.prototype.InputEvent = function (event, eventName) {
        };
        return InputState;
    }(State));
    IPSM.InputState = InputState;
    var CameraVec = cc.v2();
    function ConvertInputPointToWorld(point, node) {
        var Camera = cc.Camera.findCamera(node);
        if (Camera) {
            Camera.getCameraToWorldPoint(point, CameraVec);
        }
        else {
            CameraVec.set(point);
        }
        return CameraVec;
    }
    IPSM.ConvertInputPointToWorld = ConvertInputPointToWorld;
    function ConvertInputPointToWorldDec(target, methodName, paramIndex) {
        var old = target[methodName];
        target[methodName] = function () {
            var param = arguments[paramIndex];
            if (param && param['x'] && param['y']) {
                arguments[paramIndex] = ConvertInputPointToWorld(param, this.node);
            }
            old.apply(this, arguments);
        };
    }
    IPSM.ConvertInputPointToWorldDec = ConvertInputPointToWorldDec;
})(IPSM = exports.IPSM || (exports.IPSM = {}));

cc._RF.pop();