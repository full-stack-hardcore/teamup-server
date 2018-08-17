"use strict";
/* app/controllers/index.ts */
var express = require("express");
var route = require("./welcome");
var router = express.Router();
router.use('/', route);
module.exports = router;
//# sourceMappingURL=index.js.map