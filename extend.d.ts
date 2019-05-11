declare namespace cc
{
    export class EventListener{
        checkAvailable();
        clone();
        isSwallowTouches();
        onTouchBegan(touch,event)
        onTouchCancelled(touch,event);
        onTouchEnded(touch,event);
        onTouchMoved(touch,event);
        setSwallowTouches(needSwallow);
        swallowTouches:boolean;
        _claimedTouches
    }
    export class TouchOneByOne extends EventListener
    {
        mask:number
        owner:cc.Node
        _claimedTouches:[]
        _fixedPriority:number
        _isEnabled:boolean
        _listenerID:string
        _node:cc.Node
        _onEvent
        _paused:boolean
        _registered:boolean
        _target:cc.Node
        _type:number
    }
}
