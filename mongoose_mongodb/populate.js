var mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/201605js');//201605js数据库的名字
var courseSchema = new mongoose.Schema({
    name:String
});
var courseModel = mongoose.model('Course',courseSchema);
var studentSchema = new mongoose.Schema({
    name:String,
    course:{
        type:mongoose.Schema.Types.ObjectId,//类型是对象id类型
        ref:'Course'//引用课程的主键，它就是外键
    }
});
console.log(mongoose.Schema);
var studentModel = mongoose.model('Student',studentSchema);
courseModel.create({
    name:'node.js'
},function (err, course) {
    //{_id:xxx,name:'node.js'}
    studentModel.create({
        name:'张三',
        course:course._id
    },function (err, student) {
        studentModel.findById(student._id,function (err, doc) {
            courseModel.findById(doc.course,function (err, c) {
                doc.course = c;
                console.log(doc);
            })
        });
        /*studentModel.findById(student._id).populate('course').exec(function (err, doc) {
            console.log(doc);
        })*/
    })
});

