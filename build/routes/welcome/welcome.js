"use strict";
/* app/controllers/welcome.controller.ts */
// Import only what we need from express
var express = require("express");
// Assign router to the express.Router() instance
var router = express.Router();
// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it's /welcome
router.get('/', function (req, res) {
    // Reply with a hello world when no name param is provided
    res.send('Hello, World!');
});
module.exports = router;
//# sourceMappingURL=welcome.js.map