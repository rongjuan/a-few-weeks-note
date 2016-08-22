var express = require('express');
const STATUS_CODES = require('_http_server').STATUS_CODES;
var app = express();
app.use(function (req, res, next) {
   res.send = function (msg) {
       if(typeof mst == 'string'||Buffer.isBuffer){
           res.setHeader('Content-Type','text/html;charset=utf-8');//设置响应头 内容为html 编码utf-8
           res.end(msg);//结束响应
       }else if(typeof msg =='object'){
           res.setHeader('Content-Type','application/json;charset=utf-8');
           res.end(JSON.stringify(msg));
       }else if(typeof msg == 'number'){
           res.statusCode = msg;
           res.end(STATUS_CODES[msg]);
       }
   }
   next();
});
app.get('/',function (req, res) {
    res.send('首页');
});
app.get('/user',function (req, res) {
    res.send([{id:1,name:'zfpx',age:8}]);
});
app.get('*',function (req, res) {
    res.sendStatus(404);
});
//1、使用send可以解决乱码问题
//2、使用send可以接收对象
//3、使用send可以接收数字，会把数字当成状态码来处理
// 状态码 =404 返回的响应体 = 此状态码对应的
app.listen(9090);