var express = require('express');
//express 的session 中间件
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var MongoStore = require('connect-mongo')(session)
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);
app.use(session({
    secret: 'zfpx',//提供cookie加密的
    resave: true,//每次请求都重新保存session
    saveUninitialized: true,//保存未初始化的session
    store:new MongoStore({
        //指定mongodb数据库地址
        url:'mongodb://123.57.143.189/sessiontest'
    })
}));
//extended = true 用querystring把字符串转成对象  =false用bodyParser自带的转换函数转换
app.use(bodyParser.urlencoded({extended:true}));
//显示空白登录表单
app.get('/login', function (req, res) {
    res.render('login', {});
});
//以post方式提交表单
app.post('/login', function (req, res) {
    var user = req.body;
    if(user.username =='admin' && user.password == 'admin'){
        //req.session代表此客户端在服务器端对应的数据对象
        req.session.username = user.username;
        res.redirect('/user');
    }else{
        res.redirect('back')
    }
});
//用户主界面
app.get('/user', function (req, res) {
    res.render('user', {username:req.session.username});
});
app.listen(9090);




