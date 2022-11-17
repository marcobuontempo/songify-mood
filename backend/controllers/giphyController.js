const axios = require("axios")

GIPHY_TRENDING_URL = "api.giphy.com/v1/gifs/trending"

module.exports.fetchTrending = async function (req, res, next) {
  // axios.get(GIPHY_TRENDING_URL+"?limit=15&rating=pg-13&api_key="+process.env.GIPHY_API_KEY)
  // .then(res => {
  //   console.log(res)
  // })
  res.send("GIPHY")
}