const cron = require('node-cron');

const GIFs = require('../helpers/gifs-api-helper')
const Spotifys = require('../helpers/spotify-api-helper')


const scheduledUpdateInfo = async () => {
  try {
    // Get new gifs
    const newGIFs = await GIFs.fetchTrendingGIFs()
    // add gifs to DB
    const insertedGIFs = await GIFs.insertGIFsToDB(newGIFs)
    // get spotify auth token
    const spotifyAuth = await Spotifys.getSpotifyAuthToken()
    // get spotify tracks
    const spotifyTracks = await Spotifys.createSpotifyCombinations(spotifyAuth, insertedGIFs)
    // add tracks to DB
    const insertedTracks = await Spotifys.insertSpotifyDocsToDB(spotifyTracks)
    // delete old gifs
    const deletedGIFs = await GIFs.deleteOldGIFsFromDB(insertedGIFs)
    // delete old spotify
    const deletedTracks = await Spotifys.deleteOldSpotifyDocsFromDB(insertedTracks)
  } catch (err) {
    console.log(err)
  }
}

// cron job to run once every o'clock hour
module.exports = () => cron.schedule("0 */1 * * *", scheduledUpdateInfo, {
  timezone: "Australia/Melbourne"
});