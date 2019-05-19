import { MSM } from "../../frame/StateMachine/StateMachine";
import { MSMDsc } from "../../frame/StateMachine/StateDec";
import { IInput, IPSM } from "../../frame/InputManage";
import SitePeople from "./SitePeople";
import PrefabFactor from "../../frame/PrefabFactory/PrefabFactory";
import { SiteType, SiteLineType } from "../Enums";
import ObjectFactory from "../../frame/ObjectPool/ObjectFactory";
import { IObpool } from "../../frame/ObjectPool/ObjectPool";
import GameObjectManage from "../manage/GameObjectManange";
import ScenesObject from "../../utility/ScenesObject";
import { SLDSM } from "./SiteLine";
import { Path } from "../Path/PathSM";



const { ccclass, property } = cc._decorator;
const { mSyncAttachFunc, mSyncFunc } = MSMDsc
export module SiteLineSM {
    export class SiteLineMachine implements IObpool {
        recycle() {
            SiteLineMachine.OF.push(this);
        }
        unuse() {
        }
        reuse() {
        }
        LastSite: SiteSM.SiteMachine = null
        LastLine: SiteLineSM.SiteLineMachine = null
        NowSite: SiteSM.SiteMachine = null
        NextLine: SiteLineSM.SiteLineMachine = null
        NextSite: SiteSM.SiteMachine = null
        allLength: number = 0;
        changPoint: { length: number, point: cc.Vec2, Radian: number }[] = [];
        rchangePoint: { length: number, point: cc.Vec2, Radian: number }[] = [];
        node: cc.Node = null
        static SiteInfo: { key: SiteLineType, value: SiteSM.SiteMachine[] }[] = []
        _LineType: SiteLineType = SiteLineType.red;
        get LineType(): SiteLineType {
            return this._LineType;
        }
        set LineType(val) {
            this._LineType = val;
        }
        static OF: ObjectFactory<SiteLineMachine> = new ObjectFactory(true, SiteLineMachine)
        static check
        async onLoad() {
            // if (this.isBegin) {
            //     var vechicle = await GameObjectManage.Instance.getVehicle(this.NowSite, 0.1, this)
            //     if (vechicle) {
            //         var vehicles = ScenesObject.instance.node.getChildByName('vehicles');
            //         vehicles.addChild(vechicle.node);
            //     }
            // }
        }
        static caculatePath(n:SiteSM.SiteMachine,e:SiteSM.SiteMachine,Line:SiteLineMachine)
        {
            var { x, y, allLength, firstRadian, lastRadian, rectDir, rectH, rectW } = DMath.pathCalcaulate(n.node.x, n.node.y, e.node.x, e.node.y)
            Line.allLength = allLength;
            Line.changPoint = []
            Line.changPoint.push({ length: rectDir ? rectW : rectH, point: cc.v2(x, y), Radian: firstRadian })
            Line.changPoint.push({ length: allLength, point: e.node.position, Radian: lastRadian });
        }
        static async getLM(n: SiteSM.SiteMachine, b: SiteSM.SiteMachine, e: SiteSM.SiteMachine, t: SiteLineType, node: cc.Node):Promise<SiteLineMachine>  {
            var directory = this.SiteInfo.find(value => value.key === t)

            if (n) {
                // var Line = n.SiteLines.find(value => value.LineType === t);
                // var next = e?e.SiteLines.find(value=>value.LineType===t):null;
                // if(Line===next&&CC_DEBUG)debugger;
                // if (!directory) {
                //     this.SiteInfo.push({ key: t, value: [n, e] });

                // }
                // else if (directory.value[directory.value.length - 1] === n&&!next) {
                //     if (directory.value[0] != e) {
                //         directory.value.push(e);
                //     }
                //     else {
                //         return null
                //     }
                // }
                // else {
                //     if(Line&&!Line.isEnd)
                //     {
                //         // let next = Line.NextLine;
                //         // let last = Line.LastLine;
                //         // var oldLine = Line;
                //         // directory.value.splice(directory.value.findIndex(value=>value===n),1)
                //         // directory.value.push(e);
                //         // n.removeLine(Line);
                //         // if(CC_DEBUG)debugger;
                //         // var SiteLine = await GameObjectManage.Instance.getLine(t,last.NowSite,e,next.NowSite);
                //         // if(!SiteLine)return null;
                //         // Line = SiteLine.line;
                //         // // Line.NowSite =e;
                //         // // Line.LastLine = last;
                //         // // Line.NextLine = next;
                //         // last.NextLine = Line;
                //         // next.LastLine = Line;
                //         // oldLine.NextLine = Line;
                //         // this.caculatePath(last.NowSite,Line.NowSite,last);
                //         // this.caculatePath(Line.NowSite,next.NowSite,Line);
                //         // n.addLine(Line);
                //         // //next.changPoint = Line.changPoint;
                //         // //next.allLength = Line.allLength;
                //         // //删除b上的节点
                //         // //新建e连接next与last
                //     }
                //     return null
                // }
                
                // if (!Line) {
                //     Line = this.OF.pop()
                //     n.SiteLines.push(Line);
                // }
                // //计算路径
                // // var { x, y, allLength, firstRadian, lastRadian, rectDir, rectH, rectW } = DMath.pathCalcaulate(n.node.x, n.node.y, e.node.x, e.node.y)
                // // Line.allLength = allLength;
                // // Line.changPoint = []
                // // Line.changPoint.push({ length: rectDir ? rectW : rectH, point: cc.v2(x, y), Radian: firstRadian })
                // // Line.changPoint.push({ length: allLength, point: e.node.position, Radian: lastRadian });
                // this.caculatePath(n,e,Line);
                // //Line.rchangePoint = [].concat(Line.changPoint).reverse()
                // Line.NowSite = n;
                // Line.LineType = t;
                // var lastSiteLine = b?b.SiteLines.find(value=>value.LineType===t):null;
                // if(lastSiteLine&&lastSiteLine!==Line)
                // {
                //     Line.LastLine = lastSiteLine
                // }
                // Line.node = node;

                // if(!next)
                // {
                //     next = this.OF.pop();
                //     e.SiteLines.push(next);
                // }
                // else
                // {
                //     var Old = next;
                //     next = this.OF.pop();
                //     Old.destory(next);
                //     e.SiteLines[e.SiteLines.findIndex(value=>value===next)]=next;
                // }

                // next.LineType = t;
                // next.LastLine = Line;
                // next.NowSite = e;
                // next.node = e.node;
                // next.allLength =  Line.allLength;
                // next.changPoint = Line.changPoint;
                // Line.NextLine = next;
                
                // return Line
            }
            else
                return null;
        }
        destory(newLine:SiteLineMachine)
        {
            this.NextLine = newLine;
            this.node.on('runEnd',()=>{
                this.NextLine=null;
                this.LastLine=null;
                PrefabFactor.NodePush(this.node);
            })
        }
        get isEnd(): boolean {
            return !this.NextLine
        }
        get isBegin(): boolean {
            return !this.LastLine
        }
        getLocation(progress: number, dir: boolean = true): { position: cc.Vec2, radian: number } {
            var nLine = dir?this:this.LastLine;
            var narr = nLine.changPoint//dir?this.changPoint:this.rchangePoint
            var nprogress = dir ? progress : nLine.allLength - progress;
            var idx = narr.findIndex(value => value.length >= nprogress)
            var cp = narr[idx]
            var lastp = nLine.NowSite.node.position;
            var nLenght = cp.length;
            if (idx >= 1) {
                lastp = narr[idx - 1].point;
                nprogress -= narr[idx-1].length
                nLenght -= narr[idx-1].length
            }
            var np = lastp.lerp(cp.point, nprogress /nLenght) //dir?lastp.lerp(cp.point,cl):cp.point.lerp(lastp,cl);
            return { position: np, radian: cp.Radian + (dir ? 0 : Math.PI) };
            // return dir?this.NowSite.node.position.lerp(this.NextLine.NowSite.node.position,progress):this.NextLine.NowSite.node.position.lerp(this.NowSite.node.position,progress);
        }
        checkType(type: number, result: MSM.OperatorStruct<boolean>, dir: boolean) {
            if(result.operatorInformation.unfirst&&this.NowSite.SiteType===type)
            {
                result.operatorValue = true;
                return;
            }
            else
            {
                result.operatorInformation.unfirst = true;
            }
            dir ?this.NextLine?this.NextLine.checkType(type, result,dir):null :this.LastLine?this.LastLine.checkType(type, result,dir):null;
        }
    }
}
export interface ISite {
    checkType(type: number, result: MSM.OperatorStruct<boolean>,dir:boolean)
    pushPeople(people: MSM.OperatorStruct<SitePeople>)
    loadingPoeple(result: MSM.OperatorStruct<SitePeople>)
}

export module SiteSM {
    @MSMDsc.mStateMachine
    @ccclass
    export class SiteMachine extends MSM.StateMachine implements ISite, IInput {
        @mSyncFunc
        pushPeople(people: MSM.OperatorStruct<SitePeople>) {

        }
        @mSyncFunc
        loadingPoeple(result: MSM.OperatorStruct<SitePeople>) {
        }
        @mSyncFunc
        checkType(type: number, result: MSM.OperatorStruct<boolean>,dir:boolean) {

        }
        @property([SitePeople])
        SitePeople: SitePeople[] = []
        SiteLines: Path.VehiclePath[] = []
        PF: PrefabFactor = null
        @property({type:cc.Enum(SiteType)})
        SiteType: SiteType = SiteType.rect
        @mSyncFunc
        touch(touchEvent: cc.Touch) {
        }
        @mSyncFunc
        touchStart(touchEvent: cc.Touch) {

        }
        @mSyncFunc
        touchEnd(touchEvent: cc.Touch) {

        }
        @mSyncFunc
        touchCancel(touchEvent: cc.Touch) {

        }
        static SiteMachines: SiteMachine[] = []
        onLoad()
        {
            var ins = IPSM.InputManage.getInstance(this);
            //ins.addInput(this)
        }
        start() {
            super.start();
            SiteMachine.SiteMachines.push(this);
            this.PF = PrefabFactor.Instance
        }
        onDestroy() {
            var idx = SiteMachine.SiteMachines.findIndex(value => value === this)
            if(idx>-1)
            SiteMachine.SiteMachines.splice(idx, 1);
        }
        removeLine(line:Path.VehiclePath)
        {
            var idx = this.SiteLines.findIndex(value=>value===line);
            if(idx>-1)
            this.SiteLines.splice(idx,1);
        }
        addLine(line:Path.VehiclePath)
        {
            this.SiteLines.push(line);
        }


    }
    export class SiteState extends MSM.State implements ISite, IInput {
        pushPeople(people: MSM.OperatorStruct<SitePeople>) {
        }
        loadingPoeple(result: MSM.OperatorStruct<SitePeople>) {
        }
        checkType(type: number, result: MSM.OperatorStruct<boolean>,dir:boolean) {

        }
        touch(touchEvent: cc.Touch) {

        }
        touchStart(touchEvent: cc.Touch) {

        }
        touchEnd(touchEvent: cc.Touch) {

        }
        touchCancel(touchEvent: cc.Touch) {

        }
        // private ctx:SiteMachine = null;
        // get context():SiteMachine
        // {
        //     return this.ctx
        // }
        // set context(val)
        // {
        //     this.ctx = val;
        // }
        context: SiteMachine
    }
}
