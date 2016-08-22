var express = require('express');
var uuid = require('uuid');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());
/*
 * 要模拟session的实现
 * */
//此对象记录着服务器所有的session
var sessions = {};
var SESSION_KEY = 'connect.sid';
app.get('/', function (req, res) {
    var cookies = req.cookies;
    //取得此客户的sessionid
    var sessionId = cookies[SESSION_KEY];
    if (sessionId) {
        var sessionObj = sessions[sessionId];
        if (sessionObj) {
            sessionObj.balance -= 10;
            res.send('欢迎再次光临，你的卡上余额为' + sessionObj.balance + '元')
        } else {
            genid();
        }
    } else {
        genid();
    }
    function genid() {
        //生成一个永远不会重复的字符串来做为此客户端的会话唯一标识
        var sessionId = uuid.v4();
        //在服务器端开辟的内存空间里记录卡号对应的对象信息
        sessions[sessionId] = {balance: 100};
        res.cookie(SESSION_KEY, sessionId);
        res.send('欢迎初次光临');
    }

});
app.listen(9090);

