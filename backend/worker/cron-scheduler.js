const cron = require('node-cron');

const fetchGIFs = require('../helpers/gifs-api-helper')
const fetchSpotify = require('../helpers/spotify-api-helper')


const scheduledUpdateInfo = () => {
  // Get new gifs
  // add gifs to DB
  // get spotify auth token
  // get spotify tracks
  // add tracks to DB
  // delete old gifs
  // delete old spotify
}

// cron job to run once every o'clock hour
module.exports = () => cron.schedule("0 */1 * * *", scheduledUpdateInfo, {
  timezone: "Australia/Melbourne"
});