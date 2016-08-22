var express = require('express');
var app = express();
app.set('view engine','ejs');
console.log(app.get('view engine'))
app.listen(9090);