var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
console.log(bodyParser);
var app = express();
//设置模板引擎
app.set('view engine','html');
//设置模板存放的目录
app.set('views',path.resolve('views'));
//对于 html类型的模板，使用ejs渲染方法
app.engine('html',require('ejs').__express);
app.use(bodyParser.urlencoded());
app.get('/',function (req, res) {
    res.render('home')
});
app.get('/login',function (req, res) {
    res.render('login')
});
app.post('/login',function (req, res) {
    var user = req.body;


});
app.get('/user',function (req, res) {

});

app.listen(9090);