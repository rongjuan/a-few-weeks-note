var express = require('./express');
var app = express();
//实现报销功能
/*
* 昨天加班，要报销昨天晚上的餐费
* /money 10000 报销10000
* 特点：
* 1、在整个处理过程中，请求和响应始终是同一个对象
* 2、上一个中间件的的处理结果可以传递给下一个中间件或路由
* 3、中间件可以通过是否调用next函数来决定是否将此请求继续向下传递
* 4、路由和中间件是放在一个数组中的
* 5、中间件的路径是以它开头就可以，路由要完全匹配路径
*
*
* 中间件的用途
* 1、公用的处理，或添加公共的方法
* 2、实现源流程控制，可以决定请求是否可以继续
* */
//如果不传路径，表示对所有的路径执行中间件函数
app.use(function (req, res, next) {
    res.setHeader('Content-Type','text/plain;charset=utf-8');
    //我希望统计本次请求的时间，在控制台输出
    res.startDate = Date.now();
    var end = res.end;
    //重写end 属性，用新的函数替代掉
    //因为end是在res原型上的方法，所以这是给res增加私有属性，从而覆盖了原型上的方法
    res.end=function (msg) {
        //把res作为this指针调用end函数，并传递msg传递
        end.call(res,msg);
        console.log(Date.now() - res.startDate)
    };
    next()
});
//使用中间件 请求 响应 next函数
//部门经理
//use 的路径只要是传进来的url以此路径开头就可以走进去
app.use('/money',function (req,res,next) {
    req.money = 1000;
    console.log('部门经理',req.money);
    next()
});
//总监
app.use('/money',function (req,res,next) {
    req.money = 100;
    console.log('总监',req.money);
    next()
});
//CTO
app.use('/money',function (req,res,next) {
    req.money = req.money*1.2;
    console.log('CTO',req.money);
    next()
});
//到自己手里了
//路由中的路径 是绝对匹配的
app.get('/money',function (req, res) {
    console.log('自己',req.money);
    res.end('自己'+req.money);
});

app.get('/buy',function (req, res) {
    res.end('买'+req.money)
});
app.listen(9090);






