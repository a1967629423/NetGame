(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/manage/GameObjectManange.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ccd54edvXJDHI66mUWAaGG6', 'GameObjectManange', __filename);
// script/manage/GameObjectManange.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PrefabFactory_1 = require("../../frame/PrefabFactory/PrefabFactory");
var Enums_1 = require("../Enums");
var SiteMachine_1 = require("../site/SiteMachine");
var VehicleMachine_1 = require("../vehicle/VehicleMachine");
var SitePeople_1 = require("../site/SitePeople");
var SiteLine_1 = require("../site/SiteLine");
var ScenesObject_1 = require("../../utility/ScenesObject");
var LineRender_1 = require("../render/LineRender");
var SiteRender_1 = require("../render/SiteRender");
var LineClearManage_1 = require("./LineClearManage");
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
    GameObjectManage.prototype.getVehicle = function (nowSite, nowProgress, line) {
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
                            machine = vehicle.getComponent(VehicleMachine_1.Vehicle.VehicleMachine);
                            machine.nowSite = nowSite;
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
        var nowLine = now ? now.SiteLines.find(function (value) { return value.LineType === t; }) : null;
        var nextLine = next ? next.SiteLines.find(function (value) { return value.LineType === t; }) : null;
        //var lastLine = last?last.SiteLines.find(value=>value.LineType===t):null;
        if (nowLine) {
            if (nextLine) {
                if (nowLine.NextLine == nextLine) {
                    if (nextLine.isEnd || nowLine.isBegin) {
                        return 3;
                    }
                    else {
                        return 0;
                        //新加线
                    }
                }
                else if (nowLine.LastLine == nextLine) {
                    if (nowLine.isEnd || nextLine.isBegin) {
                        return 3;
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    return 2;
                }
            }
            else {
                if (nowLine.isEnd) {
                    return 1;
                }
                else if (nowLine.isBegin) {
                    return 4;
                }
                else {
                    return 2;
                }
            }
        }
        else {
            return 1;
        }
    };
    GameObjectManage.prototype.CreateLine = function (lineName, Site, type) {
        return __awaiter(this, void 0, void 0, function () {
            var line, Sl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, PrefabFactory_1.default.Instance.pop_path(lineName, type)];
                    case 1:
                        line = _a.sent();
                        if (line) {
                            Sl = line.getComponent(SiteLine_1.SLDSM.SiteLine);
                            if (Sl) {
                                Site.addLine(Sl);
                                Sl.LineType = type;
                                Sl.addSiteLines();
                            }
                            return [2 /*return*/, Sl];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    GameObjectManage.prototype.getLine = function (type, lastSite, nowSite, endSite) {
        return __awaiter(this, void 0, Promise, function () {
            var config, operatorType, lines, nSL, nextSl, lineName, linesnode, lastLine, nextLine, removeLine, render;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, PrefabFactory_1.default.LoadRes(PrefabFactory_1.default.prefabConfig)];
                    case 1:
                        config = _a.sent();
                        if (!(config && config.json.line)) return [3 /*break*/, 6];
                        operatorType = this.getOperatorType(type, lastSite, nowSite, endSite);
                        this.getLineType(type);
                        lines = config.json.line;
                        nSL = nowSite.SiteLines.find(function (value) { return value.LineType === type; });
                        nextSl = endSite.SiteLines.find(function (value) { return value.LineType === type; });
                        lineName = lines['baseline'];
                        if (!!nextSl) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.CreateLine(lineName, endSite, type)];
                    case 2:
                        nextSl = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!!nSL) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.CreateLine(lineName, nowSite, type)];
                    case 4:
                        nSL = _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!this.GOCache.Line)
                            this.GOCache.Line = true;
                        linesnode = ScenesObject_1.default.instance.node.getChildByName('lines');
                        switch (operatorType) {
                            case 1:
                                //增加
                                nSL.linkTo(nextSl);
                                if (!nSL.node.parent)
                                    linesnode.addChild(nSL.node);
                                linesnode.addChild(nextSl.node);
                                nSL.node.position = nowSite.node.position;
                                nSL.caculatePath();
                                break;
                            case 2:
                                //修改
                                //连接原先两个点
                                //一次删两个
                                nSL.ChangeFlag = true;
                                nSL.ClearFlag = true;
                                lastLine = nSL.LastLine;
                                nextLine = nSL.NextLine;
                                nSL = nextSl;
                                nSL.linkTo(nextLine);
                                lastLine.linkTo(nSL);
                                linesnode.addChild(nextSl.node);
                                nextSl.node.position = endSite.node.position;
                                lastLine.caculatePath();
                                nSL.caculatePath();
                                LineClearManage_1.LineClear.LineClearManage.Instance.updateClear();
                                break;
                            case 3:
                                debugger;
                                removeLine = null;
                                if (nSL.isEnd || nextSl.isBegin) {
                                    removeLine = nSL;
                                }
                                if (nSL.isBegin || nextSl.isEnd) {
                                    removeLine = nSL;
                                }
                                if (nSL.isEnd) {
                                    nSL.LastLine.HidenFlag = true;
                                }
                                removeLine.ClearFlag = true;
                                render = ScenesObject_1.default.instance.getComponentInChildren(LineRender_1.LineRender.LineRenderStateMachine);
                                if (render) {
                                    render.updateRender();
                                }
                                LineClearManage_1.LineClear.LineClearManage.Instance.updateClear();
                                break;
                            case 4:
                                nextSl.linkTo(nSL);
                                linesnode.addChild(nextSl.node);
                                nextSl.node.position = endSite.node.position;
                                nextSl.caculatePath();
                                break;
                            //删除
                            default:
                                break;
                        }
                        return [2 /*return*/, nSL];
                    case 6: return [2 /*return*/, null];
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
        //# sourceMappingURL=GameObjectManange.js.map
        