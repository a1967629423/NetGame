"use strict";
cc._RF.push(module, 'e4b1eef++5IJ4JxgUMxdmcb', 'ShaderMaterial');
// Material/ShaderMaterial.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Pass = cc.renderer.renderEngine.renderer.Pass;
var Technique = cc.renderer.renderEngine.renderer.Technique;
var Effect = cc.renderer.renderEngine.renderer.Effect;
var renderer = cc.renderer.renderEngine.renderer;
var Material = cc.renderer.renderEngine.Material;
var gfx = cc.renderer.renderEngine.gfx;
var ShaderMaterial = /** @class */ (function (_super) {
    __extends(ShaderMaterial, _super);
    function ShaderMaterial(passName, vert, frag, defines) {
        var _this = _super.call(this, false) || this;
        _this._color = { r: 1.0, g: 1.0, b: 1.0, a: 1.0 };
        _this._passName = passName;
        if (vert && frag && defines)
            cc.renderer._forward._programLib.define(passName, vert, frag, defines);
        _this.__init();
        return _this;
    }
    Object.defineProperty(ShaderMaterial.prototype, "effect", {
        get: function () {
            return this._effect;
        },
        set: function (v) {
            this._effect = v;
        },
        enumerable: true,
        configurable: true
    });
    ShaderMaterial.prototype.__init = function () {
        this._pass = new Pass(this._passName);
        this._pass.setDepth(false, false);
        this._pass.setCullMode(gfx.CULL_NONE);
        this._pass.setBlend(gfx.BLEND_FUNC_ADD, gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA, gfx.BLEND_FUNC_ADD, gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA);
        this._mainTech = new Technique(['transparent'], [
            { name: 'texture', type: renderer.PARAM_TEXTURE_2D },
            { name: 'color', type: renderer.PARAM_COLOR4 },
        ], [this._pass]);
        this._effect = new Effect([this._mainTech], { 'color': this._color }, []);
    };
    Object.defineProperty(ShaderMaterial.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (v) {
            this._color = v;
            this._effect.setProperty('color', v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderMaterial.prototype, "texture", {
        get: function () {
            return this._texture;
        },
        set: function (val) {
            if (this._texture !== val) {
                this._texture = val;
                this._effect.setProperty('texture', val.getImpl());
                this._texIds['texture'] = val.getId();
            }
        },
        enumerable: true,
        configurable: true
    });
    ShaderMaterial.prototype.clone = function () {
        var copy = new ShaderMaterial(this._passName);
        copy.color = this.color;
        copy.updateHash();
        return copy;
    };
    return ShaderMaterial;
}(Material));
exports.ShaderMaterial = ShaderMaterial;

cc._RF.pop();