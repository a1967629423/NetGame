import { ShaderMaterial } from "./ShaderMaterial";
import InitMaterial from "./Tools/InitMaterial";

export module ShaderDec
{
    export type MaterialsSave = {
        MaterialName:string,
        MaterialConstructor:{new(...args):ShaderMaterial}
    };
    var InitConstructor:{new():InitMaterial} = null;
    
    export function Init<T extends InitMaterial>(target:{new():T})
    {
        InitConstructor = target;
    }
    export function Material<T extends ShaderMaterial>(name:string)
    {
        var _name = name;
        function InitMaterial(target:{new():T})
        {
            var ms:MaterialsSave[] =  InitConstructor.prototype['Materials'];
            if(!ms)
            {
                ms = [];
                InitConstructor.prototype['Materials'] = ms;
            }
            ms.push({MaterialName:_name,MaterialConstructor:target});
        }
        return function(target:{new():T})
        {
            if(!InitConstructor)
            {
                setTimeout(()=>{InitMaterial(target)});
            }
            else
            {
                InitMaterial(target);
            }
        }
    }
}