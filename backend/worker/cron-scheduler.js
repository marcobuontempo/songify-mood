const cron = require('node-cron');

const fetchGIFs = require('../helpers/gifs-api-helper')
const fetchSpotify = require('../helpers/spotify-api-helper')


// cron job to run once every o'clock hour
module.exports.scheduledFetchGIF = () => cron.schedule("0 */1 * * *", function doUpdate() {}, {
  timezone: "Australia/Melbourne"
});