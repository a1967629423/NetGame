export enum SiteType
{
    rect=0,triangle=1,circle=2
}
export enum SiteLineType
{
    red=cc.Color.RED.toRGBValue(),blue=cc.Color.BLUE.toRGBValue(),gree=cc.Color.GREEN.toRGBValue()
}
export enum InputType
{
    touch=0,mouse=1,keyboard=2
}
export enum SiteLineShowState
{
    show,hide
}
var color = cc.color();
/**
 * convert24bitColorToColor
 * @param rgbValue 24bit rgb
 */
export function ConvertRGBToColor(rgbValue:number):cc.Color
{
    color.setB(rgbValue>>16);
    color.setG((rgbValue>>8)&255);
    color.setR(rgbValue&255);
    return color
}