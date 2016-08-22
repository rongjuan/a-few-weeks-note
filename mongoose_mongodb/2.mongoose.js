var mongoose = require('mongoose');
//mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/201605js');//201605js数据库的名字
//定义一个模型骨架,定义了一个集合中的字段的名称和类型
//如果字段名称不符，会忽略此字段，如果类型不符，会报错
var personSchema = new mongoose.Schema({
    username: String,
    age: Number
});
//定义一个可以操作数据库集合的model,类似于命令行中的db.person
var personModel = mongoose.model('person', personSchema);
//find查找方法 第一个参数是查询范围，第二个参数是回调函数
/*personModel.find({}, function (err, docs) {
    if (err) {
        console.log(err);
    } else {
        console.log(docs);
    }
});*/
/*personModel.update({username:'赵六'},{$inc:{age:100}},function (err,doc) {
    console.log(doc);
});*/
/*personModel.remove({username:'赵六'},function (err, result) {
    console.log(result);
});*/
//保存一个文档
/*personModel.create({username:'赵六',age:33},function (err, docs) {
    if (err) {
        console.log(err);
    } else {
        console.log(docs);
    }
});*/
var people = [];
for(var i=1;i<=10;i++){
    people.push({age:i,username:'zfpx'+i});
}
//create不但可以传对象还可以传数组
/*
personModel.create(people,function (err, doc) {
    if (err) {
        console.log(err);
    } else {
        console.log(doc);
    }
});
*/
/*personModel.find({},{username:1,_id:0},function (err, docs) {
    console.log(docs);
});*/

/*personModel.findOne({},{username:1,_id:0},function (err, docs) {
    console.log(docs);
});*/

//第一个参数是文档的id，只需要指定字符串就行了
/*
personModel.findById("57b91b071c51c4fc2183ca5a",function (err, docs) {
    console.log(docs);
});
*/
//大于5小于7
/* personModel.find({age:{$gte:5,$lte:7}},function (err, docs) {
    console.log(docs);
 });*/
//不等于5
/*personModel.find({age:{$ne:5}},function (err, docs) {
    console.log(docs);
});*/

//in 包含
/*
personModel.find({age:{$in:[1,3,5]}},function (err, docs) {
 console.log(docs);
 });*/

/*
personModel.find({$or:[{age:5},{usename:'zfpx8'}]},function (err, docs) {
    console.log(docs);
});*/
/*personModel.update({age:1},{$set:{home:'北京'}});
personModel.find({home:{$exists:false}},function (err, docs) {
    console.log(docs);
});*/


/*
var pageSize = 2;
var pageNum = 3;
//按年龄降序排列
personModel.find()
    .sort({age:-1})
    .skip((pageNum-1)*pageSize)
    .limit(pageSize)
    //在未调用exec方法查询并不会真正发往数据库服务器
    .exec(function (err, docs) {//docs就是最终查询的结果
        console.log(docs);
    });
*/


