var express = require('express');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var app = express();
//app.use(cookieParser());
app.use(function (req, res, next) {
    var cookie = req.header.cookie;
    req.cookies=querystring.parse(cookie,';');
    next();
})
app.get('/write',function (req, res) {
    res.cookie('name','zfpx',{path:'/read'});
    res.send('写入cookie')
});
app.get('/read',function (req, res) {
    var cookie = req.headers.cookie;
    res.send(cookie)
});

//统计此用户访问了多少次服务器
app.get('/visit',function (req, res) {
    var cookies = req.cookies;//将字符串转成对象是cookieParser的一个方法
    var visit = cookies.visit;
    if(visit){
       visit = parseInt(visit)+1;
    }else{
        visit=1;
    }
    res.cookie('visit',visit);
    res.send('这是你的第'+visit +'次访问');
});
app.listen(9090);