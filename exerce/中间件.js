var express = require('express');
var app = express();
//计算一个处理请求一共花了多长时间
/*
*
* */
app.use(function (req, res, next) {
    res.startTime = Date.now();
    var end = res.end;
    res.end=function () {
        end.apply(res,Array.prototype.slice.call(arguments));
        console.log('timeCast',Date.now()-res.startTime);

    };

    next();
})
app.use('/money',function (req, res,next) {
    res.money = 100;

    next()
});
app.use('/money',function (req, res,next) {
    res.money = res.money -10;
    next();
});
app.use('/home',function (req, res,next) {
    res.money = res.money -30;
    res.end(''+res.money);
});
app.use('/money',function (req, res,next) {
    res.money = res.money -60;
    next()
});
app.get('/money',function (req, res) {
    res.end(''+res.money);
});
app.listen(8080);


