var express = require('express');
var router = express.Router();

var controller = require("../controllers/gifs-controller")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("/gifs Endpoint")
});

module.exports = router;
