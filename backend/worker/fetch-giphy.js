const axios = require("axios")
var cron = require('node-cron');

const fetchTrending = async () => {
  GIPHY_TRENDING_URL = "https://api.giphy.com/v1/gifs/trending"
  console.log("fetching GIPHY trending...")
  console.log(GIPHY_TRENDING_URL + "?limit=15&rating=pg-13&api_key=" + process.env.GIPHY_API_KEY)
  return await axios.get(
    GIPHY_TRENDING_URL + "?limit=15&rating=pg-13&api_key=" + process.env.GIPHY_API_KEY)
    .then(res => {
      return res.data
    })
    .then(data => {
      return data
    })
}

module.exports.scheduledGIPHY = () => cron.schedule('*/10 * * * * *', fetchTrending, {
  timezone: "Australia/Melbourne"
});