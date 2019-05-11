import { SiteLineSM, SiteSM } from "./SiteMachine";
import { MSM } from "../../frame/StateMachine/StateMachine";
import { MSMDsc } from "../../frame/StateMachine/StateDec";
import { SiteLineType, SiteLineShowState } from "../Enums";
import { IObpool } from "../../frame/ObjectPool/ObjectPool";
import { Vehicle } from "../vehicle/VehicleMachine";
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
const { mSyncFunc, mSyncAttachFunc } = MSMDsc
export module SLDSM {
    @MSMDsc.mStateMachine
    @ccclass
    export class SiteLine extends MSM.StateMachine {
        unuse() {
            super.unuse();
            this.NowSite = null;
            this.LastLine = null;
            this.NextLine = null;
            this.removeFromSitelines();
            this.ClearFlag = false;
            this.ChangeFlag = false;
        }
        reuse(LineType:SiteLineType) {
            super.reuse();
            //this.LineType = LineType;
            //this.addSiteLines();
            //this.addSiteLines()
            //this.addSiteLines();
        }
        linkTo(nextLine:SiteLine)
        {
            this.NextLine = nextLine;
            nextLine.LastLine = this;
        }
        recycle(newLine?:SiteLine) {
            this.emit('cleared');
        }
        line: SiteLineSM.SiteLineMachine = null
        static LineVehicles:{lineType:SiteLineType,Vehicles:Vehicle.VehicleMachine[]}[] =[] 
        get isShowNode():boolean
        {
            return !!this.node.parent;
        }
        /**
         * 用于保存所有的线
         */
        static SiteLines:{lineType:SiteLineType,lines:SiteLine[]}[] = []
        /**
         * 在线段池中查找指定类型的头端
         * @param lineType 需要查找的类型
         */
        static getBeginLine(lineType:SiteLineType):SiteLine
        {
            var siteline = this.SiteLines.find(value=>value.lineType===lineType);
            var nowLine = null;
            if(siteline&&siteline.lines&&siteline.lines.length>0)
            {
                nowLine = siteline.lines[0];
                while(!nowLine.isBegin)
                {
                    nowLine = nowLine.LastLine;
                }
            }
            return nowLine;
        }
        showState:SiteLineShowState = SiteLineShowState.show;
        onLoad() {
            this.Init();
        }
        addSiteLines()
        {
            var siteline = SiteLine.SiteLines.find(value=>value.lineType===this.LineType);
            if(siteline)
            {
                siteline.lines.push(this);
            }
            else
            {
                SiteLine.SiteLines.push({lineType:this.LineType,lines:[this]});
            }
        }
        removeFromSitelines()
        {
            var siteline = SiteLine.SiteLines.find(value=>value.lineType===this.LineType);
            if(siteline)
            {
                var idx = siteline.lines.findIndex(value=>value===this);
                if(idx>-1)
                siteline.lines.splice(idx,1);
            }
            
        }
        /**
         * 在这条线上注册载具
         * @param v 
         */
        registerVehicle(v:Vehicle.VehicleMachine)
        {
            var lvs = SiteLine.LineVehicles.find(value=>value.lineType===this.LineType)
            if(lvs)
            {
                var vs = lvs.Vehicles;
                if(!vs.find(value=>value===v))
                {
                    vs.push(v);
                }
            }
            else
            {
                SiteLine.LineVehicles.push({lineType:this.LineType,Vehicles:[v]});
            }
        }
        /**
         * 在这条线上注销载具
         * @param v 
         */
        unregisterVehicle(v:Vehicle.VehicleMachine)
        {
            var lvs = SiteLine.LineVehicles.find(value=>value.lineType===this.LineType)
            if(lvs)
            {
                var vs = lvs.Vehicles;
                var idx = vs.findIndex(value=>value===v)
                if(vs&&idx>-1)vs.splice(idx);

            }
        }
        private addVehicle(v:Vehicle.VehicleMachine)
        {
            if(v instanceof Vehicle.VehicleMachine)
            {
                this.vehicles.push(v);
            }
        }
        private removeVehicle(v:Vehicle.VehicleMachine)
        {
            if(v instanceof Vehicle.VehicleMachine)
            {
                var idx = this.vehicles.findIndex(value=>value===v);
                if(idx>-1)
                this.vehicles.splice(idx);
                if(this.vehicles.length===0)
                {
                    this.node.emit('vehicleClear');
                }
            }
        }
        
        start()
        {
            //this.caculatePath();
            super.start();
            this.node.on('isRun',this.addVehicle,this);
            this.node.on('runEnd',this.removeVehicle,this);
            this.InitFlag = true;
            
        }
        _ClearFlag:boolean = false;
        _ChangeFlag:boolean = false;
        mask:number = 0;
        get ClearFlag():boolean
        {
            return !!(this.mask&2);
        }
        set ClearFlag(val:boolean
            
            )
        {
            if(val)
            {
                this.mask = this.mask|3;
            }
            else
            {
                this.mask = this.mask&(~3);
            }
        }
        get ChangeFlag():boolean
        {
            return !!(this.mask&4);
        }
        set ChangeFlag(val:boolean)
        {
            if(val)
            {
                this.mask = this.mask|5
            }
            else
            {
                this.mask = this.mask&(~5);
            }
        }
        get HidenFlag():boolean
        {
            return !!(this.mask&1);
        }
        set HidenFlag(val:boolean)
        {
            this.mask = val?this.mask|1:this.mask&(~1);
        }
        vehicles:Vehicle.VehicleMachine[] = [];
        LastLine: SiteLine = null
        NowSite: SiteSM.SiteMachine = null
        _NextLine: SiteLine = null
        InitFlag:boolean = false;
        get NextLine()
        {
            return this._NextLine;
        }
        set NextLine(val)
        {
            this._NextLine = val;
        }
        getAllLength(dir:boolean)
        {
            return dir?this.allLength:this.LastLine?this.LastLine.allLength:0;
        }
        getChangPoint(dir:boolean)
        {
            return dir?this.changPoint:this.LastLine?this.LastLine.changPoint:[];
        }
        allLength: number = 0;
        changPoint: { length: number, point: cc.Vec2, Radian: number }[] = [];
        static SiteInfo: { key: SiteLineType, value: SiteLine[] }[] = []
        _LineType: SiteLineType = SiteLineType.red;
        get LineType(): SiteLineType {
            return this._LineType;
        }
        set LineType(val) {
            this._LineType = val;
        }
        get isEnd(): boolean {
            return !this.NextLine
        }
        get isBegin(): boolean {
            return !this.LastLine
        }
        get nowTypeVehicle():Vehicle.VehicleMachine[]
        {
            var lvs =SiteLine.LineVehicles.find(value=>value.lineType===this.LineType);
            return lvs?lvs.Vehicles:[];
        }
        caculatePath()
        {
            var n = this.NowSite;
            var e = this.NextLine.NowSite;
            var Line = this;
            var { x, y, allLength, firstRadian, lastRadian, rectDir, rectH, rectW } = DMath.pathCalcaulate(n.node.x, n.node.y, e.node.x, e.node.y)
            Line.allLength = allLength;
            Line.changPoint = []
            Line.changPoint.push({ length: rectDir ? rectW : rectH, point: cc.v2(x, y), Radian: firstRadian })
            Line.changPoint.push({ length: allLength, point: e.node.position, Radian: lastRadian });
            this.emit('caculated');
            //nextLine.changPoint = Line.changPoint;
            //nextLine.allLength = allLength;
        }
        onDisable()
        {
            super.onDisable();
            this.node.off('isRun',this.addVehicle,this);
            this.node.off('runEnd',this.removeVehicle,this);
        }
        private __np:cc.Vec2 = null;
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
            if(!this.__np)this.__np = cc.v2();
            lastp.lerp(cp.point, nprogress /nLenght,this.__np) //dir?lastp.lerp(cp.point,cl):cp.point.lerp(lastp,cl);
            return { position: this.__np, radian: cp.Radian + (dir ? 0 : Math.PI) };
            // return dir?this.NowSite.node.position.lerp(this.NextLine.NowSite.node.position,progress):this.NextLine.NowSite.node.position.lerp(this.NowSite.node.position,progress);
        }
        // update (dt) {}
    }
    export class SiteLineDisplayState extends MSM.State implements IObpool
    {
        unuse() {

        }
        reuse() {

        }
        recycle() {

        }
        context:SiteLine;
    }
}
/*
    _hitTest (point, listener) {
        let w = this._contentSize.width,
            h = this._contentSize.height,
            cameraPt = _vec2a,
            testPt = _vec2b;

        let camera = cc.Camera.findCamera(this);
        if (camera) {
            camera.getCameraToWorldPoint(point, cameraPt);
        }
        else {
            cameraPt.set(point);
        }

        this._updateWorldMatrix();
        math.mat4.invert(_mat4_temp, this._worldMatrix);
        math.vec2.transformMat4(testPt, cameraPt, _mat4_temp);
        testPt.x += this._anchorPoint.x * w;
        testPt.y += this._anchorPoint.y * h;

        if (testPt.x >= 0 && testPt.y >= 0 && testPt.x <= w && testPt.y <= h) {
            if (listener && listener.mask) {
                var mask = listener.mask;
                var parent = this;
                for (var i = 0; parent && i < mask.index; ++i, parent = parent.parent) {
                }
                // find mask parent, should hit test it
                if (parent === mask.node) {
                    var comp = parent.getComponent(cc.Mask);
                    return (comp && comp.enabledInHierarchy) ? comp._hitTest(cameraPt) : true;
                }
                // mask parent no longer exists
                else {
                    listener.mask = null;
                    return true;
                }
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    }
*/
