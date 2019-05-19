(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Enums.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '605b6d8iK1BCKrp8lQW6cm3', 'Enums', __filename);
// script/Enums.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SiteType;
(function (SiteType) {
    SiteType[SiteType["rect"] = 0] = "rect";
    SiteType[SiteType["triangle"] = 1] = "triangle";
    SiteType[SiteType["circle"] = 2] = "circle";
})(SiteType = exports.SiteType || (exports.SiteType = {}));
var SiteLineType;
(function (SiteLineType) {
    SiteLineType[SiteLineType["red"] = cc.Color.RED.toRGBValue()] = "red";
    SiteLineType[SiteLineType["blue"] = cc.Color.BLUE.toRGBValue()] = "blue";
    SiteLineType[SiteLineType["gree"] = cc.Color.GREEN.toRGBValue()] = "gree";
})(SiteLineType = exports.SiteLineType || (exports.SiteLineType = {}));
var InputType;
(function (InputType) {
    InputType[InputType["touch"] = 1] = "touch";
    InputType[InputType["mouse"] = 2] = "mouse";
    InputType[InputType["keyboard"] = 3] = "keyboard";
})(InputType = exports.InputType || (exports.InputType = {}));
var SiteLineShowState;
(function (SiteLineShowState) {
    SiteLineShowState[SiteLineShowState["show"] = 0] = "show";
    SiteLineShowState[SiteLineShowState["hide"] = 1] = "hide";
})(SiteLineShowState = exports.SiteLineShowState || (exports.SiteLineShowState = {}));
var color = cc.color();
/**
 * convert24bitColorToColor
 * @param rgbValue 24bit rgb
 */
function ConvertRGBToColor(rgbValue) {
    color.setB(rgbValue >> 16);
    color.setG((rgbValue >> 8) & 255);
    color.setR(rgbValue & 255);
    return color;
}
exports.ConvertRGBToColor = ConvertRGBToColor;

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
        //# sourceMappingURL=Enums.js.map
        