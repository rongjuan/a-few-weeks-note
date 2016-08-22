//引入express,返回值是一个函数
var express=require('./express');
//调用此函数还会返回一个函数
var app =express();
//配置路由，当客户端以get方式，访问/路径的时候，返回一个homepage的字符串
app.get('/',function (req, res) {
    res.end('homepage');
});

app.get('/a',function (req, res) {
    res.end('a');
});
app.get('*',function (req, res) {
    res.end('404');
});
//启动一个http的web服务，监听9090端口
//app.listen(9090);
//app其实就是一个监听函数，就是当客户端连接上来的时候执行的回调函数
require('http').createServer(app).listen(9090);

/*var http = require('http');
var server = http.createServer(function (req, res) {

});
server.listen('8080');*/

