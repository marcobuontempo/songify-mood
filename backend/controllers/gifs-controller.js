const GIFsModel = require('../models/gifs-model');

// Sends all GIF docs from DB
module.exports.getAllGifs = async (req, res, next) => {
  const docs = await GIFsModel.find()
  res.status(200).send(docs)
}


// Sends 6 random GIF docs from DB
module.exports.getRandomGifs = async (req, res, next) => {
  // Get 6 random indices
  const randIdxs = []
  while(randIdxs.length < 6) {
    const n = Math.floor(Math.random()*15)
    if (!randIdxs.includes(n)) {
      randIdxs.push(n)
    }
  }

  const allDocs = await GIFsModel.find()
  const randDocs = randIdxs.map(i => allDocs[i])

  res.status(200).send(randDocs)
}