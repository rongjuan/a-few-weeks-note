var express = require('express');
var app = express();
app.get('/',function (req, res) {
    res.send('欢迎来到首页');
});
app.get('/p',function (req, res) {
    console.log(req.host)
    console.log(req.path)
    console.log(req.query)
    res.send('欢迎来到首页');
});
app.listen(8080);