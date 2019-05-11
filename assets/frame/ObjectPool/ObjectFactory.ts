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
    pop():T
    {
        var reuslt = super.pop();
        if(!reuslt)
        {
            reuslt = Object.create({});
            reuslt['__proto__']=this.csr.prototype;
            reuslt['__factory'] = this;
            this.csr.apply(reuslt,this.args);
        }
        return reuslt
    }
}
