import { SiteSM } from "../SiteMachine";
import { MSMDsc } from "../../../frame/StateMachine/StateDec";
import { MSM } from "../../../frame/StateMachine/StateMachine";
import GameObjectManage from "../../manage/GameObjectManange";
import { SiteLineType, SiteType } from "../../Enums";
import SitePeople from "../SitePeople";
import PrefabFactor from "../../../frame/PrefabFactory/PrefabFactory";
const {mDefaultState,mLinkTo,mState}=MSMDsc
export module SiteStates {
    @mDefaultState
    @mState('Default',SiteSM.SiteMachine)
    export class Default extends SiteSM.SiteState {
        checkType(type:number,result:MSM.OperatorStruct<boolean>,dir:boolean)
        {
            if(!result.operatorValue)
            {
                this.context.SiteLines.forEach(value=>{
                    //if(value!=this.context.)
                    //value.checkType(type,result,true);
                    //value.checkType(type,result,false);
                })
            }
        }
        update(dt)
        {

        }
        touch(t:cc.Touch)
        {      
        }
        touchStart(t:cc.Touch)
        {
        }
        async InitPoeple(people?:SitePeople)
        {
            if(!people)
            {
                //随机生成人物
                var len = Object.keys(SiteType).length-1
                var i =Math.floor(Math.random()*len)
                people = await GameObjectManage.Instance.getPeople(i,this.context);
            }
            else
            {
                console.log(people);
            }
            
            if(!people.node.parent)
            {
                this.context.node.addChild(people.node);
                this.context.SitePeople.push(people);
            }
            else
            {
                console.log('have parent');
            }
        }
        loadingPoeple(result: MSM.OperatorStruct<SitePeople>)
        {
            this.context.SitePeople.splice(this.context.SitePeople.findIndex(value=>result.operatorValue===value),1);
            //result.operatorValue.node.removeFromParent();
            this.context.node.removeChild(result.operatorValue.node);
            console.log('loaded a people');
        }
        pushPeople(people: MSM.OperatorStruct<SitePeople>)
        {
            var p = people.operatorValue;
            if(!p&&CC_DEBUG)
            {
                debugger;
            }
            if(p.peopleType===this.context.SiteType)
            {
                PrefabFactor.NodePush(p.node);
            }
            else
            {
                console.log('转站')
                this.InitPoeple(p);
            } 
            console.log('push a people')
        }
        Start()
        {
            this.context.startCoroutine_Auto((function*(_this){
                while(true)
                {
                    yield MSM.AwaitNextSecond.getInstance(8);
                    if(Math.random()>0.5)
                    {
                        _this.InitPoeple();
                    }
                }
            })(this))
        }
        async touchCancel(t:cc.Touch)
        {
            var __pool = SiteSM.SiteMachine.SiteMachines
            for(var f in __pool)
            {
                var value = __pool[f].node;
                if(value.activeInHierarchy)
                {
                    if(value['_hitTest'](t.getLocation()))
                    {
                        var next = value.getComponent(SiteSM.SiteMachine);
                        var type = 0;
                        if(this.context.SiteLines.length>0)
                        {
                            //站点上有线默认就使用第一个
                            type = this.context.SiteLines[0].PathType
                        }
                        else
                        {
                            //站点没线默认使用剩下的第一个
                            if(GameObjectManage.Instance.lineCount>0)
                            type = GameObjectManage.Instance.residueLineType[0];
                            else
                            return
                        }
                        var nLine = this.context.SiteLines.find(value=>value.PathType===type&&value.nextSite===this.context&&!(value.mask&13));
                        var lastSite = nLine&&nLine.lastSite;
                        var line = await GameObjectManage.Instance.getLine(type,lastSite,this.context,next);
                        if(line)
                        {
                            //this.context.SiteLines.push(line.line);
                            //next.SiteLines.push(line.line);
                            //this.context.node.addChild(line.node);
                            break;
                        }
                        if(CC_DEBUG)
                        {
                            console.log('line add')
                        }
                    }
                }
            }
        }
    }
}

