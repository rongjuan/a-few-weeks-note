var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var books = [
    {name:'nodeJs',price:20,count:1,id:1},
    {name:'angularJs',price:30,count:1,id:2},
    {name:'vueJs',price:20,count:1,id:3},
    {name:'reactJs',price:30,count:1,id:4}
];
app.use(bodyParser.json());
app.use(express.static(path.resolve('node_modules')));

app.get('/',function (req, res) {
    //将首页返回
    res.sendFile('./1.bookstore.html',{root:__dirname})
});
app.get('/book',function (req, res) {
    res.send(books);
});
app.delete('/book/:id',function (req, res) {
    //我们需要获得最新的要删除的图书的id
    var bookid = req.params.id;
    books = books.filter(function (item) {
        return item.id!=bookid
    });
    res.send({'success':'删除成功'});//如果请求没完成则不会发起第二个请求
});
app.post('/book/:id',function (req, res) {
    var book = req.body;
    books.push(book);
    res.send({'success':'增加成功'})
});
app.put('/book/:id',function (req, res) {
    var bookid=req.params.id;
    var book = req.body;//修改后的那一本书
    books = books.map(function (item) {
        if(item.id == bookid){
            return book;
        }
        return item
    })
    res.send({'success':'修改成功'})
});
app.listen(3000);










/*function static(p){
    return function (req, res, next) {
        var filePath = path.join(p,req.path);
        var exist = fs.existsSync(filePath);
        if(exist){
            fs.createReadStream(filePath).pipe(res);
        }else{
            next();
        }
    }
}
app.use(static(path.resolve('mode_modules')))*/
