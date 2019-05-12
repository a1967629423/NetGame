"use strict";
cc._RF.push(module, '06423SPV6hKbZE54waimOgJ', 'StateMachine');
// frame/StateMachine/StateMachine.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ObjectPool_1 = require("../ObjectPool/ObjectPool");
var ObjectFactory_1 = require("../ObjectPool/ObjectFactory");
var MSM;
(function (MSM) {
    var OperatorStruct = /** @class */ (function () {
        function OperatorStruct(value) {
            this.canOperator = true;
            this.operatorValue = null;
            this.operatorInformation = Object.create(null);
            this.operatorValue = value;
            //if(!OperatorStruct.cachesOperator)OperatorStruct.cachesOperator = this;
        }
        OperatorStruct.prototype.recycle = function () {
            OperatorStruct.OP.push(this);
        };
        OperatorStruct.prototype.unuse = function () {
            this.canOperator = true;
            this.operatorInformation = Object.create(null);
        };
        OperatorStruct.prototype.reuse = function () {
        };
        OperatorStruct.getinstance = function (value) {
            var os = this.OP.pop();
            if (!os) {
                os = new OperatorStruct(value);
            }
            os.operatorValue = value;
            return os;
        };
        OperatorStruct.prototype.destroy = function () {
            OperatorStruct.OP.push(this);
        };
        OperatorStruct.OP = new ObjectPool_1.default(false);
        return OperatorStruct;
    }());
    MSM.OperatorStruct = OperatorStruct;
    var State = /** @class */ (function () {
        function State(cxt) {
            this.stateName = '';
            this.quitEvent = null;
            this.context = null;
            this._isAttach = false;
            this.context = cxt;
        }
        State.prototype.OnLoad = function () {
        };
        State.prototype.Start = function () {
        };
        State.prototype.update = function (dt, op) {
        };
        State.prototype.disable = function () {
        };
        State.prototype.Quit = function () {
            if (this.quitEvent)
                this.quitEvent(this);
        };
        /**
         * 如果此状态为附加状态则此状态退出
         */
        State.prototype.done = function () {
            if (this._isAttach)
                this.context.attachQuit(this);
            this.context.emit("done");
        };
        return State;
    }());
    MSM.State = State;
    var AwaitNext = /** @class */ (function () {
        function AwaitNext() {
            this._factor = null;
            this.count = 1;
            this.type = 1;
        }
        AwaitNext.prototype.unuse = function () {
        };
        AwaitNext.prototype.reuse = function () {
        };
        AwaitNext.prototype.recycle = function () {
            if (this._factor) {
                this._factor.push(this);
            }
        };
        AwaitNext.getInstance = function () {
            if (!this.OF) {
                this.OF = new ObjectFactory_1.default(true, AwaitNext);
            }
            var re = this.OF.pop();
            re._factor = this.OF;
            return re;
        };
        AwaitNext.OF = null;
        return AwaitNext;
    }());
    MSM.AwaitNext = AwaitNext;
    var AwaitNextUpdate = /** @class */ (function (_super) {
        __extends(AwaitNextUpdate, _super);
        function AwaitNextUpdate(count) {
            if (count === void 0) { count = 1; }
            var _this = _super.call(this) || this;
            _this.type = 1;
            _this.count = count;
            return _this;
        }
        AwaitNextUpdate.getInstance = function (count) {
            if (count === void 0) { count = 1; }
            if (!this.OF) {
                this.OF = new ObjectFactory_1.default(true, AwaitNextUpdate);
            }
            var re = this.OF.pop();
            re._factor = this.OF;
            re.count = count;
            return re;
        };
        AwaitNextUpdate.OF = null;
        return AwaitNextUpdate;
    }(AwaitNext));
    MSM.AwaitNextUpdate = AwaitNextUpdate;
    var AwaitNextSecond = /** @class */ (function (_super) {
        __extends(AwaitNextSecond, _super);
        function AwaitNextSecond(sec) {
            var _this = _super.call(this) || this;
            _this.type = 2;
            _this.time = sec;
            return _this;
        }
        AwaitNextSecond.getInstance = function (sec) {
            if (sec === void 0) { sec = 1; }
            if (!this.OF) {
                this.OF = new ObjectFactory_1.default(true, AwaitNextSecond, 1);
            }
            var re = this.OF.pop();
            re._factor = this.OF;
            re.time = sec;
            return re;
        };
        AwaitNextSecond.OF = null;
        return AwaitNextSecond;
    }(AwaitNext));
    MSM.AwaitNextSecond = AwaitNextSecond;
    var DCoroutine = /** @class */ (function () {
        function DCoroutine(Iter, mask) {
            this.time = 0;
            this.count = 0;
            this.type = 0;
            this.timmer = 0;
            this.countor = 0;
            this.mask = 0;
            this.NIter = Iter;
            this.setAttr(0);
            if (mask)
                this.mask = mask;
        }
        DCoroutine.prototype.setAttr = function (dt) {
            var result = this.NIter.next(dt);
            if (!result.done) {
                this.setValue(result.value ? result.value : AwaitNextUpdate.getInstance());
            }
            else {
                if (this.callback)
                    this.callback(this);
            }
        };
        DCoroutine.prototype.setValue = function (value) {
            this.type = value.type;
            switch (this.type) {
                case 1:
                    this.count = value.count;
                    break;
                case 2:
                    this.time = value.time;
                    break;
                default:
                    break;
            }
            value.recycle();
        };
        DCoroutine.prototype.Update = function (dt) {
            switch (this.type) {
                case 1:
                    this.countor++;
                    if (this.countor >= this.count) {
                        this.countor == 0;
                        this.setAttr(dt);
                    }
                    break;
                case 2:
                    if (this.timmer < this.time) {
                        this.timmer += dt;
                    }
                    else {
                        this.timmer = 0;
                        this.setAttr(dt);
                    }
                    break;
            }
        };
        return DCoroutine;
    }());
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StateMachine = /** @class */ (function (_super) {
        __extends(StateMachine, _super);
        function StateMachine() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.nowState = null;
            _this.attachment = [];
            _this.sqs = [];
            _this.stateIns = [];
            _this.Coroutines = [];
            _this.CoroutinesSpeed = [];
            _this.listenlist = [];
            return _this;
        }
        StateMachine.prototype.unuse = function (value) {
            //回收时清理当前状态
            this.nowState = null;
            this.CoroutinesSpeed = [];
        };
        StateMachine.prototype.reuse = function (value) {
            //启动状态
            this.emit('start');
        };
        StateMachine.prototype.recycle = function (value) {
        };
        StateMachine.prototype.changeState = function (cs) {
            if (this.nowState)
                this.nowState.Quit();
            this.nowState = cs;
            cs.Start();
        };
        /**
         * 初始化状态池，并且进入默认状态
         */
        StateMachine.prototype.Init = function () {
            var _this = this;
            if (this.stateIns.length == 0) {
                this.LSMDB.sts.forEach(function (value) {
                    var st = new value.st(_this);
                    _this.LSMDB.stateRelation.forEach(function (v) {
                        if (typeof v.target === 'string' && v.target === value.name) {
                            v.target = value.st;
                        }
                    });
                    st.OnLoad();
                    _this.stateIns.push({ Ins: st, Name: value.name });
                });
            }
            this.emit('start');
        };
        StateMachine.prototype.onLoad = function () {
        };
        StateMachine.prototype.start = function () {
            this.Init();
        };
        StateMachine.prototype.startCoroutine = function (iter) {
            var _this = this;
            iter.callback = function (value) {
                var idx = _this.Coroutines.findIndex(function (cor) { return cor === value; });
                if (idx > -1)
                    _this.Coroutines.splice(idx, 1);
            };
            this.Coroutines.push(iter);
            return iter;
        };
        StateMachine.prototype.startCoroutine_Auto = function (iter, mask) {
            return this.startCoroutine(new DCoroutine(iter, mask));
        };
        StateMachine.prototype.stopCoroutine = function (iter) {
            var idx = this.Coroutines.findIndex(function (value) { return value === iter; });
            if (idx > -1) {
                var oldCor = this.Coroutines[idx];
                this.Coroutines.splice(idx);
                //TODO:池化操作
            }
        };
        /**
         * 设置协同程序的运行速度
         * @param speed 1为标准速度值越大越快
         * @param mask 影响遮罩，（小范围的影响会覆盖大范围的影响）
         */
        StateMachine.prototype.setCoroutineSpeed = function (speed, mask) {
            if (mask === void 0) { mask = 1; }
            if (this.CoroutinesSpeed.length === 0) {
                this.CoroutinesSpeed.push({ mask: mask, speed: speed });
            }
            else {
                var csp = this.CoroutinesSpeed.find(function (v) { return v.mask === mask; });
                if (!csp) {
                    //从大到小插入
                    var idx = this.CoroutinesSpeed.findIndex(function (v) { return mask < v.mask; });
                    if (idx === -1) {
                        this.CoroutinesSpeed.unshift({ mask: mask, speed: speed });
                    }
                    else {
                        var del = this.CoroutinesSpeed.splice(idx + 1, this.CoroutinesSpeed.length - 1);
                        this.CoroutinesSpeed.push({ mask: mask, speed: speed });
                        this.CoroutinesSpeed = this.CoroutinesSpeed.concat(del);
                    }
                }
                else {
                    csp.speed = speed;
                }
            }
        };
        StateMachine.prototype.AwaitUntil = function (target) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.startCoroutine_Auto((function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!!target()) return [3 /*break*/, 2];
                                return [4 /*yield*/, AwaitNext.getInstance()];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 0];
                            case 2:
                                resolve();
                                return [2 /*return*/];
                        }
                    });
                })());
            });
        };
        StateMachine.prototype.update = function (dt) {
            if (this.Coroutines.length != 0) {
                for (var i = this.Coroutines.length - 1; i >= 0; i--) {
                    var item = this.Coroutines[i];
                    var ndt = dt;
                    if (this.CoroutinesSpeed.length > 0) {
                        this.CoroutinesSpeed.forEach(function (v) {
                            if (item.mask & v.mask) {
                                ndt = dt * v.speed;
                            }
                        });
                    }
                    this.Coroutines[i].Update(ndt);
                }
            }
            var op = OperatorStruct.getinstance();
            if (this.nowState)
                this.nowState.update(dt, op);
        };
        StateMachine.prototype.attachState = function (type) {
            //创建实例
            var cs = type.apply({ __proto__: type.prototype }, [this]);
            cs.quitEvent = this.attachQuit.bind(this);
            var fch = this.attachment.find(function (value) {
                if (value.construct === type)
                    return true;
            });
            if (fch) {
                fch.ch.push(cs);
            }
            else {
                this.attachment.push({ ch: new Array(cs), construct: type });
            }
            this.sqs.push(cs);
            cs._isAttach = true;
            setTimeout(function () {
                cs.Start();
            });
            return cs;
        };
        StateMachine.prototype.attachQuit = function (CS) {
            var typestr = typeof CS;
            var chindex = 0;
            var index = this.attachment.findIndex(function (value) {
                if (value.ch.find(function (v2, index) {
                    if (v2 === CS) {
                        chindex = index;
                        return true;
                    }
                }))
                    return true;
            });
            var index2 = this.sqs.findIndex(function (value) {
                if (value === CS)
                    return true;
            });
            if (index > -1)
                this.attachment[index].ch.splice(chindex, 1);
            if (index2 > -1)
                this.sqs.splice(index2, 1);
            if (this.attachment[index].ch.length < 1)
                delete this.attachment[typestr];
        };
        StateMachine.prototype.getAttachs = function (type) {
            for (var val in this.attachment) {
                if (this.attachment[val].construct === type)
                    return this.attachment[val].ch;
            }
            return null;
        };
        StateMachine.prototype.getAttach = function (type) {
            var ats = this.getAttachs(type);
            return (ats ? ats[0] : ats);
        };
        StateMachine.prototype.forEachAttach = function (functionName, os) {
            var arg = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                arg[_i - 2] = arguments[_i];
            }
            if (this.sqs.length > 0) {
                for (var i = this.sqs.length - 1; i >= 0; i--) {
                    arg.push(os);
                    this.sqs[i][functionName].apply(this.sqs[i], arg);
                }
            }
        };
        /**
         * 修改一个附加状态的执行顺序
         */
        StateMachine.prototype.changAttachStateOrder = function (cs, order) {
            var idx = this.sqs.findIndex(function (value) { if (value === cs)
                return true; });
            if (idx > -1) {
                var newArr = this.sqs.splice(idx, 1);
                newArr.splice(order, 0, this.sqs[idx]);
                this.sqs = newArr;
            }
        };
        StateMachine.prototype.getStatesLength = function () {
            return this.sqs.length;
        };
        /**
         * 引发一个事件
         * @param eventName 事件名
         */
        StateMachine.prototype.emit = function (eventName) {
            var _this = this;
            var st = this.strelation.find(function (value) {
                if (value.type === 1) {
                    return value.eventname == eventName && (value.source == _this.nowState['constructor'] || !value.source);
                }
                else {
                    return value.eventname === eventName;
                }
            });
            if (st) {
                var tarIns = this.stateIns.find(function (value) { return value.Ins['constructor'] === st.target; });
                if (tarIns && (st.type === 1 || st.type === 2) && this.nowState !== tarIns.Ins) {
                    this.changeState(tarIns.Ins);
                }
                else if (st.target && typeof st.target !== 'string') {
                    if (st.type & 8) {
                        if (!this.sqs.find(function (v) { return v['constructor'] === st.target; })) {
                            this.attachState(st.target);
                        }
                    }
                    else {
                        this.attachState(st.target);
                    }
                }
            }
            this.node.emit(eventName);
        };
        StateMachine.prototype.listenToemit = function (eventName) {
            this.emit(eventName);
        };
        StateMachine.prototype.listen = function (eventName) {
            if (!this.listenlist.find(function (value) { return value.eventName === eventName; })) {
                var callback = (function (eventName) {
                    var _this = this;
                    return function () {
                        _this.listenToemit(eventName);
                    };
                })(eventName);
                this.listenlist.push({ eventName: eventName, callback: callback });
                this.node.on(eventName, callback, this);
            }
        };
        StateMachine.prototype.cancelListen = function (eventName) {
            var list = this.listenlist.find(function (vlaue) { return vlaue.eventName === eventName; });
            if (list) {
                this.node.off(list.eventName, list.callback, this);
            }
        };
        StateMachine.prototype.onDestroy = function () {
            if (this.nowState)
                this.nowState.Quit();
            this.sqs.forEach(function (value) { if (value)
                value.Quit(); });
        };
        StateMachine.prototype.onDisable = function () {
            if (this.nowState)
                this.nowState.disable();
            this.sqs.forEach(function (value) { if (value)
                value.disable(); });
        };
        StateMachine = __decorate([
            ccclass
        ], StateMachine);
        return StateMachine;
    }(cc.Component));
    MSM.StateMachine = StateMachine;
    var StateMachine_base = /** @class */ (function () {
        function StateMachine_base() {
            this.nowState = null;
            this.attachment = [];
            this.sqs = [];
            this.stateIns = [];
            this.Coroutines = [];
            this.listenlist = [];
        }
        StateMachine_base.prototype.changeState = function (cs) {
            if (this.nowState)
                this.nowState.Quit();
            this.nowState = cs;
            cs.Start();
        };
        StateMachine_base.prototype.start = function () {
            var _this = this;
            this.LSMDB.sts.forEach(function (value) {
                var st = new value.st(_this);
                st.OnLoad();
                _this.stateIns.push({ Ins: st, Name: value.name });
            });
            this.emit('start');
        };
        StateMachine_base.prototype.startCoroutine = function (iter) {
            var _this = this;
            iter.callback = function (value) {
                _this.Coroutines.splice(_this.Coroutines.findIndex(function (cor) { return cor === value; }), 1);
            };
            this.Coroutines.push(iter);
            return iter;
        };
        StateMachine_base.prototype.startCoroutine_Auto = function (iter) {
            //TODO:池化
            return this.startCoroutine(new DCoroutine(iter));
        };
        StateMachine_base.prototype.stopCoroutine = function (iter) {
            var idx = this.Coroutines.findIndex(function (value) { return value === iter; });
            if (idx > -1) {
                var oldCor = this.Coroutines[idx];
                this.Coroutines.splice(idx);
                //TODO:池化操作
            }
        };
        StateMachine_base.prototype.update = function (dt) {
            if (this.Coroutines.length != 0) {
                for (var i = this.Coroutines.length - 1; i >= 0; i--) {
                    this.Coroutines[i].Update(dt);
                }
            }
            var op = OperatorStruct.getinstance();
            if (this.nowState)
                this.nowState.update(dt, op);
        };
        StateMachine_base.prototype.attachState = function (type) {
            //创建实例
            var cs = type.apply({ __proto__: type.prototype }, [this]);
            cs.quitEvent = this.attachQuit.bind(this);
            var fch = this.attachment.find(function (value) {
                if (value.construct === type)
                    return true;
            });
            if (fch) {
                fch.ch.push(cs);
            }
            else {
                this.attachment.push({ ch: new Array(cs), construct: type });
            }
            this.sqs.push(cs);
            cs._isAttach = true;
            setTimeout(function () {
                cs.Start();
            });
            return cs;
        };
        StateMachine_base.prototype.attachQuit = function (CS) {
            var typestr = typeof CS;
            var chindex = 0;
            var index = this.attachment.findIndex(function (value) {
                if (value.ch.find(function (v2, index) {
                    if (v2 === CS) {
                        chindex = index;
                        return true;
                    }
                }))
                    return true;
            });
            var index2 = this.sqs.findIndex(function (value) {
                if (value === CS)
                    return true;
            });
            this.attachment[index].ch.splice(chindex, 1);
            this.sqs.splice(index2, 1);
            if (this.attachment[index].ch.length < 1)
                delete this.attachment[typestr];
        };
        StateMachine_base.prototype.getAttachs = function (type) {
            for (var val in this.attachment) {
                if (this.attachment[val].construct === type)
                    return this.attachment[val].ch;
            }
            return null;
        };
        StateMachine_base.prototype.getAttach = function (type) {
            var ats = this.getAttachs(type);
            return (ats ? ats[0] : ats);
        };
        StateMachine_base.prototype.forEachAttach = function (functionName, os) {
            var arg = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                arg[_i - 2] = arguments[_i];
            }
            if (this.sqs.length > 0) {
                for (var i = this.sqs.length - 1; i >= 0; i--) {
                    arg.push(os);
                    this.sqs[i][functionName].apply(this.sqs[i], arg);
                }
            }
        };
        /**
         * 修改一个附加状态的执行顺序
         */
        StateMachine_base.prototype.changAttachStateOrder = function (cs, order) {
            var idx = this.sqs.findIndex(function (value) { if (value === cs)
                return true; });
            if (idx > -1) {
                var newArr = this.sqs.splice(idx, 1);
                newArr.splice(order, 0, this.sqs[idx]);
                this.sqs = newArr;
            }
        };
        StateMachine_base.prototype.getStatesLength = function () {
            return this.sqs.length;
        };
        /**
         * 引发一个事件
         * @param eventName 事件名
         */
        StateMachine_base.prototype.emit = function (eventName) {
            var _this = this;
            var st = this.strelation.find(function (value) {
                if (!_this.nowState) {
                    return value.eventname == eventName;
                }
                else {
                    return value.eventname == eventName && (value.source == _this.nowState['constructor'] || !value.source);
                }
            });
            if (st) {
                var tarIns = this.stateIns.find(function (value) { return value.Ins['constructor'] === st.target; });
                if (tarIns) {
                    this.changeState(tarIns.Ins);
                }
            }
        };
        StateMachine_base.prototype.listenToemit = function (eventName) {
            this.emit(eventName);
        };
        StateMachine_base.prototype.listen = function (eventName) {
            // if (!this.listenlist.find(value => value.eventName === eventName)) {
            //     var callback = (function (eventName) {
            //         return () => {
            //             this.listenToemit(eventName)
            //         }
            //     })(eventName)
            //     this.listenlist.push({ eventName: eventName, callback: callback })
            //     this.node.on(eventName, callback, this);
            // }
        };
        StateMachine_base.prototype.cancelListen = function (eventName) {
            // var list = this.listenlist.find(vlaue => vlaue.eventName === eventName)
            // if (list) {
            //     this.node.off(list.eventName, list.callback, this)
            // }
        };
        StateMachine_base.prototype.onDestroy = function () {
            this.nowState.Quit();
            this.sqs.forEach(function (value) { value.Quit(); });
        };
        StateMachine_base.prototype.onDisable = function () {
            this.nowState.disable();
            this.sqs.forEach(function (value) { value.disable(); });
        };
        StateMachine_base.prototype.disable = function () {
            this.onDisable();
        };
        StateMachine_base.prototype.destroy = function () {
            this.onDestroy();
        };
        return StateMachine_base;
    }());
    MSM.StateMachine_base = StateMachine_base;
})(MSM = exports.MSM || (exports.MSM = {}));

cc._RF.pop();