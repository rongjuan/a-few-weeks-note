var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/201605js');//201605js数据库的名字
var personSchema = new mongoose.Schema({
    username: {
        type:String,
        match:/^zfpx/,//值要符合正则
        required:true//必填，不能为空
    },
    age: {
        type:Number,
        min:0,
        max:150
    },
    gender:{
        type:String,
        enum:['男','女']
    },
    home:{
        type:String,
        validate:[valid,'必须是北京']
    }
});
function valid(val) {
    return val == '北京'
}
var personModel = mongoose.model('person', personSchema);
personModel.create({
    username:'zfpx1',
    age:110,
    gender:'男',
    home:'北京'
},function (err, doc) {
    console.log(err);
});
/*
//为entity扩展实例方法  methods是实例方法的集合
personSchema.methods.findSameAge = function (cb) {
    this.model('person').find({age:this.age},cb);
};
personSchema.statics.findByUsername = function (name, cb) {
    this.find({username:new RegExp(name)},cb);
}

personModel.findByUsername('1',function (err, doc) {
    console.log(doc);
})
var zhangsan = new personModel({
    username:'张三',
    age:5
});
/!*zhangsan.findSameAge(function (err, docs) {
    console.log(docs)
});*!/
*/

