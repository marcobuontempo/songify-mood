var express = require('express');
var router = express.Router();

var controller = require("../controllers/songs-controller")

/* GET all songs. */
router.get('/', controller.getAllSongs);

/* GET song by matching all _ids in req JSON body. 
   body = { "ids" : ["idxxx", "idxxxx", "idxxxx" ] }
*/
router.get('/find', controller.getSongByIds);

module.exports = router;
