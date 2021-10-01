"use strict";

var express = require('express');

var router = express.Router();
/* GET students listing. */

router.get('/', function (req, res, next) {
  res.send('students route activated');
});
module.exports = router;
//# sourceMappingURL=students.dev.js.map
