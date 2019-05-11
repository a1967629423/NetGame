(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/bscLine/LineType.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a30eeSSumlO9I5PTLDca2M3', 'LineType', __filename);
// script/bscLine/LineType.ts

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
var ELineType;
(function (ELineType) {
    ELineType[ELineType["bsc"] = 0] = "bsc";
    ELineType[ELineType["line"] = 1] = "line";
})(ELineType = exports.ELineType || (exports.ELineType = {}));
var LineType = /** @class */ (function (_super) {
    __extends(LineType, _super);
    function LineType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._type = ELineType.line;
        _this.handles = [];
        return _this;
    }
    Object.defineProperty(LineType.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (val) {
            this._type = val;
            this.typeSet();
        },
        enumerable: true,
        configurable: true
    });
    LineType.prototype.typeSet = function () {
        if (this.type === ELineType.bsc && this.handles) {
            var node1 = new cc.Node('handleR');
            var node2 = new cc.Node('handleL');
            node1.setParent(this.node);
            node2.setParent(this.node);
            node1.position = node1.position.sub(cc.v2(10));
            node2.position = node2.position.add(cc.v2(10));
            this.handles.push(node1, node2);
        }
        else if (this.type === ELineType.line) {
            this.handles.forEach(function (value) { value.destroy(); });
            this.handles = [];
        }
    };
    __decorate([
        property({ type: cc.Enum(ELineType) })
    ], LineType.prototype, "type", null);
    __decorate([
        property([cc.Node])
    ], LineType.prototype, "handles", void 0);
    LineType = __decorate([
        ccclass
    ], LineType);
    return LineType;
}(cc.Component));
exports.default = LineType;

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
        //# sourceMappingURL=LineType.js.map
        