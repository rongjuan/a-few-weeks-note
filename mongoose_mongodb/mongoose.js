var mongoose = require('mongoose');
//mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/201605js');//201605js数据库的名字
//定义一个模型骨架,定义了一个集合中的字段的名称和类型
//如果字段名称不符，会忽略此字段，如果类型不符，会报错
var personSchema = new mongoose.Schema({
    username:String,
    age:Number,
    email:String,
    gender:String,//性别
    birthday:Date,
    married:String
});
//定义一个可以操作数据库集合的model,类似于命令行中的db.person
var personModel = mongoose.model('person',personSchema);
//定义一个实体=集合中的一个文档对象
var rockyEntity = new personModel({
    username:'rocky',
    age:20,
    email:'rocky@qq.com',
    gender:'男',//性别
    birthday:new Date(),
    married:'待离婚'
});
//entity只有一个方法就是把自己保存在数据库里
rockyEntity.save(function (err, result) {
    if(err){
        console.log(err);
    }else{
        console.log(result);
    }
});





