/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();
var mysqlconnection = require('../db_config');

router.get('/', (request, response, next) => {
    var employees = [];
    var resultArray = [];
    var GET_ALL_EMPLOYEES = "select * from sakila.employees";
    mysqlconnection.query(GET_ALL_EMPLOYEES, (error, result) => {
        if(error) {
            console.log("<============ Error while fetching data from DB ============>");
            response.send(error);
        } else {
            resultArray = Object.values(JSON.parse(JSON.stringify(result)))
            resultArray.forEach(emp => {
                var employee = {};
                employee.employeeId = emp.EMPLOYEE_ID;
                employee.firstName = emp.FIRST_NAME;
                employee.lastname = emp.LAST_NAME;
                employee.contact = emp.PHONE_NUMBER;
                employee.email = emp.EMAIL;
                employee.dateofjoining = emp.HIRE_DATE;
                employees.push(employee);
            });
            response.send({
                status: 200,
                data: employees,
                resultsFound: employees.length
            });
        }
    });
});

router.get('/search/:empid', (request, response, next) => {
    var employees = [];
    var resultArray = [];
    var GET_EMPLOYEE = "select * from sakila.employees where employee_id = "+request.params.empid;
    mysqlconnection.query(GET_EMPLOYEE, (error, result) => {
        if(error) {
            console.log("<============ Error while fetching data from DB ============>");
            response.send(error);
        } else {
            resultArray = Object.values(JSON.parse(JSON.stringify(result)))
            resultArray.forEach(emp => {
                var employee = {};
                employee.employeeId = emp.EMPLOYEE_ID;
                employee.firstName = emp.FIRST_NAME;
                employee.lastname = emp.LAST_NAME;
                employee.contact = emp.PHONE_NUMBER;
                employee.email = emp.EMAIL;
                employee.dateofjoining = emp.HIRE_DATE;
                employees.push(employee);
            });
            response.send({
                status: 200,
                data: employees,
                resultsFound: employees.length
            });
        }
    });
});

module.exports = router;