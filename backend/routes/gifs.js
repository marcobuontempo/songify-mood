var express = require('express');
var router = express.Router();

var controller = require("../controllers/gifs-controller")

/* GET users listing. */
router.get('/', controller.getAllGifs);
router.get('/random', controller.getRandomGifs)

module.exports = router;

