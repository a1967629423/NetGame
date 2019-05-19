(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/utility/PolygonEditor.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '91b3b3jc/5FN6qUKO2vRKXq', 'PolygonEditor', __filename);
// utility/PolygonEditor.ts

Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine_1 = require("../frame/StateMachine/StateMachine");
var StateDec_1 = require("../frame/StateMachine/StateDec");
var InputManage_1 = require("../frame/InputManage");
var Helper_1 = require("./Helper");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode, requireComponent = _a.requireComponent;
var PolygonEditor = /** @class */ (function (_super) {
    __extends(PolygonEditor, _super);
    function PolygonEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.editor = false;
        _this._display = false;
        _this.points = [];
        _this.childerHandle = [];
        return _this;
    }
    Object.defineProperty(PolygonEditor.prototype, "display", {
        get: function () {
            return this._display;
        },
        set: function (v) {
            this._display = v;
            if (v) {
                this.displayInit();
            }
            else {
                this.dropGraphics();
            }
        },
        enumerable: true,
        configurable: true
    });
    PolygonEditor.prototype.displayInit = function () {
        var node = new cc.Node("DisplayGraphics");
        this.g = node.addComponent(cc.Graphics);
        node.setParent(this.node);
    };
    PolygonEditor.prototype.dropGraphics = function () {
        this.g.node.removeFromParent();
        this.g = null;
    };
    PolygonEditor.prototype.start = function () {
        var _this = this;
        if (CC_EDITOR) {
            _super.prototype.start.call(this);
            if (this._display) {
                this.displayInit();
            }
        }
        else {
            //this.node.children.forEach(v=>{if(v.name==='DisplayGraphics')v.removeFromParent()})
            var ins = InputManage_1.IPSM.InputManage.getInstance(this);
            ins.onHitTest(function (p) {
                var testPoint = _this.node.convertToNodeSpaceAR(InputManage_1.IPSM.ConvertInputPointToWorld(p, _this.node));
                return Helper_1.Helper.HitTestHelper.RayPolygonHitTest(_this.points, testPoint);
            }, this);
        }
    };
    PolygonEditor.prototype.update = function (dt) {
        var _this = this;
        _super.prototype.update.call(this, dt);
        if (CC_EDITOR && this._display) {
            this.g.clear();
            this.points.forEach(function (v, idx) {
                if (idx === 0) {
                    _this.g.moveTo(v.x, v.y);
                    return;
                }
                _this.g.lineTo(v.x, v.y);
            });
            if (this.points.length > 2)
                this.g.close();
            this.g.stroke();
            this.g.fill();
        }
    };
    __decorate([
        property
    ], PolygonEditor.prototype, "editor", void 0);
    __decorate([
        property
    ], PolygonEditor.prototype, "display", null);
    __decorate([
        property([cc.Vec2])
    ], PolygonEditor.prototype, "points", void 0);
    PolygonEditor = __decorate([
        ccclass,
        executeInEditMode,
        StateDec_1.MSMDsc.mStateMachine
    ], PolygonEditor);
    return PolygonEditor;
}(StateMachine_1.MSM.StateMachine));
exports.default = PolygonEditor;
var PolyGonEditorStates;
(function (PolyGonEditorStates) {
    var PS = /** @class */ (function (_super) {
        __extends(PS, _super);
        function PS() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PS;
    }(StateMachine_1.MSM.State));
    PolyGonEditorStates.PS = PS;
    var Default = /** @class */ (function (_super) {
        __extends(Default, _super);
        function Default() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Default.prototype.update = function () {
            if (this.context.editor) {
                this.context.emit('editor');
            }
        };
        Default = __decorate([
            StateDec_1.MSMDsc.mLinkTo('Editor', 'editor'),
            StateDec_1.MSMDsc.mDefaultState,
            StateDec_1.MSMDsc.mState('Default', PolygonEditor)
        ], Default);
        return Default;
    }(PS));
    PolyGonEditorStates.Default = Default;
    var Editor = /** @class */ (function (_super) {
        __extends(Editor, _super);
        function Editor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Editor.prototype.update = function () {
            if (this.context.points.length === this.context.childerHandle.length) {
                for (var idx in this.context.points) {
                    var p = this.context.points[idx];
                    var h = this.context.childerHandle[idx];
                    p.set(h.position);
                }
            }
            else {
                this.childerUpdate();
            }
            if (!this.context.editor) {
                this.context.emit('editorEnd');
            }
        };
        Editor.prototype.childerUpdate = function () {
            var _this = this;
            console.log('update');
            this.context.childerHandle.forEach(function (v) {
                v.removeFromParent();
            });
            this.context.childerHandle = [];
            this.context.points.forEach(function (v, idx) {
                var node = new cc.Node('handle.' + idx);
                _this.context.childerHandle.push(node);
                node.setParent(_this.context.node);
                node.setPosition(v);
            });
        };
        Editor.prototype.Start = function () {
            if (this.context.childerHandle.length === 0) {
                this.childerUpdate();
            }
        };
        Editor.prototype.Quit = function () {
            this.context.childerHandle.forEach(function (v) {
                v.removeFromParent();
            });
            this.context.childerHandle = [];
        };
        Editor = __decorate([
            StateDec_1.MSMDsc.mLinkTo('Default', 'editorEnd'),
            StateDec_1.MSMDsc.mState('Editor', PolygonEditor)
        ], Editor);
        return Editor;
    }(PS));
    PolyGonEditorStates.Editor = Editor;
})(PolyGonEditorStates = exports.PolyGonEditorStates || (exports.PolyGonEditorStates = {}));

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
        //# sourceMappingURL=PolygonEditor.js.map
        