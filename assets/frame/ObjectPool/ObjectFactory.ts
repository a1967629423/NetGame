import ObjectPool from "./ObjectPool";


export default class ObjectFactory<T> extends ObjectPool<T>  {
    private csr:{new (...args):T}=null
    args:any[] = []
    constructor(dir:boolean,csr:{new (...arg):T},...args)
    {
        super(dir);
        this.csr = csr;
        this.args = args;
    }
    pop(...v):T
    {
        var reuslt = super.pop(v);
        if(!reuslt)
        {
            reuslt = Object.create({});
            reuslt['__proto__']=this.csr.prototype;
            reuslt['__factory'] = this;
            this.csr.apply(reuslt,this.args);
            this.UnuseCallback(reuslt);
        }
        this.ReuseCallback(reuslt,v);
        return reuslt
    }
    static S_Push(val:any)
    {
        if(val['__factory'])
        {
            val['__factory'].push(val);
        }
    }
}
