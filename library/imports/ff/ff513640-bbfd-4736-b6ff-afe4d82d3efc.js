"use strict";
cc._RF.push(module, 'ff513ZAu/1HNrb/r+TYLT78', 'EventCenter');
// frame/EventCenter.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EventCenter = /** @class */ (function (_super) {
    __extends(EventCenter, _super);
    function EventCenter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EventCenter_1 = EventCenter;
    Object.defineProperty(EventCenter, "Instance", {
        get: function () {
            if (!this.Ins) {
                var insNode = new cc.Node();
                cc.game.addPersistRootNode(insNode);
                this.Ins = insNode.addComponent(EventCenter_1);
            }
            return this.Ins;
        },
        enumerable: true,
        configurable: true
    });
    var EventCenter_1;
    EventCenter.Ins = null;
    EventCenter = EventCenter_1 = __decorate([
        ccclass
    ], EventCenter);
    return EventCenter;
}(cc.Component));
exports.default = EventCenter;

cc._RF.pop();