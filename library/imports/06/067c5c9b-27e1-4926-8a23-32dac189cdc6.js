"use strict";
cc._RF.push(module, '067c5ybJ+FJJoojMtrBic3G', 'setToFullScene');
// utility/setToFullScene.ts

Object.defineProperty(exports, "__esModule", { value: true });
var EventCenter_1 = require("../frame/EventCenter");
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var setToFullScene = /** @class */ (function (_super) {
    __extends(setToFullScene, _super);
    function setToFullScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nowZoomRatio = 1;
        return _this;
        // update (dt) {}
    }
    setToFullScene.prototype.setSize = function () {
        this.node.setContentSize(cc.winSize);
    };
    setToFullScene.prototype.start = function () {
        if (!window.onresize) {
            window.onresize = function () { EventCenter_1.default.Instance.node.emit("resize"); };
        }
        EventCenter_1.default.Instance.node.on('resize', this.setSize, this);
        this.setSize();
    };
    setToFullScene.prototype.update = function () {
        var camera = cc.Camera.findCamera(this.node);
        if (camera && camera.zoomRatio !== this.nowZoomRatio) {
            this.node.scale = 1 / camera.zoomRatio;
        }
    };
    setToFullScene.prototype.onDestroy = function () {
        EventCenter_1.default.Instance.node.off('resize', this.setSize, this);
    };
    setToFullScene = __decorate([
        ccclass
    ], setToFullScene);
    return setToFullScene;
}(cc.Component));
exports.default = setToFullScene;

cc._RF.pop();