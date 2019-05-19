type Pass = cc.renderer.renderEngine.renderer.Pass;
type Technique = cc.renderer.renderEngine.renderer.Technique;
type Effect = cc.renderer.renderEngine.renderer.Effect
const Pass = cc.renderer.renderEngine.renderer.Pass;
const Technique = cc.renderer.renderEngine.renderer.Technique;
const Effect = cc.renderer.renderEngine.renderer.Effect
const renderer = cc.renderer.renderEngine.renderer;
const Material = cc.renderer.renderEngine.Material
const gfx = cc.renderer.renderEngine.gfx;
export class ShaderMaterial extends Material {
    protected _pass: Pass
    protected _mainTech: Technique
    protected _effect: Effect
    protected _texture;
    protected _texIds;
    get effect(): Effect {
        return this._effect;
    }
    set effect(v) {
        this._effect = v;
    }

    protected _color = { r: 1.0, g: 1.0, b: 1.0, a: 1.0 };
    protected _passName:string;
    constructor(passName:string,vert?: string, frag?: string, defines?: any[]) {
        super(false);
        this._passName = passName;
        if(vert&&frag&&defines)
        cc.renderer._forward._programLib.define(passName,vert,frag,defines);
        this.__init();
    }
    __init()
    {
        this._pass = new Pass(this._passName);
        this._pass.setDepth(false, false);
        this._pass.setCullMode(gfx.CULL_NONE);
        this._pass.setBlend(
            gfx.BLEND_FUNC_ADD,
            gfx.BLEND_SRC_ALPHA,
            gfx.BLEND_ONE_MINUS_SRC_ALPHA,            
            gfx.BLEND_FUNC_ADD,
            gfx.BLEND_SRC_ALPHA,
            gfx.BLEND_ONE_MINUS_SRC_ALPHA
        );
        this._mainTech = new Technique(
            ['transparent'],
            [
                { name: 'texture', type: renderer.PARAM_TEXTURE_2D },
                { name: 'color', type: renderer.PARAM_COLOR4 },
            ]
            , [this._pass]);
        this._effect = new Effect(
            [this._mainTech],
            { 'color': this._color }
            , []
        );
    }

    get color() {
        return this._color;
    }
    set color(v) {
        this._color = v;
        this._effect.setProperty('color',v);
    }

    get texture() {
        return this._texture;
    }
    set texture(val) {
        if (this._texture !== val) {
            this._texture = val;
            this._effect.setProperty('texture', val.getImpl());
            this._texIds['texture'] = val.getId();
        }
    }
    clone() {
        var copy = new ShaderMaterial(this._passName);
        copy.color = this.color;
        copy.updateHash();
        return copy;
    }

}