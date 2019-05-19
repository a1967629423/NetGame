import { ShaderDec } from "../ShaderDec";
import { ShaderMaterial } from "../ShaderMaterial";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
@ShaderDec.Init
export default class InitMaterial extends cc.Component {
    Materials:ShaderDec.MaterialsSave[];
    @property
    MaterialName:string = ''
    nowMaterial:ShaderMaterial = null;
    onLoad()
    {
        var constructor = this.Materials.find(v=>v.MaterialName===this.MaterialName);
        this.nowMaterial = new constructor.MaterialConstructor(this.MaterialName);
    }
    start () {
        ShaderUtitly.setMaterial(this.node,this.nowMaterial);
    }

    // update (dt) {}
}
