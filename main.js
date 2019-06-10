//获取记录内容的文本域
var el = document.querySelector('#content');
//为文本域DOM节点添加blur事件
el.addEventListener('blur', function () {
    //获取文本域的内容
    var data = el.Value;
    //如果是离线状态， 就直接保存到服务器
    if (navigator.onLine) {
        saveOnline(data);
    }else {
        //如果是离线状态，则保存到本地
        localStorage.setItem('data', data);
    }
});
//监听上线事件
window.online = function () {
    //从本地存储获取数据
    var data = localStorage.getItem('data');
    if (!!data) {
        //如果数据存在，则保存到服务器
        saveOnline(data);
        //同时，清空本地的存储
        this.localStorage.removeItem('data');
    }
};
//保存内容的具体代码
function saveOnline(data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/savedata');
    xhr.send('data=' + data);
}
