"use strict";

/*jshint esversion: 6 */
var express = require('express');

var router = express.Router();

var mongoose = require('mongoose');

var StudentModel = require('../models/student.model');
/* GET students listing. */


router.get('/', function (request, response, next) {
  response.send('students route activated');
});
/* GET students listing. */

router.post('/create', function (request, response, next) {
  console.log("Request Body : ", request);
  var student = new StudentModel({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    age: request.body.age,
    dob: request.body.dob,
    department: request.body.department
  });
  var successResponse = {
    "status": 200,
    "description": "Student Created Successfully"
  };
  student.save(function (error, student) {
    if (error) {
      response.send(error);
    } else {
      console.log("<======= Overriding existing student_id with one freshly saved =======>");
      successResponse.id = student._id;
      response.send(successResponse);
    }
  });
});
module.exports = router;
//# sourceMappingURL=students.dev.js.map
