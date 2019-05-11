import EventCenter from "../frame/EventCenter";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class setToFullScene extends cc.Component {
    nowZoomRatio:number = 1
    setSize()
    {
        this.node.setContentSize(cc.winSize);
    }
    start () {
        if(!window.onresize)
        {
            window.onresize = ()=>{EventCenter.Instance.node.emit("resize")}
        }
        EventCenter.Instance.node.on('resize',this.setSize,this);
        this.setSize();
    }
    update()
    {
        var camera = cc.Camera.findCamera(this.node)
        if(camera&&camera.zoomRatio!==this.nowZoomRatio)
        {
            this.node.scale = 1/camera.zoomRatio
        }
    }
    onDestroy()
    {
        EventCenter.Instance.node.off('resize',this.setSize,this);
    }

    // update (dt) {}
}
