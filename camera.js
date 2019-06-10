function getUserMedia(constraints, success, error) {
    if (navigator.mediaDevices.getUserMedia) {
        //最新的标准api
        navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
    }else if (navigator.webkitGetUserMedia) {
        //webkit浏览器
        navigator.webkitGetUserMedia(constrains, success, error);
    }else if (navigator.mozGetUserMedia) {
        //firefox浏览器
        navigator.mozGetUserMedia(constraints, success, error);
    }else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUSerMedia(constraints, success, error);
    }
}

var video = document.getElementByTd("video");
var canvas = docuemnt.getElementById("canvas");
var context = canvas.getContext("2d");

//成功的回调函数
function success(stream) {
    //兼容的webkit核心浏览器
    var CompatibleURL = window.URL || window.webkitURL
    //将视频流设置为video元素的源
    video.src = CompatibleURL.createObjectURL(stream);
    video.play();
}

//异常的回调函数
function error(error) {
    console.log('访问用户媒体设备失败：', error.name, error.message);
}

if (navigator.mediaDevices.getUserMedia || navigator.getUSerMedia ||
    navigator.webkitGEtUserMedia || navigator.mozGetUserMedia) {
        //调用用户媒体设备，访问摄像头
        getUserMedia({video : { width: 480, height: 320} }, success, error);
    } else {
        alert('您的浏览器不支持访问用户媒体设备！');
    }

    //绑定拍照按钮的单击事件
    document.getElementById("capture").addEve=ntListener("click", function () {
        context.frawImage(video, 0, 0, 480, 320); //将video画面在canvas上绘制出来
    });