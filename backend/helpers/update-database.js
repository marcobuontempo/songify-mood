const GIFs = require('./gifs-api-helper')
const Spotifys = require('./spotify-api-helper')

const updateInfo = async () => {
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

module.exports = updateInfo