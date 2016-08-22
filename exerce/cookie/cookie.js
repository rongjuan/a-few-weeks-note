var http = require('http');
http.createServer(function (req, res) {
    if(req.url =='/write'){
        res.setHeader('Set-Cookie','name=vicky');
        res.end('ok');
    }else if(req.url == '/read'){
        console.log(req.headers);
        res.end(req.headers.cookie)
    }
}).listen(8080);