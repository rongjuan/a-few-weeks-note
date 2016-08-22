var express = require('./express_params');
var url = require('url');
var app = express();
app.use(function (req, res, next) {
    //http://localhost:9090/user?name=zhang&age=7
    var urlObj= url.parse(req.url,true);
    req.path = urlObj.pathname;//端口号和问号之间的部分
    req.query = urlObj.query;//查询字符串转成的对象
    //从请求头中取出主机名
    req.hostname= req.headers.host.split(':')[0];
    next();
});
app.get('/user',function (req, res) {
    //获取路径名
    console.log(req.path);
    //获取主机名
    console.log(req.hostname);
    //获取查询对象 其实就是查询字符串对应的对象
    console.log(req.query);
    res.end('ok');
});
// /book/100/zfpx
// /book/:id/:name  :只是一个位符 这是服务器端常用的一种方式 =>/book\/([^\/]+)\/([^\/]+) ['id','name']
app.get('/book/:id/:name',function (req, res) {
    console.log(req.params);//req.params是一个空对象把获取来的值赋值给params的id属性
    res.end(req.params.id +req.params.name);
});


app.listen(9090);



