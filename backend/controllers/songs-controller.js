const SongsModel = require('../models/songs-model')
const ObjectId = require('mongodb').ObjectId;

// Sends all songs data stored in DB
module.exports.getAllSongs = async (req, res, next) => {
  const docs = await SongsModel.find()
  res.status(200).send(docs)
}

// Sends the doc in DB matching all the input _ids
module.exports.getSongByIds = async (req, res, next) => {
  const {id1, id2, id3} = req.query
  const objIds = [id1, id2, id3].map(id => ObjectId(id))
  const doc = await SongsModel.findOne({ gif_ids: { "$all": objIds } })
  res.status(200).send(doc)
}
