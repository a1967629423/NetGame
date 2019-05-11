function factorial(num){
    if (num <=1) {
        return 1;
    } else {
        return num * factorial(num-1)
    } 
}
window.morebsr=function(t, arg) {
	var len = arg.length;
    var result = 0;
    for(var i =0;i<len;i++)
    {
		result+=factorial(len-1)/(factorial(i)*factorial(len-1-i))*arg[i]*Math.pow(t,i)*Math.pow(1-t,len-1-i)
    }
return result
}
var DMath={
    pathCalcaulate(bx,by,ex,ey)
    {
        var dirx = ex-bx>=0;
        var diry = ey-by>=0
        var Z_l = Math.abs(ex-bx);
        var Z_h = Math.abs(ey-by);
        var triangleWH=0;
        var traingleHypotenuse=0;
        var rectW = 0;
        var rectH = 0;
        var firstRadian = 0;
        var lastRadian = 0;
        var rectDir =Z_l>Z_h
        if(rectDir)
        {
            triangleWH = Z_h;
            rectW = Z_l-Z_h;
            if(dirx)
            {
                firstRadian = Math.PI/2;
            }
            else
            {
                firstRadian = -Math.PI/2;

            }
        }
        else
        {
            triangleWH = Z_l;
            rectH = Z_h-Z_l;
            if(diry)
            {
                firstRadian = 0
            }
            else
            {
                firstRadian = Math.PI;
            }
        }
        lastRadian = (dirx?Math.PI*(1/4):Math.PI*(7/4))+(diry?0:Math.PI/2);
        traingleHypotenuse = triangleWH*Math.SQRT2;
        var resultPoint={x:bx,y:by,allLength:rectW+rectH+traingleHypotenuse,firstRadian:firstRadian,lastRadian:lastRadian,rectDir:rectDir,rectH:rectH,rectW:rectW,Hypotenuse:traingleHypotenuse};
        resultPoint.x+=dirx?rectW:-rectW;
        resultPoint.y+=diry?rectH:-rectH;
        return resultPoint;
    },
    radianToAngle(r)
    {
       // return Math.atan2(Math.sin(r),Math.cos(r))/Math.PI*180;
       var a = r/Math.PI*180%360;
       return a;
    }
    ,
    morebsr(t, arg) {
        var len = arg.length;
        var result = 0;
        for(var i =0;i<len;i++)
        {
            result+=factorial(len-1)/(factorial(i)*factorial(len-1-i))*arg[i]*Math.pow(t,i)*Math.pow(1-t,len-1-i)
        }
    return result
    },
}
window.DMath = DMath;