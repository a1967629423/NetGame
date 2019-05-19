(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Material/Sahder/test.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9f6a9Wwt+tGQrluIvSFVASX', 'test', __filename);
// Material/Sahder/test.js

'use strict';

var shader = {
    name: 'test',

    defines: [],
    vert: '\nuniform mat4 viewProj;\nattribute vec3 a_position;\nattribute vec2 a_uv0;\nvarying vec2 uv0;\nfloat remain(float a,float b)\n{\n    return a-floor(a/b);\n}\nvoid main () {\nvec4 pos = viewProj * vec4(a_position, 1);\ngl_Position = pos;\nuv0 = a_uv0;\n}',
    frag: '\n    uniform sampler2D texture;\n    uniform vec4 color;\n    varying vec2 uv0;\n    void main () {\n        float netFilterWidth = 0.01;\n        float netFilterHeight = 0.01;\n        vec4 _color = vec4(.0,.0,.0,.0);\n        vec2 coords = vec2(.0,.0);\n        coords.x = uv0.x-netFilterWidth;\n        coords.y = uv0.y-netFilterHeight;\n        for(int f=0;f<3;f++)\n        {\n            vec4 tap = texture2D(texture,coords);\n            _color+=tap;\n            coords.y+=netFilterHeight;\n        }\n        for(int i =0;i<3;i++)\n        {\n            vec4 tap = texture2D(texture,coords);\n            _color+=tap;\n            coords.x+=netFilterWidth;\n        }\n        _color= _color/6.0;\n        vec4 c = texture2D(texture, uv0);\n        c=vec4(1.0)-((vec4(1.0)-_color)*(vec4(1.0)-c));\n        gl_FragColor = c; \n    }\n'

};

cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
    cc.renderer._forward._programLib.define(shader.name, shader.vert, shader.frag, shader.defines);
});

module.exports = shader;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=test.js.map
        