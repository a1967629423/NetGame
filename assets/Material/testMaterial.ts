import { ShaderMaterial } from "./ShaderMaterial";
import { ShaderDec } from "./ShaderDec";
@ShaderDec.Material('test')
export class testMaterial extends ShaderMaterial {
    constructor()
    {
        super('test');
    }
}