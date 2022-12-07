var express = require('express');
var router = express.Router();
const updateInfo = require('../helpers/update-database')

/* GET default endpoint */
router.get('/', function(req, res, next) {
  res.status(200).send("/ Endpoint")
});

/* GET req - trigger to update Gifs & Songs DB */
router.get('/update', function(req, res, next) {
  const { key } = req.query
  try {
    if(key !== process.env.UPDATE_DB_KEY) {
      const err = new Error("Invalid Key")
      err.status = 401;
      throw err
    }
    updateInfo()
    res.status(200).send("Updating...")
  } catch (error) {
    res.status(error.status).send(error.message)
  }
});

module.exports = router;
