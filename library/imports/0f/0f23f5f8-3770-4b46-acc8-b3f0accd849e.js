"use strict";
cc._RF.push(module, '0f23fX4N3BLRqzIs/CszYSe', 'setToRootNode');
// utility/setToRootNode.ts

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var setToRootNode = /** @class */ (function (_super) {
    __extends(setToRootNode, _super);
    function setToRootNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    setToRootNode.prototype.start = function () {
        cc.game.addPersistRootNode(this.node);
    };
    setToRootNode = __decorate([
        ccclass
    ], setToRootNode);
    return setToRootNode;
}(cc.Component));
exports.default = setToRootNode;

cc._RF.pop();