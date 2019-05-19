let shader = {
    name: 'test',

    defines: [
    ],
    vert:
    `
uniform mat4 viewProj;
attribute vec3 a_position;
attribute vec2 a_uv0;
varying vec2 uv0;
float remain(float a,float b)
{
    return a-floor(a/b);
}
void main () {
vec4 pos = viewProj * vec4(a_position, 1);
gl_Position = pos;
uv0 = a_uv0;
}`,
frag:
    `
    uniform sampler2D texture;
    uniform vec4 color;
    varying vec2 uv0;
    void main () {
        float netFilterWidth = 0.01;
        float netFilterHeight = 0.01;
        vec4 _color = vec4(.0,.0,.0,.0);
        vec2 coords = vec2(.0,.0);
        coords.x = uv0.x-netFilterWidth;
        coords.y = uv0.y-netFilterHeight;
        for(int f=0;f<3;f++)
        {
            vec4 tap = texture2D(texture,coords);
            _color+=tap;
            coords.y+=netFilterHeight;
        }
        for(int i =0;i<3;i++)
        {
            vec4 tap = texture2D(texture,coords);
            _color+=tap;
            coords.x+=netFilterWidth;
        }
        _color= _color/6.0;
        vec4 c = texture2D(texture, uv0);
        c=vec4(1.0)-((vec4(1.0)-_color)*(vec4(1.0)-c));
        gl_FragColor = c; 
    }
`,

};

cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
    cc.renderer._forward._programLib.define(shader.name, shader.vert, shader.frag, shader.defines);
});

module.exports = shader;