var express=require('./express');
var app =express();
app.all('/user',function (req, res) {
    res.end('user');
});
//不管方法名是什么，只要路径名是/user就返回user
app.all('/user',function (req, res) {
    res.end('post user');
});
app.all('/user',function (req, res) {
    res.end('delete user');
});
require('http').createServer(app).listen(9090);