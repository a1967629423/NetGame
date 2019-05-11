import { Score } from "../script/manage/ScoreManage";

const {ccclass, property} = cc._decorator;

@ccclass
export default class showScore extends cc.Component {

    @property(cc.Label)
    showlabel: cc.Label = null;

    @property
    showtext: string = '当前分数%d';

    @property({type:cc.Enum(Score.ScoreType)})
    showType:Score.ScoreType = Score.ScoreType.normal

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        Score.ScoreManage.getInstance(this.showType).node.on(Score.ScoreEvent.SCORE_CHANGE,newscore=>{
            this.showlabel.string = this.showtext.replace('%d',newscore);
        })
    }

    // update (dt) {}
}
