var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String,
    age: Number,
    dob: String,
    department: String
  });
  
  var StudentModel = mongoose.model("Student", studentSchema);

  module.exports = StudentModel;