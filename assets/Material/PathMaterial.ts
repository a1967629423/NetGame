import { ShaderMaterial } from "./ShaderMaterial";
import { ShaderDec } from "./ShaderDec";
@ShaderDec.Material('Path')
export default class PathMaterial extends ShaderMaterial {
    constructor()
    {
        super('Path');
    }
}
