const axios = require("axios")
var cron = require('node-cron');

const fetchTrending = async () => {
  const GIF_TRENDING_URL = "https://tenor.googleapis.com/v2/featured"
  console.log("fetching featured GIFs...")
  return await axios.get(
    GIF_TRENDING_URL + "?limit=15&client_key=spotify_mood&key=" + process.env.GIF_API_KEY)
    .then(res => res.data)
    .then(data => data.results)
    .then(gifs => {
      return gifs.map(gif => {
        return {
          url: gif.media_formats.gif.url,
          tags: gif.tags
        }
      });
    })
}

// cron job to run every at 00:00 and 12:00 every day
module.exports.scheduledFetchGIF = () => cron.schedule("0 0 0/12 ? * * *", fetchTrending, {
  timezone: "Australia/Melbourne"
});