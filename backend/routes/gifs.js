var express = require('express');
var router = express.Router();

var controller = require("../controllers/gifs-controller")

/* GET All Gifs. */
router.get('/', controller.getAllGifs);

/* GET 6 random Gifs. */
router.get('/random', controller.getRandomGifs)

module.exports = router;

