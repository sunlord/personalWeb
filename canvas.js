let PieChart = function (selector, options) {
    let canvas = "string" === typeof selector ? document.querySelector(selector) : null;
    if (canvas === null) return false;
    let defaultOptions = {
        radius: 200,                                       //饼图半径
        legendParms: {                                      //图例参数
            font: "24px Arial",                             //图例字体属性
            x: 30,                                          //图例x轴坐标
            y: 30,                                          //图例y轴坐标
            margin: 50,                                     //图例间距
            width: 40,                                      //图例宽度
            height: 24                                      //图例高度
        }
    }
    this.context = canvas.getContext("2d");                 //获取context环境
    this.width = canvas.getAttribute("width") || 300;
    this.height = canvas.getAttribute("height") || 300;
    this.options = Object.assign(defaultOptions, options);  //合并参数
};

PieChart.prototype.load = function (data) {
    data.forEach(item => this.count ? this.count += item.value : this.count = item.value);
    this.data = data;
    return this;                                            //实现链式调用
};

PieChart.prototype.render = function () {
    let _generateLegend = (item, index) => {                 //绘制图例方法
        this.context.fillRect(                              //绘制图例图标
            this.options.legendParms.x,
            this.options.legendParms.y + index * this.options.legendParms.margin,
            this.options.legendParms.width,
            this.options.legendParms.height
        );
        this.context.font = this.options.legendParms.font;
        this.context.fillText(                              //绘制图例文字
            item.title,
            this.options.legendParms.y + this.options.legendParms.margin,
            (index + 1) * this.options.legendParms.margin
        );
    };
    let temparc = 0;
    this.data.forEach((item, index) => {                    //遍历绘制饼图扇形区域
        item.color = `#${('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6)}`;
        this.context.beginPath();
        this.context.moveTo(this.width / 2, this.height / 2);
        let startarc = temparc, endarc = startarc + (item.values / this.count) * Math.PI * 2;
        this.context.arc(                                   //饼图弧形区域
            this.width / 2,                                 //圆中心点x坐标
            this.height / 2,                                //圆中心点y坐标
            this.options.radius,                            //饼图半径
            startarc,                                       //开始角度
            endarc,                                         //结束角度
            false                                           //逆时针
        );
        this.context.closePath();
        this.context.fillStyle = item.color;
        this.context.fill();                                //填充路径
        temparc = endarc;
        if (this.options.legend) {                          //是否需要绘制图例
            _generateLegend(item, index);
        }
    });
    return this;
};

const data = [
    {title: "沪江网校", value: 1024},
    {title: "沪江小D", value: 512},
    {title: "沪江学习", value: 256},
    {title: "开心词场", value: 920}
];
let pie = new PieChart(".pie-chart", {legend: true});
pie.load(data).render();
