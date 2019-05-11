import { TimeMSM } from "../TimeManage";
import { MSMDsc } from "../../../frame/StateMachine/StateDec";
import { MSM } from "../../../frame/StateMachine/StateMachine";
import { SiteSM } from "../../site/SiteMachine";
import GameObjectManage from "../GameObjectManange";
import { SiteType } from "../../Enums";
const { mState, mDefaultState, mLinkTo } = MSMDsc
export module TimeManageStates {
    
    @mLinkTo('Pause', 'pause')
    @mDefaultState
    @mState('Default', TimeMSM.TimeManage)
    export class Default extends TimeMSM.TimeManageState {
        async generateSite() {
            //生成站点
            /** 
             * 1.范围不能太大，当前设置为(-1000,-1000,1000,1000)这样的矩形面积里面
             * 2.不能与其他站点重合 使用站点的静态缓存比对
            */
            var containFlag = true;
            while (containFlag) {
                containFlag = false
                var gx = Math.random() * 2000 - 1000;
                var gy = Math.random() * 2000 - 1000;
                var dw = 300;
                var dh = 300;
                var generateRect = cc.rect(gx, gy, dw, dh);
                var mrect = cc.rect()
                var machines = SiteSM.SiteMachine.SiteMachines;
                for (var i in machines) {
                    mrect.x = machines[i].node.x;
                    mrect.y = machines[i].node.y;
                    mrect.height = machines[i].node.height;
                    mrect.width = machines[i].node.width;
                    if (mrect.containsRect(generateRect)) {
                        containFlag = true;
                        break;
                    }
                }
                if(!containFlag)
                {
                    var keys = Object.keys(SiteType);
                    var typelen = keys.length
                    var sittype = Math.floor(Math.random()*typelen)
                    console.log(sittype)
                    var site = await GameObjectManage.Instance.getSite(sittype)
                    if(site)
                    {
                        site.node.setParent(this.context.SiteNode);
                        site.node.x =gx;
                        site.node.y = gy;
                    }
                }
            }

        }
        Start() {
            var steptime = this.context.steptime
            var node = this.context.node
            var context = this.context
            this.context.startCoroutine_Auto((function* () {
                while (true) {
                    node.emit('timeUpdate', context.nowTime)
                    yield new MSM.AwaitNextSecond(steptime)
                }
            })());
            this.context.startCoroutine_Auto((function* () {
                while (true) {
                    var dt = yield new MSM.AwaitNextUpdate();
                    if (context.nowTime < context.oneDayTime) {
                        context.nowTime += dt;
                    }
                    else {
                        context.nowTime = 0;
                    }
                }
            })());
            this.context.startCoroutine_Auto((function* (_this) {
                while (true) {
                    yield new MSM.AwaitNextSecond(50)
                    _this.generateSite();

                }
            })(this))
        }

        // update (dt) {}
    }
    
    @mLinkTo('Default', 'resume')
    @mState('Pause', TimeMSM.TimeManage)
    export class Pause extends TimeMSM.TimeManageState {

    }
}

