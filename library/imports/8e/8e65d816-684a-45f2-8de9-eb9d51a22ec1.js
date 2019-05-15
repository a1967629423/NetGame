"use strict";
cc._RF.push(module, '8e65dgWaEpF8o3p651Roi7B', 'vehicleButton');
// script/UI/vehicleButton.ts

Object.defineProperty(exports, "__esModule", { value: true });
var InputManage_1 = require("../../frame/InputManage");
var LineRender_1 = require("../render/LineRender");
var ScenesObject_1 = require("../../utility/ScenesObject");
var GameObjectManange_1 = require("../manage/GameObjectManange");
var SiteMachine_1 = require("../site/SiteMachine");
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
var VehicleButton = /** @class */ (function (_super) {
    __extends(VehicleButton, _super);
    function VehicleButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.lineRender = null;
        _this.text = 'hello';
        return _this;
        // update (dt) {}
    }
    VehicleButton.prototype.touch = function (touchEvent) {
    };
    VehicleButton.prototype.touchStart = function (touchEvent) {
    };
    VehicleButton.prototype.touchEnd = function (touchEvent) {
        return __awaiter(this, void 0, void 0, function () {
            var site, lien, vechicle, vehicles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.lineRender.HitTest(touchEvent.getLocation(), null)) return [3 /*break*/, 2];
                        site = ScenesObject_1.default.instance.getComponentInChildren(SiteMachine_1.SiteSM.SiteMachine);
                        lien = site.SiteLines[0];
                        return [4 /*yield*/, GameObjectManange_1.default.Instance.getVehicle(0, lien)];
                    case 1:
                        vechicle = _a.sent();
                        if (vechicle) {
                            vehicles = ScenesObject_1.default.instance.node.getChildByName('vehicles');
                            vehicles.addChild(vechicle.node);
                            lien.addVehicle(vechicle);
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    VehicleButton.prototype.touchCancel = function (touchEvent) {
        return __awaiter(this, void 0, void 0, function () {
            var site, lien, vechicle, vehicles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.lineRender.HitTest(touchEvent.getLocation(), null)) return [3 /*break*/, 2];
                        site = ScenesObject_1.default.instance.getComponentInChildren(SiteMachine_1.SiteSM.SiteMachine);
                        lien = site.SiteLines[0];
                        return [4 /*yield*/, GameObjectManange_1.default.Instance.getVehicle(0, lien)];
                    case 1:
                        vechicle = _a.sent();
                        if (vechicle) {
                            vehicles = ScenesObject_1.default.instance.node.getChildByName('vehicles');
                            vehicles.addChild(vechicle.node);
                            lien.addVehicle(vechicle);
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    VehicleButton.prototype.start = function () {
        this.lineRender = ScenesObject_1.default.instance.getComponentInChildren(LineRender_1.LineRender.LineRenderStateMachine);
        var input = InputManage_1.IPSM.InputManage.getInstance(this);
        input.addInput(this);
    };
    __decorate([
        property(cc.Label)
    ], VehicleButton.prototype, "label", void 0);
    __decorate([
        property(LineRender_1.LineRender.LineRenderStateMachine)
    ], VehicleButton.prototype, "lineRender", void 0);
    __decorate([
        property
    ], VehicleButton.prototype, "text", void 0);
    VehicleButton = __decorate([
        ccclass
    ], VehicleButton);
    return VehicleButton;
}(cc.Component));
exports.default = VehicleButton;

cc._RF.pop();