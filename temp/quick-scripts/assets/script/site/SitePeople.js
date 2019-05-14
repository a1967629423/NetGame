(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/site/SitePeople.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '883e2EN+4tN/403/C+p7P1P', 'SitePeople', __filename);
// script/site/SitePeople.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Enums_1 = require("../Enums");
var ScoreManage_1 = require("../manage/ScoreManage");
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
var SitePeople = /** @class */ (function (_super) {
    __extends(SitePeople, _super);
    function SitePeople() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        _this.peopleType = Enums_1.SiteType.rect;
        _this.sourceSite = null;
        return _this;
        // update (dt) {}
    }
    SitePeople.prototype.unuse = function () {
        ScoreManage_1.Score.ScoreManage.getInstance(ScoreManage_1.Score.ScoreType.people).addScore(1);
    };
    SitePeople.prototype.reuse = function () {
    };
    SitePeople.prototype.recycle = function (value) {
    };
    SitePeople.prototype.start = function () {
    };
    SitePeople.prototype.GetInVehicle = function (vehicle) {
        var dir = vehicle.rundir;
        var nowPath = vehicle.line;
        var hasOtherLineSite = [];
        while (nowPath) {
            var nowSite = dir ? nowPath.nextSite : nowPath.lastSite;
            if (nowSite !== this.sourceSite) {
                if (nowSite.SiteType === this.peopleType) {
                    return true;
                }
                else {
                    nowSite.SiteLines.forEach(function (P) {
                        if (!(P.mask & 13) && P.PathType !== nowPath.PathType) {
                            if (!hasOtherLineSite.some(function (v) { return v.PathType === P.PathType; })) {
                                hasOtherLineSite.push(P);
                            }
                        }
                    });
                }
            }
            nowPath = dir ? nowPath.NextPath : nowPath.LastPath;
        }
        //检测从其他线能否到达目的地
        for (var i in hasOtherLineSite) {
            for (var ndir = true, idx = 0; idx < 2; idx++, ndir = !ndir) {
                var P = hasOtherLineSite[i];
                while (P) {
                    var nowSite = ndir ? P.nextSite : P.lastSite;
                    if (nowSite.SiteType === this.peopleType && nowSite !== this.sourceSite) {
                        return true;
                    }
                    P = ndir ? P.NextPath : P.LastPath;
                }
            }
        }
        return false;
    };
    SitePeople.prototype.GetOffVehicle = function (vehicle) {
        var hasOtherLineSite = [];
        var nowSite = vehicle.nowSite;
        if (nowSite && nowSite !== this.sourceSite && nowSite.SiteType === this.peopleType) {
            return true;
        }
        nowSite.SiteLines.forEach(function (P) {
            if (!(P.mask & 13)) {
                if (!hasOtherLineSite.some(function (v) { return v.PathType === P.PathType; })) {
                    hasOtherLineSite.push(P);
                }
            }
        });
        //检测从其他线能否到达目的地
        for (var i in hasOtherLineSite) {
            for (var ndir = true, idx = 0; idx < 2; idx++, ndir = !ndir) {
                var P = hasOtherLineSite[i];
                while (P) {
                    var nowSite = ndir ? P.nextSite : P.lastSite;
                    if (nowSite.SiteType === this.peopleType && nowSite !== this.sourceSite) {
                        return true;
                    }
                    P = ndir ? P.NextPath : P.LastPath;
                }
            }
        }
        return false;
    };
    __decorate([
        property({ type: cc.Enum(Enums_1.SiteType) })
    ], SitePeople.prototype, "peopleType", void 0);
    SitePeople = __decorate([
        ccclass
    ], SitePeople);
    return SitePeople;
}(cc.Component));
exports.default = SitePeople;

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
        //# sourceMappingURL=SitePeople.js.map
        