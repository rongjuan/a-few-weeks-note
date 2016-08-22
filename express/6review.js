var express = require('express');
var path = require('path');
var app = express();

app.set('view engine','html');//将模板改为Html但是html的模板是不存在的，需要自己设置引擎
//设置模板的存放目录，是一个绝对路径
app.set('views',path.join(__dirname,'views'));
app.engine('html',require('ejs').__express);//设置html的模板引擎，还是用ejs来设置的.....设置针对html后缀的渲染方法

app.use(function (req,res,next) {
    res.setHeader('Content-Type','text/html;charset=utf-8');
    res.locals.label = '珠峰培训';
    next();
});
app.get('/',function (req, res) {
    //render负责渲染模板，第一个参数是模板的相对路径
    res.render('homepage',{title:'主页'})
});
app.get('/user',function (req, res) {
    res.render('user',{title:'用户页',label:'珠峰用户'})
    //render里边有end 所有写了render之后就不用写end了
});

app.listen(9090);