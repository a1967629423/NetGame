"use strict";
cc._RF.push(module, '96260TqXTNKmJuCplbmvpol', 'setZindex');
// script/setZindex.ts

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
var setZindex = /** @class */ (function (_super) {
    __extends(setZindex, _super);
    function setZindex() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._zidx = 0;
        _this.zIndex = 0;
        return _this;
        // update (dt) {}
    }
    setZindex.prototype.setidx = function () {
        this.node.zIndex = this.zIndex;
    };
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    setZindex.prototype.start = function () {
        console.log(this._zidx);
        this.setidx();
    };
    __decorate([
        property
    ], setZindex.prototype, "zIndex", void 0);
    setZindex = __decorate([
        ccclass
    ], setZindex);
    return setZindex;
}(cc.Component));
exports.default = setZindex;

cc._RF.pop();