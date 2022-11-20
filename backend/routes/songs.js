var express = require('express');
var router = express.Router();

var controller = require("../controllers/songs-controller")

/* GET all songs. */
router.get('/', controller.getAllSongs);

module.exports = router;
