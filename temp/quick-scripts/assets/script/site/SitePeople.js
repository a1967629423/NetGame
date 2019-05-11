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
        var nowLine = vehicle.line;
        var nextLine = dir ? nowLine.NextLine : nowLine.LastLine;
        var hastOtherLineSite = [];
        while (nextLine) {
            if (nextLine.NowSite.SiteType === this.peopleType && nextLine.NowSite !== this.sourceSite) {
                return true;
            }
            if (nextLine.NowSite.SiteLines.find(function (value) { return value.LineType != nowLine.LineType; })) {
                hastOtherLineSite.push(nextLine);
            }
            nextLine = dir ? nextLine.NextLine : nextLine.LastLine;
        }
        //到终点都没有
        for (var i in hastOtherLineSite) {
            var value = hastOtherLineSite[i];
            var next = value.NextLine;
            while (next) {
                if (next.NowSite.SiteType === this.peopleType && next.NowSite !== this.sourceSite) {
                    console.log('要去转车');
                    return true;
                }
                next = next.NextLine;
            }
            var last = value.LastLine;
            while (last) {
                if (last.NowSite.SiteType === this.peopleType && last.NowSite !== this.sourceSite) {
                    console.log('要去转车');
                    return true;
                }
                last = last.LastLine;
            }
        }
        return false;
    };
    SitePeople.prototype.GetOffVehicle = function (vehicle) {
        var dir = vehicle.rundir;
        var nowLine = vehicle.line;
        if (nowLine.NowSite.SiteType === this.peopleType)
            return true;
        var nextLine = dir ? nowLine.NextLine : nowLine.LastLine;
        var ni = 0;
        var oni = 0;
        var oli = 0;
        var mainHave = false;
        var otherHave = false;
        while (nextLine) {
            if (nextLine.NowSite.SiteType === this.peopleType && nextLine.NowSite != this.sourceSite) {
                mainHave = true;
                break;
            }
            ni++;
            nextLine = dir ? nextLine.NextLine : nextLine.LastLine;
        }
        for (var i in nowLine.NowSite.SiteLines) {
            var value = nowLine.NowSite.SiteLines[i];
            if (value.LineType !== nowLine.LineType) {
                var next = value.NextLine;
                while (next) {
                    if (next.NowSite.SiteType === this.peopleType) {
                        console.log('转车');
                        otherHave = true;
                        break;
                    }
                    oni++;
                    next = next.NextLine;
                }
                var last = value.LastLine;
                if (last) {
                    if (last.NowSite.SiteType === this.peopleType) {
                        console.log('转车');
                        otherHave = true;
                        break;
                    }
                    oli++;
                    last = last.LastLine;
                }
            }
        }
        if (mainHave && otherHave) {
            if (mainHave && (ni <= oni || ni <= oli)) {
                return false;
            }
            return true;
        }
        else {
            if (otherHave) {
                return true;
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
        