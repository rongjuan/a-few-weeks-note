var url = require('url');
module.exports = function () {
    var app = function (req,res) {
        var objUrl = url.parse(req.url,true);
        var pathname = objUrl.pathname;
        var method = req.method.toLowerCase();
        var index = 0;
        function next() {
            var layer = app.layers[index++];
            if(layer.type == 'middleware'){
                if(layer.path == pathname || pathname.startsWith(layer.path)){
                    layer.fn(req,res,next);
                }else{
                    next();
                }
            }else{
                if((pathname == layer.path||layer.path == '*') && (method == layer.method)||layer.method == 'all'){
                    layer.fn(req,res);
                    return;
                }else{
                    next();
                }
            }
        }
        next()
    };
    app.layers = [];
    var methods = ['get','post','delete','head','put','all'];
    methods.forEach(function (method) {
        app[method] =function (path, fn) {
            app.layers.push({type:'route',method:method,path:path,fn:fn});
        }
    });
    app.use = function (path, middleware) {
        if(typeof path == 'function'){
            middlewear = path;
            path = '/';
        }
        app.layers.push({type:'middleware',path:path,fn:middleware})
    };
    app.listen=function (port) {
        require('http').createServer(app).listen(port);
    };
    return app
};

















/*
var url = require('url');
module.exports = function () {
    var app = function (req, res) {
        var urlObj = url.parse(req.url,true);
        var pathname = urlObj.pathname;
        var method = req.method.toLowerCase();
        var index = 0;
        function next() {
            if(index>=app.layers.length){
                return res.end('CANNOT '+req.method+' '+pathname);
            }
            var layer = app.layers[index++];
            if(layer.type == 'middleware'){
                if(pathname == layer.path ||pathname.startsWith(layer.path)){
                    layer.fn(req,res,next)
                }else{
                    next();
                }
            }else{
                if((layer.method = 'all'||method == layer.method) && (pathname == layer.path||layer.path == '*')){
                    layer.fn(req,res);
                    return;
                }else{
                    next();
                }
            }
        }
        next()
    };
    app.layers = [];
    var methods = ['get','post','head','put','delete','all'];
    methods.forEach(function (method) {
        app[method] = function (path,fn) {
            app.layers.push({type:'route',method:method,path:path,fn:fn});
        }
    });
    app.listen = function (port) {
        require('http').createServer(app).listen(port);
    };
    app.use =  function (path, middleware) {
        if(typeof path == 'function'){
            middleware = path;
            path='/';
        }
        app.layers.push({type:'middleware',path:path,fn:middleware})
    };
    return app
};*/
