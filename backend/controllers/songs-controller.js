const SpotifyModel = require('../models/spotify-model')

// Sends all songs data stored in DB
module.exports.getAllSongs = async (req, res, next) => {
  const docs = await SpotifyModel.find()
  res.status(200).send(docs)
}




