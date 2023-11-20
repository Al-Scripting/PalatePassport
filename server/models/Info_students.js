let mongoose = require('mongoose');

// create a model class
let studentModel = mongoose.Schema({
        Name:String,
        StudentNum:Number,
        PhoneNum:String,
        Year:String,
        Gpa: Number
    },
    {
        collection:"students"
    });
module.exports = mongoose.model('student',studentModel);
