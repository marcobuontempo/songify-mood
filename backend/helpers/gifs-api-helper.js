const axios = require("axios");
const GIFsModel = require('../models/gifs-model');

// uses Tenor API to fetch current top 15 trending GIFs
// returns an array of GIF documents, each containing the relevant data for the MongoDB
module.exports.fetchTrendingGIFs = async () => {
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

// insert an array of GIF docs into MongoDB
// returns the response from DB (i.e. the array of inserted docs with new _id)
module.exports.insertGIFsToDB = async (updatedGIFsArr) => {
  try {
    if (updatedGIFsArr.length !== 15) {
      throw Error(`Unexpected fetch result - only fetched ${updatedGIFsArr.length} documents`)
    }

    // insert new documents
    console.log("updating gifs in db...")
    const insertedDocs = await GIFsModel.insertMany(updatedGIFsArr)
    return insertedDocs
  }
  catch (err) {
    console.log(err.message)
  }
}

// deletes any old GIF docs from MongoDB
module.exports.deleteOldGIFsFromDB = async (insertedDocs) => {
  // get _id of each inserted doc
  const insertedIDs = insertedDocs.map(doc => doc._id)

  // check if insert was successful (i.e. input array is length==15)
  if (insertedIDs.length === 15) {
    // if successful, delete all docs that are NOT in new _ids
    await GIFsModel.deleteMany({ "_id": { "$nin": insertedIDs } })
    console.log("fetching and updating completed")
  } else {
    // if unsuccessful, delete any newly inserted docs, i.e. where docs match any _ids
    await GIFsModel.deleteMany({ "_id": { "$in": insertedIDs } })
    throw Error(`Unexpected document insertion - only inserted ${insertedIDs.length} documents`)
  }
}