var express = require('express');
var router = express.Router();

var controllers = require("../controllers/giphyController")

/* GET users listing. */
router.get('/', controllers.fetchTrending);

module.exports = router;
