import { MSM } from "../../frame/StateMachine/StateMachine";
import { MSMDsc } from "../../frame/StateMachine/StateDec";
import SitePeople from "../site/SitePeople";
import { SiteLineSM, SiteSM } from "../site/SiteMachine";
import { SLDSM } from "../site/SiteLine";
import { Path } from "../Path/PathSM";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const { ccclass, property } = cc._decorator;
const {mSyncAttachFunc,mSyncFunc}=MSMDsc
export module Vehicle {
    @MSMDsc.mStateMachine
    @ccclass
    export class VehicleMachine extends MSM.StateMachine {
        static allVehicle:VehicleMachine[] = [];
        @property(SitePeople)
        peoples:SitePeople[] = []
        line:Path.VehiclePath= null
        getNowSite():SiteSM.SiteMachine
        {
            return this.rundir?this.line.lastSite:this.line.nextSite;
        }
        unuse()
        {
            super.unuse();
            var idx = VehicleMachine.allVehicle.findIndex(v=>v===this)
            if(idx!==-1)
            {
                VehicleMachine.allVehicle.splice(idx);
            }
        }
        reuse()
        {
            super.reuse();
            VehicleMachine.allVehicle.push(this);
        }
        nowSite:SiteSM.SiteMachine = null;
        nowProgress:number= 0;
        allLength:number = 0;
        rate:number = 100;
        rundir:boolean = true;
        getNextLine()
        {
            if(this.line)
            {
                return this.rundir?this.line.NextPath:this.line.LastPath;
            }
        }
        getLastLine()
        {
            if(this.line)
            {
                return this.rundir?this.line.NextPath:this.line.LastPath;
            }
        }
        static Factory(line:Path.VehiclePath,progress:number|cc.Vec2,node:cc.Node)
        {
            var vehicle = node.getComponent(VehicleMachine);
            var position:cc.Vec2 = null
            if(progress instanceof cc.Vec2)
            {
                position = progress;
            }
            else
            {
                var result = line.getLocation(progress);
                position = result.position;
            }
            node.position = position;
            vehicle.line = line;
        }
    }
    export class VehicleState extends MSM.State
    {
        context:VehicleMachine
    }
}


