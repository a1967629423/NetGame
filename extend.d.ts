declare namespace cc
{
    export class EventListener{
        checkAvailable();
        clone();
        isSwallowTouches();
        onTouchBegan(touch,event)
        onTouchCancelled(touch,event);
        onTouchEnded(touch,event);
        onTouchMoved(touch,event);
        setSwallowTouches(needSwallow);
        swallowTouches:boolean;
        _claimedTouches
    }
    export class TouchOneByOne extends EventListener
    {
        mask:number
        owner:cc.Node
        _claimedTouches:[]
        _fixedPriority:number
        _isEnabled:boolean
        _listenerID:string
        _node:cc.Node
        _onEvent
        _paused:boolean
        _registered:boolean
        _target:cc.Node
        _type:number
    }
    export module renderer
    {
        export module _forward
        {
            export class _programLib
            {
                static define(name:string,vert:string,frag:string,defines:any[])
            }
        }
        export module renderEngine
        {
            export class Asset
            {
                reload();
                unload();
                constructor(persist);
            }
            export class Material extends Asset
            {
                constructor(persist);
                updateHash(value?)
                get hash():number;
                clone():Material;
            }
            export class SpriteMaterial extends Material
            {
                constructor(persist);
                get effect():renderer.Effect;
                set effect(v:renderer.Effect);
            }
            export class gfx
            {
                static BLEND_FUNC_ADD:number;
                static BLEND_SRC_ALPHA:number;
                static BLEND_ONE_MINUS_SRC_ALPHA:number;
                static CULL_NONE:number;
            }
            export module renderer
            {
                export const PARAM_TEXTURE_2D:number;
                export const PARAM_COLOR4:number;
                export const PARAM_FLOAT:number; 
                export class Effect
                {
                    clear();
                    define(name,value);
                    extractDefines(out);
                    getDefine(name);
                    getProperty(name:string);
                    setProperty(name:string,val)
                    getTechnique(stage);
                    constructor(techniques,properties,defines);
                }
                export class Technique
                {
                    constructor(v1:any[],v2:any[],v3:any[]);
                }
                export class Pass
                {
                    constructor(pass)
                    setDepth(v:boolean,v1:boolean);
                    setCullMode(v);
                    setBlend(...args)
                }
            }

        }
    }
}
declare module ShaderUtitly
{
    export function getMaterial(node:cc.Node):cc.renderer.renderEngine.Material;
    export function setMaterial(node:cc.Node,material:cc.renderer.rendererEngine.Material);
}
