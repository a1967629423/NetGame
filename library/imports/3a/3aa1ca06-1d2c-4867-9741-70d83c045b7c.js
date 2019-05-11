"use strict";
cc._RF.push(module, '3aa1coGHSxIZ5dBcNg8BFt8', 'bscManage');
// script/bscLine/bscManage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var LineType_1 = require("./LineType");
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
var bscManage = /** @class */ (function (_super) {
    __extends(bscManage, _super);
    function bscManage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.points = [];
        _this.count = 50;
        _this.px = [];
        _this.py = [];
        _this.path = [];
        _this.p = [];
        return _this;
    }
    bscManage.prototype.start = function () {
        this.print();
    };
    bscManage.prototype.print = function () {
        var _this = this;
        this.px = [];
        this.py = [];
        this.path = [];
        this.points.forEach(function (value) {
            if (value) {
                _this.px.push(value.node.position.x);
                _this.py.push(value.node.position.y);
            }
            else {
                _this.px.push(0);
                _this.py.push(0);
            }
        });
        if (this.points.length > 0 && this.points[0]) {
            var g = this.getComponent(cc.Graphics);
            g.clear();
            g.strokeColor = cc.Color.RED;
            g.moveTo(this.points[0].node.x, this.points[0].node.y);
            for (var i = 1; i < this.points.length; i++) {
                if (this.points[i]) {
                    if (this.points[i].type === LineType_1.ELineType.line) {
                        this.path.push(new cc.Vec2(this.points[i].node.x, this.points[i].node.y));
                    }
                    else {
                        for (var i = 1; i < this.count; i++) {
                            //g.lineTo(morebsr(i/this.count,this.px),morebsr(i/this.count,this.py))
                        }
                    }
                }
            }
            this.path.forEach(function (value) { g.lineTo(value.x, value.y); });
            g.stroke();
        }
    };
    bscManage.prototype.update = function () {
        if (this.points.length > 0) {
            if (this.points.length != this.px.length) {
                this.print();
            }
            else {
                for (var i = 0; i < this.points.length; i++) {
                    if (this.points[i]) {
                        if (this.points[i].node.x != this.px[i]) {
                            this.print();
                        }
                    }
                }
            }
        }
    };
    __decorate([
        property([LineType_1.default])
    ], bscManage.prototype, "points", void 0);
    __decorate([
        property
    ], bscManage.prototype, "count", void 0);
    bscManage = __decorate([
        ccclass,
        cc._decorator.executeInEditMode,
        cc._decorator.requireComponent(cc.Graphics)
    ], bscManage);
    return bscManage;
}(cc.Component));
exports.default = bscManage;

cc._RF.pop();