/*jshint esversion: 6 */

var mysql = require('mysql2');
const dbconfig = require('./config/dbconfig');

var mysqlconnection = mysql.createConnection({
    host: dbconfig.MYSQL_DB.HOST,
    user: dbconfig.MYSQL_DB.USER,
    password: dbconfig.MYSQL_DB.PASSWORD,
    database: dbconfig.MYSQL_DB.DATABASE
});

mysqlconnection.connect((error) => {
    if(error) {
        console.log("!!!!!!!!!!!!!! Error in connecting to Database !!!!!!!!!!!!!!");
    } else {
        console.log("<============ Successfully connected to Database ============>")
    }
});

module.exports = mysqlconnection;


