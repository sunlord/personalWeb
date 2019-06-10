var SHAKE_SPEED_THRESHOLD = 300;            //摇动速度阈值
var lastTime = 0; //上次变化的时间
var x = y = z = lastX = lastY = lastZ = 0;  //位置变量初始化
function motionHandler(evt) {
    //取得包含重力加速的位置信息
    var acceleration = evt.accelerationIncludingGravity;
    var curTime = Date.now();               //取得当前时间
    if ((curTime - lastTime) > 120) {       //判断
        var diffTime = curTime - lastTime;  //两次变化时间差
        lastTime = curTime;                 //保存此次变化的时间
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        //计算摇动的速度
        var speed = Math.abs(x + y + z - lastX - lastY - lastZ) /diffTime * 1000;
        if (speed > SHAKE_SPEED_THRESHOLD) {        //速度是否大于预设速度
            alert("你摇动了手机！");            
        }
        lastX = x;                          //保存此次变化的位置x
        lastY = y;                          //保存此次变化的位置y
        lastZ = z;                          //保存此次变化的位置z
    }
}

if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', motionHandler, false);
}else {
    alert('您的设备不支持摇动！');
}

alert("我日你哥！");