import { MSM } from "./StateMachine";

export module MSMDsc {
    var SMDB: SM[] = [];
    /**
     * 
     * 状态机装饰器
     */
    export function mStateMachine<T extends MSM.StateMachine>(target: { prototype: T }) {
        if (!SMDB.find(value => { return value.sm == target })) {
            var p = { sm: target, sts: [], stateRelation: [], eventsName: [] };
            SMDB.push(p);
            target.prototype.strelation = p.stateRelation;
            target.prototype.LSMDB = p;
        }
    }
    /**
     * 状态装饰器
     * @param name 状态名
     * @param su 所依附的状态机
     */
    export function mState<T extends MSM.StateMachine, P extends MSM.State>(name: string, su: { new(): T }) {
        return (target: { new(ctx: T): P }) => {
            var gsu = SMDB.find(value => { return value.sm == su });
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
        }
    }
    /**
     * 默认状态装饰器
     * 默认状态会在状态机初始化时自动切换，默认状态只允许一个，切换默认状态的事件名为start
     */
    export function mDefaultState<T extends MSM.StateMachine, P extends MSM.State>(target: { new(cxt: MSM.StateMachine): P }) {
        function initDefault() {
            var su: { prototype: T } = target.prototype['_su_'];
            if (su) {

                if (su.prototype.strelation.find(value => { return value.eventname === 'start' })) {
                    console.log("DefaultState only one");
                    return;
                }
                su.prototype.strelation.push({ eventname: 'start', source: null, target: target, type: 2 });
            }
        }
        if (!target.prototype['_su_']) {
            setTimeout(() => { initDefault() })
        }
        else {
            initDefault()
        }
    }
    /**
     * 使用或创建一个过渡事件，当事件被触发时会将此状态切换为当前状态
     * @param targenamet 目标状态名
     * @param eventname 触发事件名
     */
    export function mLinkTo<T extends MSM.State, P extends MSM.StateMachine>(targenamet: string, eventname: string) {
        function initLink(tar: { new(cxt: P): T }) {
            var gsu: SM;
            var su: { prototype: P } = tar.prototype['_su_'];
            if (!su) {
                console.error("su is undefind");
                return;
            }
            if (gsu = SMDB.find(value => { return value.sm == su })) {
                var linkc = gsu.sts.find(value => { return value.name == targenamet });
                if (linkc) {
                    gsu.stateRelation.push({ source: tar, target: linkc.st, eventname: eventname, type: 1 });
                }
                else
                {
                    gsu.stateRelation.push({ source: tar, target: targenamet, eventname: eventname, type: 1 });
                }
                if (!gsu.eventsName.find(value => { return value === eventname })) gsu.eventsName.push(eventname)
            }
        }
        return (target: { new(cxt: P): T }) => {
            if (!target.prototype['_su_']) {
                console.warn('mState应该声明在前面:'+target.name);
                setTimeout(() => { initLink(target) });
            }
            else {
                initLink(target);
            }
        }
    }
    function initAttach<T extends MSM.State, P extends MSM.StateMachine>(tar: { new(cxt: P): T }, eventname: string) {
        var gsu: SM;
        var su: { prototype: P } = tar.prototype['_su_'];
        if (!su) {
            console.error("su is undefind");
            return;
        }
        if (gsu = SMDB.find(value => value.sm === su)) {
            gsu.stateRelation.push({ source: null, target: tar, eventname: eventname, type: 4 })
            if (!gsu.eventsName.find(value => { return value === eventname })) gsu.eventsName.push(eventname);
        }
    }
    /**
     * 作为Attach状态，当事件被触发时会将此状态附加到状态机上
     * @param eventname 事件名
     */
    export function mAttach<T extends MSM.State, P extends MSM.StateMachine>(eventname: string) {
        return (target: { new(cxt: P): T }) => {
            if (!target.prototype['_su_']) {
                setTimeout(() => { initAttach(target, eventname) })
            } else {
                initAttach(target, eventname);
            }
        }
    }
    function changegsu<T extends MSM.State, P extends MSM.StateMachine>(target: { new(ctx: P): T }) {
        var gsu: SM;
        var su: { prototype: P } = target.prototype['_su_'];
        if (!su) {
            console.error("su is undefind");
            return;
        }
        if (gsu = SMDB.find(value => value.sm === su)) {
            var tars: SR[] = []
            gsu.stateRelation.forEach(value => {
                if (value.target === target) {
                    tars.push(value);
                }
            })
            if (tars.length !== 0) {
                tars.forEach(sr => {
                    sr.type |= 8;
                });
            }
            else {
                console.warn('mAttach或mLinkTo应该在前面声明')
                setTimeout(() => {
                    gsu.stateRelation.forEach(value => {
                        if (value.target === target) {
                            tars.push(value);
                        }
                    })
                    if (tars.length !== 0) {
                        tars.forEach(sr => {
                            sr.type |= 8;
                        });
                    }
                })
            }
        }
    }
    /**
     * 保持此附加状态唯一，需要先使用附加状态装饰器
     * 
     */
    export function mUnique<T extends MSM.State, P extends MSM.StateMachine>(target: { new(ctx: P): T }) {
        if (!target.prototype['_su_']) {
            console.warn('mState应该在前面声明');
            setTimeout(() => {
                changegsu(target)
            });
        }
        else {
            changegsu(target);
        }
    }
    export function mSyncFunc<P extends MSM.StateMachine>(target: P, methodName: string, descriptor: TypedPropertyDescriptor<any>) {
        setTimeout(() => {
            var m = target[methodName]
            target[methodName] = function () {
                var sm = this.nowState[methodName]
                if (sm) sm.apply(this.nowState, arguments)
                m.apply(this, arguments)
            }
        })

    }
    export function mSyncAttachFunc<P extends MSM.StateMachine>(target: P, methodName: string, descriptor: TypedPropertyDescriptor<any>) {
        setTimeout(() => {
            var m = target[methodName]
            target[methodName] = function (...arg) {
                var op = MSM.OperatorStruct.getinstance()
                this.forEachAttach(methodName, op, arg)
                m.apply(this, arg.push(op))
            }
        })
    }
    //当actionfunction的name项为空时，使用idx作为name
    var actionNameIdx: number = 1;
    /**
     * 标识为动作函数，在每次update时调用，每次调用传入dt。注：无论duration设置多长dt始终为0 - 1
     * 基本与Cocos Creator的Action保持一致
     * @param duration 持续时间
     * @param havereverse 是否包括返回行为
     * @param loopCount 循环次数
     * @param callback 动作完成回调
     * @param name 动作名
     */
    export function ActionUpdate<T extends MSM.State>(duration: number, havereverse: boolean = true, loopCount: number = 0, callback: (this: T) => any = null, name?: string) {
        return (target: T, methodName: string, descriptor: TypedPropertyDescriptor<any>) => {
            var oldStart = target.Start;
            var nowTime = 0;
            var dir: boolean = true;
            //init action pool
            var actions = target['__actions'];
            if (!actions) target['__actions'] = [];
            var actionFunction = target[methodName];
            //set action name
            var actionName = name
            if (!actionName) actionName = 'action.' + actionNameIdx;
            actionFunction['__actionName'] = actionName;
            target.Start = function () {
                oldStart.apply(this, arguments);
                var iter = this.context.startCoroutine_Auto((function* (_this) {
                    if (loopCount > 0) {
                        var count = havereverse ? loopCount * 2 : loopCount;
                        while (count) {
                            var dt = yield MSM.AwaitNextUpdate.getInstance();
                            if (dir ? nowTime < duration : nowTime >= 0) {
                                _this[methodName](nowTime === 0 ? 0 : nowTime / duration);
                                nowTime += dt * (dir ? 1 : -1);
                            }
                            else {
                                count--;
                                if (havereverse) {
                                    nowTime = dir ? duration : 0;
                                    dir = !dir;
                                }
                                else {
                                    nowTime = 0;
                                }
                            }
                        }
                        _this[methodName](nowTime === 0 ? 0 : nowTime / duration);
                        if (callback) callback.apply(_this);
                    }
                    else {
                        while (true) {
                            var dt = yield MSM.AwaitNextUpdate.getInstance();
                            if (dir ? nowTime < duration : nowTime >= 0) {
                                _this[methodName](nowTime === 0 ? 0 : nowTime / duration);
                                nowTime += dt * (dir ? 1 : -1);
                            }
                            else if (havereverse) {
                                nowTime = dir ? duration : 0;
                                dir = !dir;
                            }
                            else {
                                nowTime = 0;
                            }
                        }
                    }
                })(this));
                this['__actions'].push({ iter: iter, actionName: actionName });
            }
        }
    }
    /**
     * 标志此函数调用时会清除掉所有Action
     */
    export function clearAllAction<T extends MSM.State>(target: T, methodName: string, descriptor: TypedPropertyDescriptor<any>) {
        var source: Function = target[methodName];
        target[methodName] = function () {
            var actions: [] = this['__actions'];
            actions.forEach(value => {
                //删除片段
                this.stopCoroutine(value['iter'])
            });
            source.apply(this, arguments);
        }
    }
    /**
     * 此函数不是装饰器函数
     * 停止一个Action
     * @param target 当前类
     * @param ActionFunction Action函数
     */
    export function StopAction<T extends MSM.StateMachine>(target: T, ActionFunction: Function) {
        var actionName = ActionFunction['__actionName']
        if (actionName) {
            var action = target['__actions'].find(value => value.actionName === actionName);
            if (action) {
                target.stopCoroutine(action.iter);
            }
        }
    }
}

