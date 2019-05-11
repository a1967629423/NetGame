(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/manage/LineClearManage.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '70696IwaR9GI48Y5esbeZyH', 'LineClearManage', __filename);
// script/manage/LineClearManage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine_1 = require("../../frame/StateMachine/StateMachine");
var StateDec_1 = require("../../frame/StateMachine/StateDec");
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
var LineClear;
(function (LineClear) {
    var LineClearManage = /** @class */ (function (_super) {
        __extends(LineClearManage, _super);
        function LineClearManage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LineClearManage_1 = LineClearManage;
        Object.defineProperty(LineClearManage, "Instance", {
            get: function () {
                this.InitInstance();
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        LineClearManage.InitInstance = function () {
            if (!this._instance) {
                var node = new cc.Node('LineClearManage');
                this._instance = node.addComponent(LineClearManage_1);
                cc.director.getScene().addChild(node);
            }
            return this._instance;
        };
        LineClearManage.prototype.onLoad = function () {
            this.Init();
        };
        LineClearManage.prototype.start = function () {
            _super.prototype.start.call(this);
        };
        LineClearManage.prototype.updateClear = function () {
            this.emit('clear');
        };
        LineClearManage.prototype.onDestroy = function () {
            if (LineClearManage_1._instance)
                LineClearManage_1._instance = null;
        };
        var LineClearManage_1;
        LineClearManage._instance = null;
        LineClearManage = LineClearManage_1 = __decorate([
            ccclass,
            StateDec_1.MSMDsc.mStateMachine
        ], LineClearManage);
        return LineClearManage;
    }(StateMachine_1.MSM.StateMachine));
    LineClear.LineClearManage = LineClearManage;
    var LineClearState = /** @class */ (function (_super) {
        __extends(LineClearState, _super);
        function LineClearState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return LineClearState;
    }(StateMachine_1.MSM.State));
    LineClear.LineClearState = LineClearState;
})(LineClear = exports.LineClear || (exports.LineClear = {}));

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
        //# sourceMappingURL=LineClearManage.js.map
        