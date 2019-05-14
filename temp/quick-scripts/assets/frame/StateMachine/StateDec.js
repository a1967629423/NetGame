(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/frame/StateMachine/StateDec.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd55085pPGRG0p/a0/Dz0dGH', 'StateDec', __filename);
// frame/StateMachine/StateDec.ts

Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine_1 = require("./StateMachine");
var MSMDsc;
(function (MSMDsc) {
    var SMDB = [];
    /**
     *
     * 状态机装饰器
     */
    function mStateMachine(target) {
        if (!SMDB.find(function (value) { return value.sm == target; })) {
            var p = { sm: target, sts: [], stateRelation: [], eventsName: [] };
            SMDB.push(p);
            target.prototype.strelation = p.stateRelation;
            target.prototype.LSMDB = p;
        }
    }
    MSMDsc.mStateMachine = mStateMachine;
    /**
     * 状态装饰器
     * @param name 状态名
     * @param su 所依附的状态机
     */
    function mState(name, su) {
        return function (target) {
            var gsu = SMDB.find(function (value) { return value.sm == su; });
            if (gsu)
                gsu.sts.push({ st: target, name: name });
            else {
                var p = { sm: su, sts: [{ st: target, name: name }], stateRelation: [], eventsName: [] };
                su.prototype.strelation = p.stateRelation;
                su.prototype.LSMDB = p;
                SMDB.push(p);
            }
            target.prototype.stateName = name;
            target.prototype['_su_'] = su;
        };
    }
    MSMDsc.mState = mState;
    /**
     * 默认状态装饰器
     * 默认状态会在状态机初始化时自动切换，默认状态只允许一个，切换默认状态的事件名为start
     */
    function mDefaultState(target) {
        function initDefault() {
            var su = target.prototype['_su_'];
            if (su) {
                if (su.prototype.strelation.find(function (value) { return value.eventname === 'start'; })) {
                    console.log("DefaultState only one");
                    return;
                }
                su.prototype.strelation.push({ eventname: 'start', source: null, target: target, type: 2 });
            }
        }
        if (!target.prototype['_su_']) {
            setTimeout(function () { initDefault(); });
        }
        else {
            initDefault();
        }
    }
    MSMDsc.mDefaultState = mDefaultState;
    /**
     * 使用或创建一个过渡事件，当事件被触发时会将此状态切换为当前状态
     * @param targenamet 目标状态名
     * @param eventname 触发事件名
     */
    function mLinkTo(targenamet, eventname) {
        function initLink(tar) {
            var gsu;
            var su = tar.prototype['_su_'];
            if (!su) {
                console.error("su is undefind");
                return;
            }
            if (gsu = SMDB.find(function (value) { return value.sm == su; })) {
                var linkc = gsu.sts.find(function (value) { return value.name == targenamet; });
                if (linkc) {
                    gsu.stateRelation.push({ source: tar, target: linkc.st, eventname: eventname, type: 1 });
                }
                else {
                    gsu.stateRelation.push({ source: tar, target: targenamet, eventname: eventname, type: 1 });
                }
                if (!gsu.eventsName.find(function (value) { return value === eventname; }))
                    gsu.eventsName.push(eventname);
            }
        }
        return function (target) {
            if (!target.prototype['_su_']) {
                console.warn('mState应该声明在前面:' + target.name);
                setTimeout(function () { initLink(target); });
            }
            else {
                initLink(target);
            }
        };
    }
    MSMDsc.mLinkTo = mLinkTo;
    function initAttach(tar, eventname) {
        var gsu;
        var su = tar.prototype['_su_'];
        if (!su) {
            console.error("su is undefind");
            return;
        }
        if (gsu = SMDB.find(function (value) { return value.sm === su; })) {
            gsu.stateRelation.push({ source: null, target: tar, eventname: eventname, type: 4 });
            if (!gsu.eventsName.find(function (value) { return value === eventname; }))
                gsu.eventsName.push(eventname);
        }
    }
    /**
     * 作为Attach状态，当事件被触发时会将此状态附加到状态机上
     * @param eventname 事件名
     */
    function mAttach(eventname) {
        return function (target) {
            if (!target.prototype['_su_']) {
                setTimeout(function () { initAttach(target, eventname); });
            }
            else {
                initAttach(target, eventname);
            }
        };
    }
    MSMDsc.mAttach = mAttach;
    function changegsu(target) {
        var gsu;
        var su = target.prototype['_su_'];
        if (!su) {
            console.error("su is undefind");
            return;
        }
        if (gsu = SMDB.find(function (value) { return value.sm === su; })) {
            var tars = [];
            gsu.stateRelation.forEach(function (value) {
                if (value.target === target) {
                    tars.push(value);
                }
            });
            if (tars.length !== 0) {
                tars.forEach(function (sr) {
                    sr.type |= 8;
                });
            }
            else {
                console.warn('mAttach或mLinkTo应该在前面声明');
                setTimeout(function () {
                    gsu.stateRelation.forEach(function (value) {
                        if (value.target === target) {
                            tars.push(value);
                        }
                    });
                    if (tars.length !== 0) {
                        tars.forEach(function (sr) {
                            sr.type |= 8;
                        });
                    }
                });
            }
        }
    }
    /**
     * 保持此附加状态唯一，需要先使用附加状态装饰器
     *
     */
    function mUnique(target) {
        if (!target.prototype['_su_']) {
            console.warn('mState应该在前面声明');
            setTimeout(function () {
                changegsu(target);
            });
        }
        else {
            changegsu(target);
        }
    }
    MSMDsc.mUnique = mUnique;
    function mSyncFunc(target, methodName, descriptor) {
        setTimeout(function () {
            var m = target[methodName];
            target[methodName] = function () {
                var sm = this.nowState[methodName];
                if (sm)
                    sm.apply(this.nowState, arguments);
                m.apply(this, arguments);
            };
        });
    }
    MSMDsc.mSyncFunc = mSyncFunc;
    function mSyncAttachFunc(target, methodName, descriptor) {
        setTimeout(function () {
            var m = target[methodName];
            target[methodName] = function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
                var op = StateMachine_1.MSM.OperatorStruct.getinstance();
                this.forEachAttach(methodName, op, arg);
                m.apply(this, arg.push(op));
            };
        });
    }
    MSMDsc.mSyncAttachFunc = mSyncAttachFunc;
    //当actionfunction的name项为空时，使用idx作为name
    var actionNameIdx = 1;
    /**
     * 标识为动作函数，在每次update时调用，每次调用传入dt。注：无论duration设置多长dt始终为0 - 1
     * 基本与Cocos Creator的Action保持一致
     * @param duration 持续时间
     * @param havereverse 是否包括返回行为
     * @param loopCount 循环次数
     * @param callback 动作完成回调
     * @param name 动作名
     */
    function ActionUpdate(duration, havereverse, loopCount, callback, name) {
        if (havereverse === void 0) { havereverse = true; }
        if (loopCount === void 0) { loopCount = 0; }
        if (callback === void 0) { callback = null; }
        return function (target, methodName, descriptor) {
            var oldStart = target.Start;
            //init action pool
            var actions = target['__actions'];
            if (!actions)
                target['__actions'] = [];
            var ad = target['__actionData'];
            if (!ad) {
                ad = { nowTime: 0, direction: true };
                target['__actionData'] = ad;
            }
            var actionFunction = target[methodName];
            //set action name
            var actionName = name;
            if (!actionName)
                actionName = 'action.' + actionNameIdx;
            actionFunction['__actionName'] = actionName;
            target.Start = function () {
                oldStart.apply(this, arguments);
                var iter = this.context.startCoroutine_Auto((function (_this) {
                    var count, dt, dir, nowTime, dt, dir, nowTime;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(loopCount > 0)) return [3 /*break*/, 4];
                                count = havereverse ? loopCount * 2 : loopCount;
                                _a.label = 1;
                            case 1:
                                if (!count) return [3 /*break*/, 3];
                                return [4 /*yield*/, StateMachine_1.MSM.AwaitNextUpdate.getInstance()];
                            case 2:
                                dt = _a.sent();
                                dir = ad.direction;
                                nowTime = ad.nowTime;
                                if (dir ? nowTime < duration : nowTime >= 0) {
                                    _this[methodName](nowTime === 0 ? 0 : nowTime / duration);
                                    ad.nowTime += dt * (dir ? 1 : -1);
                                }
                                else {
                                    count--;
                                    if (havereverse) {
                                        ad.nowTime = dir ? duration : 0;
                                        ad.direction = !dir;
                                    }
                                    else {
                                        ad.nowTime = 0;
                                    }
                                }
                                return [3 /*break*/, 1];
                            case 3:
                                _this[methodName](ad.nowTime === 0 ? 0 : ad.nowTime / duration);
                                if (callback)
                                    callback.apply(_this);
                                return [3 /*break*/, 6];
                            case 4:
                                if (!true) return [3 /*break*/, 6];
                                return [4 /*yield*/, StateMachine_1.MSM.AwaitNextUpdate.getInstance()];
                            case 5:
                                dt = _a.sent();
                                dir = ad.direction;
                                nowTime = ad.nowTime;
                                if (dir ? nowTime < duration : nowTime >= 0) {
                                    _this[methodName](nowTime === 0 ? 0 : nowTime / duration);
                                    ad.nowTime += dt * (dir ? 1 : -1);
                                }
                                else if (havereverse) {
                                    ad.nowTime = dir ? duration : 0;
                                    ad.direction = !dir;
                                }
                                else {
                                    ad.nowTime = 0;
                                }
                                return [3 /*break*/, 4];
                            case 6: return [2 /*return*/];
                        }
                    });
                })(this));
                this['__actions'].push({ iter: iter, actionName: actionName });
            };
        };
    }
    MSMDsc.ActionUpdate = ActionUpdate;
    /**
     * 标志此函数调用时会清除掉所有Action
     */
    function clearAllAction(target, methodName, descriptor) {
        var source = target[methodName];
        target[methodName] = function () {
            var _this_1 = this;
            var actions = this['__actions'];
            actions.forEach(function (value) {
                //删除片段
                _this_1.stopCoroutine(value['iter']);
            });
            source.apply(this, arguments);
        };
    }
    MSMDsc.clearAllAction = clearAllAction;
    /**
     * 此函数不是装饰器函数
     * 停止一个Action
     * @param target 当前类
     * @param ActionFunction Action函数
     */
    function StopAction(target, ActionFunction) {
        var actionName = ActionFunction['__actionName'];
        if (actionName) {
            var action = target['__actions'].find(function (value) { return value.actionName === actionName; });
            if (action) {
                target.stopCoroutine(action.iter);
            }
        }
    }
    MSMDsc.StopAction = StopAction;
})(MSMDsc = exports.MSMDsc || (exports.MSMDsc = {}));

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
        //# sourceMappingURL=StateDec.js.map
        