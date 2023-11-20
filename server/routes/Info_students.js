var express = require('express');
var router = express.Router();
//const { router } = require('../config/app');
let Student = require('../models/Info_students');
let StudentController = require('../controllers/Info_students')
/* Get route for the Info Student list */
// Read Operation
router.get('/', StudentController.DislayStudentlist);
/* Get route for Add Student page --> Create */
router.get('/add', StudentController.AddStudent);
/* Post route for Add Student page --> Create */
router.post('/add', StudentController.ProcessStudent);
/* Get route for displaying the Edit Student page --> Update */
router.get('/edit/:id', StudentController.EditStudent);
/* Post route for processing the Edit Student page --> Update */
router.post('/edit/:id', StudentController.ProcessEditStudent);
/* Get to perform Delete Operation --> Delete Operation */
router.get('/delete/:id', StudentController.DeleteStudent);
module.exports = router;