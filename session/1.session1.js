var express = require('express');
var uuid = require('uuid');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());
/*
 * 要模拟session的实现
 * 写到文件系统中
 * */
//此对象记录着服务器所有的session
var SESSION_KEY = 'connect.sid';
app.get('/', function (req, res) {
    var cookies = req.cookies;
    var sessionId = cookies[SESSION_KEY];
    if (sessionId) {
        var sessions = getSessions()
        var sessionObj = sessions[sessionId];
        if (sessionObj) {
            sessionObj.balance -= 10;
            setSessions(sessions);
            res.send('欢迎再次光临，你的卡上余额为' + sessionObj.balance + '元')
        } else {
            genid();
        }
    } else {
        genid();
    }
    function getSessions() {
        var sessions = {};
        var exists = fs.existsSync('./sessions.json');
        if(exists){
            var content = fs.readFileSync('./sessions.json');
            if(content){
                sessions = JSON.parse(content);
            }
        }
        return sessions
    }
    function setSessions(sessions) {
        fs.writeFileSync('./sessions.json',JSON.stringify(sessions))
    }
    function genid() {
        var sessionId = uuid.v4();
        var sessions = getSessions();
        sessions[sessionId] = {balance: 100};
        setSessions(sessions);
        res.cookie(SESSION_KEY, sessionId);
        res.send('欢迎初次光临');
    }
});
app.listen(9090);

