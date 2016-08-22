var url = require('url');
module.exports = function () {
    var app = function (req, res) {
        var urlObj = url.parse(req.url,true);
        var pathname = urlObj.pathname;
        var method = req.method.toLowerCase();
        for(var i=0;i<app.layers.length;i++){
            var layer = app.layers[i];
            if((layer.method=='all'||method == layer.method) && (pathname == layer.path|| layer.path=="*")){
                layer.fn(req,res);
                return;
            }
        }

    } ;
    app.layers = [];
    var methods = ['get','post','delete','put','head','all'];
    methods.forEach(function (method) {
        app[method] = function (path, fn) {
            app.layers.push({method:method,path:path,fn:fn});
        }
    });
    app.listen = function (port) {
        require('http').createServer(app).listen(port);
    };
    return app;
};