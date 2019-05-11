export module Score
{
    export enum ScoreType
    {
        normal,people
    }
    export class ScoreEvent
    {
        static SCORE_CHANGE = 'ScoreChange';
        static SCORE_ADD='ScoreAdd';
        static SCORE_SUB='ScoreSub';
    }
    export class ScoreManage extends cc.Component {
        private static _instance:{type:ScoreType,SM:ScoreManage}[] = [];
        static getInstance(type:ScoreType)
        {
            var ii = this._instance.find(value=>value.type===type);
            var result:ScoreManage = null;
            if(ii)
            {
                if(ii.SM)
                {
                    result = ii.SM;
                }
                else
                {
                    var node = new cc.Node('ScoreManage');
                    result=ii.SM=node.addComponent(ScoreManage);
                    result.stype = type;
                    node.setParent(cc.director.getScene());
                }
            }
            else
            {
                var node = new cc.Node('ScoreManage');
                result=node.addComponent(ScoreManage);
                node.setParent(cc.director.getScene());
                result.stype=type;
                this._instance.push({type:type,SM:result});
            }
            return result;
        }
        private scoreCache:number[]=[]
        nowScore:number = 0;
        stype:ScoreType = ScoreType.normal;
        addScore(score:number)
        {
            this.node.emit(ScoreEvent.SCORE_ADD,score);
            this.scoreCache.push(score);
        }
        subScore(score:number)
        {
            this.node.emit(ScoreEvent.SCORE_SUB,score);
            this.scoreCache.push(-score);
        }
        update()
        {
            if(this.scoreCache.length>0)
            {
                var Sum = 0;
                while(this.scoreCache.length)
                {
                    Sum+=this.scoreCache.pop()
                }
                if(Sum!==0)
                {
                    var newScore = this.nowScore+Sum;
                    this.node.emit(ScoreEvent.SCORE_CHANGE,newScore,this.nowScore);
                    this.nowScore = newScore;
                }
            }
        }
        onDestroy()
        {
            var mi=ScoreManage._instance.find(value=>value.type===this.stype);
            if(mi&&mi.SM)
            {
                mi.SM = null;
            }
        }
    }
    
}
