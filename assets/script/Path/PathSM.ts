import { SiteSM } from "../site/SiteMachine";
import ObjectPool, { IObpool } from "../../frame/ObjectPool/ObjectPool";
import { SiteLineType } from "../Enums";
import { Vehicle } from "../vehicle/VehicleMachine";
/**
 * 载具路线类
 * 储存:所有线路，上一个以及下一个线路，处于线路上的载具，当前状态遮罩
 * 功能:获取此线路上的中间插值点
 */
export default class VehiclePath implements IObpool {
    /**
     * 当路线从对象池中取出之后会注册到此数组中
     */
    static allPath: VehiclePath[] = [];
    unuse(value?: any) {
        this.lastSite = null;
        this.nextSite = null;
        this.mask = 0;
        var idx = -1;
        this.allLength = 0;
        this.changePoint = [];
        if (VehiclePath.allPath.some((v, index) => {
            if (v === this) {
                idx = index;
                return true;
            }
        })) {
            VehiclePath.allPath.splice(idx);
        }
    }
    reuse(lastSite: SiteSM.SiteMachine, nextSite: SiteSM.SiteMachine, Type: SiteLineType) {
        this.lastSite = lastSite;
        this.nextSite = nextSite;
        this.PathType = Type;
        VehiclePath.allPath.push(this);
        this.caculatePath();
    }
    recycle(value?: any) {
        ObjectPool.GlobalPush(this);
    }
    
    lastSite: SiteSM.SiteMachine = null;
    nextSite: SiteSM.SiteMachine = null;
    /**
     * 1111
     * cdhb
     * c:changed
     * d:deleted
     * h:hided
     * b:blocked
     */
    mask: number = 0;
    /**线的类型 */
    PathType: SiteLineType = SiteLineType.red;
    /**线的总长度 */
    allLength: number = 0;
    /**中转点 */
    changePoint: { length: number, point: cc.Vec2, Radian: number }[] = [];
    /**载具集合 */
    vehicles: Vehicle.VehicleMachine[] = [];
    caculatePath() {
        cc.Vec2
        var n = this.lastSite;
        var e = this.nextSite;
        var Line = this;
        var { x, y, allLength, firstRadian, lastRadian, rectDir, rectH, rectW } = DMath.pathCalcaulate(n.node.x, n.node.y, e.node.x, e.node.y)
        Line.allLength = allLength;
        Line.changePoint = []
        Line.changePoint.push({ length: rectDir ? rectW : rectH, point: cc.v2(x, y), Radian: firstRadian })
        Line.changePoint.push({ length: allLength, point: e.node.position, Radian: lastRadian });
    }
    __np: cc.Vec2 = cc.v2();
    /**
     * 根据运行方向以及进度获取坐标，此坐标为站点集对象下的坐标
     * @param progress 当前的进度(前进的距离)
     * @param dir 运行的方向
     */
    getLocation(progress: number, dir: boolean = true): { position: cc.Vec2, radian: number } {
        var nLine = this;
        var narr = nLine.changePoint//dir?this.changPoint:this.rchangePoint
        var nprogress = dir ? progress : nLine.allLength - progress;
        var idx = narr.findIndex(value => value.length >= nprogress)
        var cp = narr[idx]
        var lastp = this.lastSite.node.position;
        var nLenght = cp.length;
        if (idx >= 1) {
            lastp = narr[idx - 1].point;
            nprogress -= narr[idx - 1].length
            nLenght -= narr[idx - 1].length
        }
        if (!this.__np) this.__np = cc.v2();
        lastp.lerp(cp.point, nprogress / nLenght, this.__np) //dir?lastp.lerp(cp.point,cl):cp.point.lerp(lastp,cl);
        return { position: this.__np, radian: cp.Radian + (dir ? 0 : Math.PI) };
    }
    /**
     * 当载具换线时需要注册
     * @param v 载具
     */
    addVehicle(v: Vehicle.VehicleMachine) {
        if (v instanceof Vehicle.VehicleMachine) {
            this.vehicles.push(v);
        }
    }
    /**
     * 当载具离开时需要注销
     * @param v 载具
     */
    removeVehicle(v: Vehicle.VehicleMachine) {
        if (v instanceof Vehicle.VehicleMachine) {
            var idx = this.vehicles.findIndex(value => value === v);
            if (idx > -1)
                this.vehicles.splice(idx);
        }
    }
}
