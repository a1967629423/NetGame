import { MSMDsc } from "../../../frame/StateMachine/StateDec";
import { LineClear } from "../LineClearManage";
import { MSM } from "../../../frame/StateMachine/StateMachine";
import { SLDSM } from "../../site/SiteLine";
import { Path } from "../../Path/PathSM";
const {LineClearManage,LineClearState}=LineClear
const {mDefaultState,mLinkTo,mState,mAttach,mUnique}=MSMDsc
const {AwaitNextUpdate}=MSM
const {SiteLine}=SLDSM
export module ClearManageStates
{
    
    @mDefaultState
    @mLinkTo('Clear','clear')
    @mState('Default',LineClearManage)
    export class Default extends LineClearState
    {

    }
    @mLinkTo('Default','clearEnd')
    @mState('Clear',LineClearManage)
    export class Clear extends LineClearState
    {
        haveTageLines:Path.VehiclePath[] = []
        wellBeClaer:Path.VehiclePath[] = []
        checkLineHaveClearFlag()
        {
            Path.VehiclePath.allPath.forEach(line=>{
                if(line.ClearFlag&&!this.haveTageLines.find(value=>value===line))
                {
                    this.haveTageLines.push(line);
                }
            })
        }
        updateMaskAndClear()
        {
            var saveLine:Path.VehiclePath[] = []
            SiteLine.LineVehicles.forEach(value=>{
                value.Vehicles.forEach(vehicle=>{
                    var vline = vehicle.line;
                    saveLine.push(vline);
                    var rundir = vehicle.rundir;
                    var next = vline.NextPath;
                    var last = vline.LastPath;
                    if(vline.isBegin)
                    {
                        var nl = next;
                        saveLine.push(nl);
                    }
                    if(next&&next.isEnd&&rundir)
                    {
                        saveLine.push(next);
                    }
                    if(last&&last.isBegin&&!rundir)
                    {
                        saveLine.push(last);
                    }

                })
            });
            for(var i = this.haveTageLines.length-1;i>=0;i--)
            {
                var tl = this.haveTageLines[i];
                if(!saveLine.find(v=>v===tl))
                {
                    tl.recycle();
                    this.haveTageLines.splice(i);
                }
            }
        }
        Start()
        {
            this.checkLineHaveClearFlag();
            this.context.node.on('clear',this.checkLineHaveClearFlag,this);
            this.context.startCoroutine_Auto((function*(_this){
                while(true)
                {
                    yield AwaitNextUpdate.getInstance(1);
                    if(_this.haveTageLines.length==0)
                    {
                        _this.context.emit('clearEnd');
                        break;
                    }
                    _this.updateMaskAndClear();
                    
                    
                }
            })(this));
        }
        Quit()
        {
            this.context.node.off('clear',this.checkLineHaveClearFlag,this);
        }
    }
    @mUnique
    @mAttach('change')
    @mState('Change',LineClearManage)
    export class Change extends LineClearState
    {
        haveTageLines:SLDSM.SiteLine[] = []
        checkLIneHaveChangeFlag()
        {
            SLDSM.SiteLine.SiteLines.forEach(Linestruct=>{
                Linestruct.lines.forEach(line=>{
                    
                })
            })
        }
        Start()
        {
            this.context.node.on('change',this.checkLIneHaveChangeFlag,this);
            this.context.startCoroutine_Auto((function*(_this){
                while(true)
                {
                    yield AwaitNextUpdate.getInstance();
                    if(_this.haveTageLines.length===0)
                    {
                        _this.done();
                        break;
                    }
                }
            })(this));
        }
        Quit()
        {
            this.context.node.off('change',this.checkLIneHaveChangeFlag,this);
        }
    }
}