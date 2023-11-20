var express = require('express');
var router = express.Router();
//const { router } = require('../config/app');
let Student = require('../models/Info_students');

module.exports.DislayStudentlist = async (req,res,next)=>{ //< Mark function as async
    try{
        const StudentList = await Student.find(); //< Use of await keyword
        res.render('student/list', {
            title: 'Student List',
            StudentList: StudentList
        });
    }catch(err){
        console.error(err);
        //Handle error
        res.render('student/list', {
            error: 'Error on server'
        });
    }
};

module.exports.AddStudent = async (req,res,next)=>{
    try{
        res.render('student/add',
            {
                title:'Add student'
            })
    }
    catch(err)
    {
        console.error(err);
        res.render('student/list',
            {
                error: 'Error on the server'
            });
    }
};

module.exports.ProcessStudent = async (req,res,next)=>{
    try{
        let newStudent = Student({
            "Name":req.body.Name,
            "StudentNum": req.body.StudentNum,
            "PhoneNum": req.body.PhoneNum,
            "Year": req.body.Year,
            "Gpa": req.body.Gpa
        });
        Student.create(newStudent).then(() =>{
            res.redirect('/studentlist')
        })
    }
    catch(error){
        console.error(err);
        res.render('student/list',
            {
                error: 'Error on the server'
            });
    }
};

module.exports.EditStudent = async (req,res,next)=>{
    try{
        const id = req.params.id;
        const studentToEdit = await Student.findById(id);
        res.render('student/edit',
            {
                title:'Edit Student',
                Student:studentToEdit
            })
    }
    catch(error){
        console.error(err);
        res.render('student/list',
            {
                error: 'Error on the server'
            });
    }
}

module.exports.ProcessEditStudent= (req,res,next)=>{
    try{
        const id = req.params.id;
        let updatedStudent = Student({
            "_id":id,
            "Name":req.body.Name,
            "StudentNum": req.body.StudentNum,
            "PhoneNum": req.body.PhoneNum,
            "Year": req.body.Year,
            "Gpa": req.body.Gpa
        });
        Student.findByIdAndUpdate(id,updatedStudent).then(()=>{
            res.redirect('/studentlist')
        });
    }
    catch(error){
        console.error(err);
        res.render('student/list',
            {
                error: 'Error on the server'
            });
    }
}

module.exports.DeleteStudent= (req,res,next)=>{
    try{
        let id = req.params.id;
        Student.deleteOne({_id:id}).then(() =>
        {
            res.redirect('/studentlist')
        })
    }
    catch(error){
        console.error(err);
        res.render('student/list',
            {
                error: 'Error on the server'
            });
    }
}