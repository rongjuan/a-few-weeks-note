/*
* md5 是一个摘要算法
* 1、把任意输入转成固定长度的输出(32个字符)
* 2、无法从输出的结果推算出来输入的内容
* 3、如果输入内容是一样的，那么输出内容也是一定的
* 4、不同的输入会产生不同的输出
*
* */
var crypto = require('crypto');
var res = crypto.createHash('md5')//创建md5算法
    .update('123')
    .digest('hex');
console.log(res);


/*
* 1、实现密码的加密  123 -> 202cb962ac59075b964b07152d234b70
*
*
* */