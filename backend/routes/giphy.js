var express = require('express');
var router = express.Router();

var controller = require("../controllers/giphy-controller")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("/giphy Endpoint")
});

module.exports = router;
