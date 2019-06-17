var map = new AudioParamMap.Map('map', {
    center: [121.600000, 31.220000],            //地图中心点
    zoom: 10
});
map.plugin(["AMap.ToolBar"], function () {      //给地图增加工具条，控制地图的放大和缩小
    map.addControl(new AMap.ToolBar());         
})

AMap.Map(container, options);

var geoOptions = {
    enableHighAccuracy: true,                   //开启高精度(GPS)定位
    timeout: 30000,                             //设置接口超时时间为30s
    maximumAge: 1000                            //设置地理信息的最大缓存时间为1s
}
function getPosition(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            callback(position.coords);
        }, function (error) {
            switch (error.code) {
                case 0:
                    alert("尝试获取您的位置信息时发生错误：" + error.message);
                    break;
                case 1:
                    alert("用户拒绝了获取位置信息请求。");
                    break;
                case 2:
                    alert("浏览器无法获取您的位置信息。");
                    break;
                case 3:
                    alert("获取您位置信息超时。");
                    break;
            }
        },geoOptions);
    }
}

getPosition(function (coords) {
    coords = convert(coords.longitude, coords.latitude);        //转换地理坐标
    //依据坐标，生成高德地图点对象
    var startPoint = new AMap.LngLat(coords.longitude, coords.latitude);
    map.setCenter(startPoint);                                  //设置地图的中心点
    map.setZoom(16);
});

function start() {
    timmer = navigator.geolocation.watchPosition(function (position) {
        var coords = position.coords;
        if (coords.accuracy > 20) {                             //丢掉低精度的定位数据
            return;
        }
        coords = convert(coords.longitude, coords.latitude);    //转换坐标信息
        map.setCenter(new AMap.LngLat(coords.longitude, coords.latitude));
        lineArr.push([coords.longitude, coords.latitude]);
        renderTracer(getPath(lineArr));                         //调用方法在地图上画轨迹
    }, function (error) {
        console.log(error)
    }, geoOptions);                                             //该options和获取定位的接口一致
}