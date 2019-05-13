import { MSM } from "../../../frame/StateMachine/StateMachine";
import { MSMDsc } from "../../../frame/StateMachine/StateDec";
import { Vehicle } from "../VehicleMachine";
import { SLDSM } from "../../site/SiteLine";
/**
 * 已完成载具移动（依赖于线计算位置）
 * 已完成到达站点卸人载人（是否上下车依赖站点检查类型）
 * 已完成自动转向
 */
const { mDefaultState, mLinkTo, mState } = MSMDsc
export module VehicleStates {
    
    @mDefaultState
    @mLinkTo('Load', 'loading')
    @mState('Default', Vehicle.VehicleMachine)
    export class Default extends Vehicle.VehicleState {
        lastLine: SLDSM.SiteLine = null;
        Start() {
            this.context.line.addVehicle(this.context)

        }
        update(dt) {
            var nPro = this.context.nowProgress + dt * this.context.rate;
            var sLine = this.context.line;
            if (nPro > 0 && nPro < this.context.line.allLength) {
                var { position, radian } = this.context.line.getLocation(nPro, this.context.rundir);
                this.context.node.position = position;
                this.context.nowProgress = nPro;
                this.context.node.rotation = DMath.radianToAngle(radian)
            }
            else {
                debugger;
                if (this.context.rundir) {
                    if(this.context.line.isEnd)
                    {
                        this.context.rundir=!this.context.rundir;
                    }
                    else if (this.context.line.NextPath) {
                        this.context.line = this.context.line.NextPath;
                    }
                }
                else {
                    if(this.context.line.isBegin)
                    {
                        this.context.rundir=!this.context.rundir;
                    } else if (this.context.line.LastPath) {
                        this.context.line = this.context.line.LastPath;
                    }
                }

                sLine.removeVehicle(this.context);

                //this.context.line = this.context.nowSite.SiteLines.find(value=>value.LineType==this.context.line.LineType);

                //this.context.nowSite = this.context.rundir? this.context.line.NextLine?this.context.line.NextLine.NowSite:this.context.line.NowSite:this.context.line.LastLine?this.context.line.LastLine.LastSite:this.context.line.NowSite;
                // if (this.context.line.isBegin || this.context.line.isEnd||this.context.getNextLine().ClearFlag) {
                //     this.context.rundir = !this.context.rundir;
                //     //this.context.nowProgress= this.context.line.isBegin?0.9:0.1;
                // }
                this.context.nowProgress = 0;
                debugger;
                this.context.emit('loading')
            }

        }
    }
    
    @mLinkTo('Default', 'loaded')
    @mState('Load', Vehicle.VehicleMachine)
    export class Loading extends Vehicle.VehicleState {
        Start() {
            var nowSite = this.context.getNowSite()
            var sitePeople = nowSite.SitePeople;
            
            var peoples = this.context.peoples;
            var _this = this;
            this.context.startCoroutine_Auto((function* () {
                for (var i = peoples.length - 1; i >= 0; i--) {
                    var np = peoples[i]
                    if (np && np.GetOffVehicle(_this.context)) {
                        yield MSM.AwaitNextSecond.getInstance(0.4);
                        _this.context.node.removeChild(np.node);
                        nowSite.pushPeople(MSM.OperatorStruct.getinstance(np));
                        peoples.splice(i, 1)
                    }
                    // var r = MSM.OperatorStruct.getinstance(false);
                    // nowLine.checkType(np.peopleType,r,dir);
                    // var canZ = false;
                    // if(!r.operatorValue)
                    // {
                    //     nowSite.checkType(np.peopleType,r,true);
                    //     canZ = r.operatorValue
                    // }
                    // if(np.peopleType===nowSite.SiteType||canZ)
                    // {
                    //     _this.context.node.removeChild(np.node);
                    //     nowSite.pushPeople(MSM.OperatorStruct.getinstance(np));
                    //     peoples.splice(i,1)
                    // }
                    // r.recycle()
                }
                // for(var item in peoples)
                // {
                //     yield new MSM.AwaitNextSecond(0.4);
                //     if(peoples[item].peopleType==nowSite.SiteType)
                //     {
                //         _this.context.node.removeChild(peoples[item].node)
                //         nowSite.pushPeople(MSM.OperatorStruct.getinstance(peoples.splice(Number.parseInt(item),1)[0]));
                //     }
                // }

                for (var item = sitePeople.length; item >= 0; item--) {

                    //var result = MSM.OperatorStruct.getinstance(false)
                    var loadpeop = sitePeople[item]
                    if (loadpeop && loadpeop.GetInVehicle(_this.context)) {
                        yield MSM.AwaitNextSecond.getInstance(0.4);
                        var OS = MSM.OperatorStruct.getinstance(loadpeop)
                        nowSite.loadingPoeple(OS);
                        loadpeop.node.setParent(_this.context.node);
                        peoples.unshift(loadpeop)
                        OS.recycle();
                    }
                    //nowLine.checkType(sitePeople[item].peopleType,result,dir);
                    // nowSite.checkType(sitePeople[item].peopleType,result,dir)
                    // if(result.operatorValue)
                    // {
                    //     var loadpeop = sitePeople[item];
                    //     var OS = MSM.OperatorStruct.getinstance(loadpeop)
                    //     nowSite.loadingPoeple(OS);
                    //     loadpeop.node.setParent(_this.context.node);
                    //     peoples.push(loadpeop)
                    //     OS.recycle();
                    //     //_this.context.node.addChild(sitePeople[item].node) 
                    // }
                    // result.recycle(); 
                }
                _this.context.emit('loaded');
            })())
        }
    }

}
