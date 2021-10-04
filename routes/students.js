/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var StudentModel = require('../models/student.model');


/* GET students listing. */
router.get('/', function(request, response, next) {
  response.send('students route activated');
});

/* GET students listing. */
router.get('/create', function(request, response, next) {
  let student = new StudentModel({
    id: 1234,
    firstName: 'Abid',
    lastName: 'Md',
    age: 28,
    dob: '05-27-1992',
    department: 'Electrical n Electronics Engineering'
  })

  var successResponse = {
    "id": student.id,
    "status": 200,
    "description": "Student Created Successfully",
    };

  student.save((error, student) => {
    if(error) {
      response.send(error);
    } else {
      console.log("<======= Overriding existing student_id with one freshly saved =======>")
      successResponse.id = student.id;
      response.send(successResponse);
    }   
  });
});

module.exports = router;
