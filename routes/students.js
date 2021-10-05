/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
var StudentModel = require('../models/student.model');

/* GET students listing. */
router.get('/', function (request, response, next) {
  response.send('students route activated');
});

/* POST students */
router.post('/create', function (request, response, next) {
  console.log("Request Body : ", request);
  let student = new StudentModel({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    age: request.body.age,
    dob: request.body.dob,
    department: request.body.department
  })

  var successResponse = {
    "status": 200,
    "description": "Student Created Successfully",
  };

  student.save((error, student) => {
    if (error) {
      response.send(error);
    } else {
      console.log("<======= Overriding existing student_id with one freshly saved =======>")
      successResponse.id = student._id;
      response.send(successResponse);
    }
  });
});

/* LIST students */
router.get('/list', function (request, response, next) {
  var students = [];
  let student = {};
  StudentModel.find((error, studentsResponse) => {
    if (error) {
      response.send(error);
    } else {
      console.log("<======= Students - Start =======>");
      console.log(JSON.stringify(studentsResponse));
      console.log("<======= Students - End =======>");
      studentsResponse.forEach(dbStudent => {
        student = new StudentModel({
          firstName: dbStudent.firstName,
          lastName: dbStudent.lastName,
          age: dbStudent.age,
          dob: dbStudent.dob,
          department: dbStudent.department
        })
        students.push(student);
      });
      response.send({
        status: 200,
        data: students,
        resultsFound: students.length});
    }
  });
});

/* GET students listing. */
router.get('/searchByName', function (request, response, next) {
  var students = [];
  let student = {};
  const fName = request.query.firstName;
  StudentModel.find({ firstName: fName }, (error, studentsResponse) => {
    if (error) {
      response.send(error)
    } else {
      console.log("<======= Students - Start =======>");
      console.log(JSON.stringify(studentsResponse));
      console.log("<======= Students - End =======>");
      studentsResponse.forEach(dbStudent => {
        student = new StudentModel({
          firstName: dbStudent.firstName,
          lastName: dbStudent.lastName,
          age: dbStudent.age,
          dob: dbStudent.dob,
          department: dbStudent.department
        })
        students.push(student);
      });
      response.send({
        status: 200,
        data: students,
        resultsFound: students.length
      });
    }
  });
});

/* PUT students */
router.put('/update', function (request, response, next) {
  console.log("Request Body : ", request.body);
  var filterObject = {age: 28};
  var successResponse = {
    "status": 200,
    "description": "Student Updated Successfully",
  };
  let student = new StudentModel();
  if(request && request.body) {
    if(request.body.firstName) {
      student.firstName = request.body.firstName;
    }
    if(request.body.lastName) {
      student.lastName = request.body.lastName;
    }
    if(request.body.age) {
      student.age = request.body.age;
    }
    if(request.body.dob) {
      student.dob = request.body.dob;
    }
    if(request.body.department) {
      student.department = request.body.department;
    }
  }
  StudentModel.findOneAndUpdate(filterObject, student , (error, updatedStudent) => {
    if (error) {
      response.send(error);
    } else {
      successResponse.id = updatedStudent._id;
      response.send(successResponse);
    }
  });
});

module.exports = router;
