var express = require('./exp');
var app = express();
//申请
app.use('/money',function (req, res, next) {
    res.money =100;
    next();
});
app.use('/money',function (req, res, next) {
    res.money = res.money-10;
    next();
});
app.use('/money',function (req, res, next) {
    res.money = res.money-60;
    next();
});
app.get('/money',function (req, res) {
    res.end(''+res.money);
});
app.listen(9090);