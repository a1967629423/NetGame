export interface IObpool
{
    unuse(value?);
    reuse(value?);
    recycle(value?);
}
export interface IOFPool<T> extends IObpool
{
    __factory?:ObjectPool<T>
}
export default class ObjectPool<T> {
    __pool:T[]=[]
    /**
     * false为弹出第一个true为弹出最后一个
     */
    dir:boolean = false
    /**
     * 
     * @param dir 弹出方向
     */
    constructor(dir:boolean = false)
    {
        this.dir=dir
    }
    UnuseCallback(v:any)
    {
        if(v['_poolisload'])
        {
            if(v['unuse'])v['unuse']();
        }
        else
        {
            v['_poolisload']=true;
        }
    }
    ReuseCallback(re:any,reuseValue:any[])
    {
        if(re&&re['reuse'])re['reuse'].apply(re,reuseValue);
    }
    public push(v:T)
    {
        if(v instanceof cc.Node)
        {
            var comps = v['_components'];
            for(var item in comps)
            {
                this.UnuseCallback(comps[item]) 
            }
            if(v['removeFromParent'])v['removeFromParent']();
        }
        else
        {
            this.UnuseCallback(v);
            if(v['node'])(<cc.Node>v['node']).removeFromParent();
        }
        this.__pool.push(v)
    }

    public pop(reuseValue:any[]=[]):T
    {
        if(this.__pool.length)
        {
            var re = this.dir?this.__pool.pop():this.__pool.shift()
            if(re instanceof cc.Node)
            {
                var comps = re['_components'];
                for(var item in comps)
                {
                    this.ReuseCallback(comps[item],reuseValue);
                }
            }
            else
            {
                this.ReuseCallback(re,reuseValue);
            }
            return re;
        }
        return null
    }
    public clear()
    {
        this.__pool.forEach(value=>{
            if(value['destroy'])value['destroy']();
        })
        this.__pool=[]
    }
}
