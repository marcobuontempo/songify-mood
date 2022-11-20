const GIFsModel = require('../models/gifs-model');

module.exports.getAllGifs = (req, res, next) => {
  res.send("/gifs Endpoint")
}

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

  res.send(randDocs)
}