var express = require('./express');
//获取配置对象
var app = express();
//app其实就是一个监听函数,有请求(在地址栏里输入的地址)的时候就会执行，就是当客户端连接上来的时候执行的回调函数
//配置路由，看用的是get方法还是post方法,当用户访问的是这个路径的时候，执行后边的回调函数
//all 匹配所有的HTTP动词
app.get('/home',function (req, res) {
    res.end('get home');
});
app.all('/book',function (req, res) {
    res.end('book');
});

//启动一个http的web服务，监听9090端口
app.listen(3000);
//require('http').createServer(app).listen(3000);

/*
* 从上到下执行
* 执行get post all的时候也只是把路径跟方法放进数组里边
* app.listen是监听这个端口
* 只有当在地址栏里输入地址发起请求的时候才会执行app
*
* */




