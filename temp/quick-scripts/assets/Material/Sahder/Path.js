(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Material/Sahder/Path.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2ec80H0dL5JZLXM1Nosg2I/', 'Path', __filename);
// Material/Sahder/Path.js

'use strict';

var shader = {
    name: 'Path',

    defines: [],
    vert: '\nuniform mat4 viewProj;\nattribute vec3 a_position;\nattribute vec2 a_uv0;\nvarying vec2 uv0;\nfloat remain(float a,float b)\n{\n    return a-floor(a/b);\n}\nvoid main () {\nvec4 pos = viewProj * vec4(a_position, 1);\ngl_Position = pos;\nuv0 = a_uv0;\n}',
    frag: '\n    uniform sampler2D texture;\n    uniform vec4 color;\n    varying vec2 uv0;\n    void main () {\n        vec4 c = color;\n        vec2 ra = uv0;\n        ra.x*=96.0;\n        ra.y*=64.0;\n        c.a=0.0;\n        if(fract(ra.x)<0.1)\n        {\n            c.a=1.0;\n        }\n        if(fract(ra.y)<0.1)\n        {\n            c.a=1.0;\n        }\n        gl_FragColor = c; \n    }\n'

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
        //# sourceMappingURL=Path.js.map
        