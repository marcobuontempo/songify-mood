const axios = require("axios")
var cron = require('node-cron');
const GIFsModel = require('../models/gifs-model')
const ObjectId = require('mongoose').Types.ObjectId

const fetchTrendingGIFs = async (currentDT) => {
  const GIF_TRENDING_URL = "https://tenor.googleapis.com/v2/featured"
  console.log("fetching featured GIFs...")
  return await axios.get(
    GIF_TRENDING_URL + "?limit=15&client_key=spotify_mood&key=" + process.env.GIF_API_KEY)
    .then(res => res.data)
    .then(data => data.results)
    .then(gifs => {
      return gifs.map(gif => {
      const currentDT = Date.now()
        return {
          url: gif.media_formats.gif.url,
          tags: gif.tags,
          date: currentDT
        }
      })
    })
}

const updateDatabaseGIFs = async () => {
  try {
    const updatedGIFs = await fetchTrendingGIFs()
    if (updatedGIFs.length !== 15) {
      throw Error(`Unexpected fetch result - only fetched ${updatedGIFs.length} documents`)
    }

    console.log("updating gifs in db...")
    // insert new documents
    const insertedIDs = await GIFsModel.insertMany(updatedGIFs)
    .then(insertedDocuments => insertedDocuments.map(doc => doc._id))

    // delete required documents
    if (insertedIDs.length === 15) {
      await GIFsModel.deleteMany({ "_id": { "$nin": insertedIDs } })
      console.log("fetching and updating completed")
    } else {
      await GIFsModel.deleteMany({ "_id": { "$in": insertedIDs } })
      throw Error(`Unexpected document insertion - only inserted ${insertedIDs.length} documents`)
    }
  }
  catch (err) {
    console.log(err.message)
  }
}

// cron job to run every at every hour
module.exports.scheduledFetchGIF = () => cron.schedule("0 */1 * * *", updateDatabaseGIFs, {
  timezone: "Australia/Melbourne"
});