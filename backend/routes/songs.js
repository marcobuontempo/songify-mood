var express = require('express');
var router = express.Router();

var controller = require("../controllers/songs-controller")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("/songs Endpoint")
});

module.exports = router;
