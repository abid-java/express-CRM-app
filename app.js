/*jshint esversion: 6 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var dbUrl = require('./config/dbconfig').MONGO_DB.DB_URL;
var mysql = require('./db_config');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentsRouter = require('./routes/students');
var employeesRouter = require('./routes/employees');
var app = express();

mongoose.connect(dbUrl);

mongoose.connection.on("connected", () => {
    console.log("<============ Successfully connected to MongoDB - Database ============>");
});

mongoose.connection.on("error", (error) => {
  console.log("!!!!!!!!!!!!!! Error in connecting to MongoDB - Database !!!!!!!!!!!!!!");
  console.log(error);
  console.log("<==========================================================================================================>")
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students', studentsRouter);
app.use('/employees', employeesRouter);

// catch 404 and forward to error handler
app.use(function (request, response, next) {
  next(createError(404));
});

// error handler
app.use(function (error, request, response, next) {
  // set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};

  // render the error page
  response.status(error.status || 500);
  response.render('error');
});

module.exports = app;
