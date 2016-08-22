var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
express.static = function (root) {
    return function (req, res, next) {
        var filename =path.join(root,req.path);
        fs.exists(filename,function (exists) {
            if(exists){
                fs.createReadStream(filename).pipe(res);
            }else{
                next();
            }
        })
    }
};
//会返回一个静态文件中间件
//resolve从当前路径出发，得到一个绝对路径
app.use(express.static(path.resolve('public')));
app.get('/home',function (req, res) {
    //res.sendfile('./home.html');//这个已经废弃掉了
    //res.sendFile(path.resolve('./home.html'))//参数是一个绝对路径下边这种写法也是可以的
    res.sendFile('./home.html',{root:__dirname})
});
app.listen(9090);