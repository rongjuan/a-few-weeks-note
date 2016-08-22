var http = require('http');
var url = require('url');
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    if(pathname == '/write'){
        //第一次识访问服务器的时候，服务器通过响应头'Set-Cookie'可以把此cookie种植到时客户端
        res.setHeader('Set-Cookie','name=zfpx');
        res.end('写入cookie')
    }else if(pathname == '/read'){
        var cookie = req.headers.cookie
        res.end(cookie);
    }else{
        res.end('404');
    }
}).listen(9090);