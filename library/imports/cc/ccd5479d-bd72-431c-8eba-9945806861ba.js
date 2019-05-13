"use strict";
cc._RF.push(module, 'ccd54edvXJDHI66mUWAaGG6', 'GameObjectManange');
// script/manage/GameObjectManange.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PrefabFactory_1 = require("../../frame/PrefabFactory/PrefabFactory");
var Enums_1 = require("../Enums");
var SiteMachine_1 = require("../site/SiteMachine");
var VehicleMachine_1 = require("../vehicle/VehicleMachine");
var SitePeople_1 = require("../site/SitePeople");
var ScenesObject_1 = require("../../utility/ScenesObject");
var LineRender_1 = require("../render/LineRender");
var SiteRender_1 = require("../render/SiteRender");
var LineClearManage_1 = require("./LineClearManage");
var ObjectFactory_1 = require("../../frame/ObjectPool/ObjectFactory");
var PathSM_1 = require("../Path/PathSM");
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
var GameObjectManage = /** @class */ (function (_super) {
    __extends(GameObjectManage, _super);
    function GameObjectManage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vehicleCount = 3;
        _this.lineCount = 2;
        _this.saveLineType = [];
        _this.residueLineType = [];
        _this.GOCache = { Vehicle: false, Line: false, Site: false };
        _this.PathFactory = null;
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        _this.ScenesComponent = null;
        _this.LineRenderMachine = null;
        _this.SiteRenderMachine = null;
        return _this;
    }
    GameObjectManage_1 = GameObjectManage;
    Object.defineProperty(GameObjectManage, "Instance", {
        get: function () {
            if (!this._instance) {
                var ins = PrefabFactory_1.default.Instance;
                var node = new cc.Node('GameObjectManage');
                var manage = node.addComponent(GameObjectManage_1);
                var _keys = Object.keys(Enums_1.SiteLineType);
                var keys = [];
                _keys.forEach(function (value) { if (Number.parseFloat(value).toString() === 'NaN') {
                    keys.push(value);
                } });
                var count = keys.length - 1;
                manage.lineCount = count;
                for (var item = 0; item < count; item++) {
                    var type = Enums_1.SiteLineType[keys[item]];
                    manage.saveLineType.push(type);
                    manage.residueLineType.push(type);
                }
                this._instance = manage;
                cc.director.getScene().addChild(node);
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    GameObjectManage.prototype.getVehicle = function (nowProgress, line) {
        return __awaiter(this, void 0, void 0, function () {
            var config, vehicle, machine;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, PrefabFactory_1.default.LoadRes(PrefabFactory_1.default.prefabConfig)];
                    case 1:
                        config = _a.sent();
                        if (!(config && config.json.vehicle && this.vehicleCount > 0)) return [3 /*break*/, 3];
                        this.vehicleCount--;
                        return [4 /*yield*/, PrefabFactory_1.default.Instance.pop_path(config.json.vehicle.path)];
                    case 2:
                        vehicle = _a.sent();
                        if (!this.GOCache.Vehicle)
                            this.GOCache.Vehicle = true;
                        if (vehicle) {
                            debugger;
                            machine = vehicle.getComponent(VehicleMachine_1.Vehicle.VehicleMachine);
                            machine.nowProgress = nowProgress;
                            machine.line = line;
                            return [2 /*return*/, machine];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GameObjectManage.prototype.getLineType = function (type) {
        var idx = this.residueLineType.findIndex(function (value) { return value === type; });
        if (idx > -1) {
            this.lineCount--;
            this.residueLineType.splice(idx, 1);
        }
    };
    GameObjectManage.prototype.addLineType = function (type) {
        if (!this.saveLineType.findIndex(function (value) { return value === type; })) {
            this.lineCount++;
            this.residueLineType.push(type);
        }
    };
    GameObjectManage.prototype.getOperatorType = function (t, last, now, next) {
        //0未知 1 增加 2 修改(中间跨越多个需要清除0) 3删除
        var nowLine = now ? now.SiteLines.find(function (value) { return value.PathType === t; }) : null;
        var nextLine = next ? next.SiteLines.find(function (value) { return value.PathType === t; }) : null;
        //var lastLine = last?last.SiteLines.find(value=>value.LineType===t):null;
        if (nowLine) {
            if (nextLine) {
                if (nextLine.isBegin || nextLine.isEnd || nowLine.isBegin || nowLine.isEnd) {
                    return 3;
                }
            }
            else if (nowLine.isEnd || nowLine.isBegin) {
                return 1;
            }
            else {
                return 2;
            }
        }
        else if (!nextLine) {
            return 1;
        }
        else {
            return 0;
        }
    };
    GameObjectManage.prototype.CreateLine = function (nowSite, nextSite, type) {
        return __awaiter(this, void 0, void 0, function () {
            var line;
            return __generator(this, function (_a) {
                if (!this.PathFactory)
                    this.PathFactory = new ObjectFactory_1.default(true, PathSM_1.Path.VehiclePath);
                line = this.PathFactory.pop(nowSite, nextSite, type);
                if (line) {
                    nowSite.addLine(line);
                    nextSite.addLine(line);
                    return [2 /*return*/, line];
                }
                return [2 /*return*/, null];
            });
        });
    };
    GameObjectManage.prototype.getLine = function (type, lastSite, nowSite, endSite) {
        return __awaiter(this, void 0, Promise, function () {
            var operatorType, nSL, nextSl, LR, _a, newPath, vehiclesNode, vehicle;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        operatorType = this.getOperatorType(type, lastSite, nowSite, endSite);
                        this.getLineType(type);
                        nSL = nowSite.SiteLines.find(function (value) { return value.PathType === type && !(value.mask & 13); });
                        nextSl = endSite.SiteLines.find(function (value) { return value.PathType === type && !(value.mask & 13); });
                        LR = ScenesObject_1.default.instance.getComponentInChildren(LineRender_1.LineRender.LineRenderStateMachine);
                        _a = operatorType;
                        switch (_a) {
                            case 1: return [3 /*break*/, 1];
                            case 2: return [3 /*break*/, 5];
                            case 3: return [3 /*break*/, 7];
                            case 4: return [3 /*break*/, 8];
                        }
                        return [3 /*break*/, 9];
                    case 1: return [4 /*yield*/, this.CreateLine(nowSite, endSite, type)];
                    case 2:
                        newPath = _b.sent();
                        debugger;
                        if (!(newPath.isBegin && newPath.isEnd)) return [3 /*break*/, 4];
                        vehiclesNode = ScenesObject_1.default.instance.node.getChildByName('vehicles');
                        return [4 /*yield*/, this.getVehicle(0, newPath)];
                    case 3:
                        vehicle = _b.sent();
                        vehiclesNode.addChild(vehicle.node);
                        _b.label = 4;
                    case 4:
                        LR.updateRender();
                        return [3 /*break*/, 10];
                    case 5:
                        //修改
                        //连接原先两个点
                        //一次删两个
                        nSL.mask |= 11;
                        return [4 /*yield*/, this.CreateLine(nowSite, endSite, type)];
                    case 6:
                        nSL = _b.sent();
                        return [3 /*break*/, 10];
                    case 7:
                        nSL.mask |= 7;
                        LineClearManage_1.LineClear.LineClearManage.Instance.updateClear();
                        return [3 /*break*/, 10];
                    case 8: return [3 /*break*/, 10];
                    case 9: return [3 /*break*/, 10];
                    case 10: return [2 /*return*/, null];
                }
            });
        });
    };
    GameObjectManage.prototype.getSite = function (stype) {
        return __awaiter(this, void 0, void 0, function () {
            var config, sites, siteNode, site;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, PrefabFactory_1.default.LoadRes(PrefabFactory_1.default.prefabConfig)];
                    case 1:
                        config = _a.sent();
                        if (!(config && config.json.site)) return [3 /*break*/, 3];
                        sites = config.json.site;
                        return [4 /*yield*/, PrefabFactory_1.default.Instance.pop_path(sites[Enums_1.SiteType[stype]])];
                    case 2:
                        siteNode = _a.sent();
                        if (!this.GOCache.Site)
                            this.GOCache.Site = true;
                        site = siteNode.getComponent(SiteMachine_1.SiteSM.SiteMachine);
                        return [2 /*return*/, site];
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    GameObjectManage.prototype.getPeople = function (PeopleType, Site) {
        return __awaiter(this, void 0, Promise, function () {
            var config, peoples, people, sp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, PrefabFactory_1.default.LoadRes(PrefabFactory_1.default.prefabConfig)];
                    case 1:
                        config = _a.sent();
                        if (!(config && config.json.people)) return [3 /*break*/, 3];
                        peoples = config.json.people;
                        return [4 /*yield*/, PrefabFactory_1.default.Instance.pop_path(peoples[Enums_1.SiteType[PeopleType]])];
                    case 2:
                        people = _a.sent();
                        if (people) {
                            sp = people.getComponent(SitePeople_1.default);
                            sp.sourceSite = Site;
                            return [2 /*return*/, sp];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    GameObjectManage.prototype.start = function () {
        this.ScenesComponent = ScenesObject_1.default.instance;
        if (this.ScenesComponent) {
            this.LineRenderMachine = this.ScenesComponent.getComponentInChildren(LineRender_1.LineRender.LineRenderStateMachine);
            this.SiteRenderMachine = this.ScenesComponent.getComponentInChildren(SiteRender_1.SiteRender.SiteRenderStateMachine);
        }
    };
    // update (dt) {}
    GameObjectManage.prototype.onDestroy = function () {
        if (GameObjectManage_1._instance)
            GameObjectManage_1._instance = null;
    };
    var GameObjectManage_1;
    GameObjectManage._instance = null;
    GameObjectManage = GameObjectManage_1 = __decorate([
        ccclass
    ], GameObjectManage);
    return GameObjectManage;
}(cc.Component));
exports.default = GameObjectManage;

cc._RF.pop();