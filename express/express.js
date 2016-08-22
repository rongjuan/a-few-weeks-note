/*var path = require('path');
 var url = require('url');
 module.exports = function(){
 var app =  function(req,res){
 var urlObj =  url.parse(req.url);
 var method = req.method.toLowerCase();
 var pathname = urlObj.pathname;
 var index = 0;
 function next(){
 if(index>app.layers.length){
 return res.end('CANNOT GET')
 }
 var layer = app.layers[index++];
 if(layer.type=='middleware'){
 if(pathname == layer.path||pathname.indexOf(layer.path+'/') ==0){
 layer.listener(req,res,next);//中间有三个参数
 }else{
 next();
 }
 }else{
 if((layer.method== 'all' || method == layer.method) && (layer.path == pathname|| layer.path == '*')) {
 layer.listener(req, res);
 return;
 }else{
 next();
 }
 }
 }
 next();
 };
 app.layers = [];
 var methods = ['all','get','post','delete','head','put'];
 methods.forEach(function(method){
 app[method] = function(path,listener){
 app.layers.push({type:'route',method:method,path:path,listener:listener});
 }
 });
 app.use = function(path,listener){
 if(typeof path == 'function'){
 listener = path;
 path = '/';
 }
 app.layers.push({type:'middleware',path:path,listener:listener});
 };
 app.listen = function (port) {
 require('http').createServer(app).listen(port);
 };
 return app;
 };*/



//////////////////2

var path = require('path');
var url = require('url');
module.exports = function () {
    var app = function (req, res) {
        var urlObj = url.parse(req.url);
        var method = req.method.toLowerCase();
        var pathname = urlObj.pathname;
        for (var i = 0; i < app.layers.length; i++) {
            var route = app.layers[i];
            if ((route.method == 'all' || method == route.method) && (route.path == pathname || route.path == '*')) {
                route.listener(req, res);
                break;
            }
        }
    };
    app.layers = [];
    var methods = ['all', 'get', 'post', 'delete', 'head', 'put'];
    methods.forEach(function (method) {
        app[method] = function (path, listener) {
            app.layers.push({method: method, path: path, listener: listener});
        }
    });
    app.listen = function (port) {
        require('http').createServer(app).listen(port);
    };
    return app;
};


/////////1


 var path = require('path');
 var url = require('url');

 //导出一个函数 express
 module.exports = function () {
 //当调用此函数的时候返回一个函数，就是监听函数，有两个参数,分别是请求和响应
 var app = function (req, res) {
 //把url转换成对象
 var urlObj = url.parse(req.url);
 //获取请求中的方法名 方法名要从大写转成小写
 var method = req.method.toLowerCase();
 //取得路径名
 var pathname = urlObj.pathname;
 //循环保存在数组的每个路由配置对象
 for (var i = 0; i < app.layers.length; i++) {
 //取出当前的路由
 var route = app.layers[i];
 //如果方法名相同并且路径相当的话，就可以执行对应的回调函数了
 if (method == route.method && (route.path == pathname || route.path == '*')) {
 //执行对应的监听函数
 route.listener(req, res);
 //如果当前路由对象和当前请求已经成功配对，则不再继续匹配
 break;
 }
 }
 };
 //app内部维护了一个监听数组，是一个路由数组
 app.layers = [];
 //为app增加自定义属性，第一个参数是路径，第二个参数是请求监听函数
 app.get = function (path, listener) {
 //向数组中增加新的元素，是一个配置对象，由路径和监听函数组成
 app.layers.push({method: 'get', path: path, listener: listener});
 };
 return app;
 };


