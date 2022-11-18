const axios = require("axios");
const cron = require('node-cron');
const GIFsModel = require('../models/gifs-model');
// const SPOTOFYMODEL = require('../models/gifs-model')  SPOTIFY MODEL

// TODO: get spotify authorisation token and api access
const getSpotifyAuthToken = async () => {
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: "post",
    headers: {
      'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
      'Content-Type': "application/x-www-form-urlencoded"
    },
    data: {
      grant_type: 'client_credentials'
    },
    json: true
  };
  return axios.request(authOptions)
    .then(res => res.data)
    .then(data => {
      return data
    })
    .catch(err => {
      console.log(err)
    })
}

const searchSpotifyTracks = async (searchTerms, authToken) => {
  return await axios.get("https://api.spotify.com/v1/search?type=track&q=" + searchTerms, { headers: { 'Authorization': `${authToken.token_type} ${authToken.access_token}`, 'Content-Type': 'application/json' } })
    .then(res => res.data)
    .then(data => {
      return data.tracks.items
    })
    .catch(err => {
      console.log(err)
    })
}




const getDatabaseGIFs = async () => {
  // docsArr = get 15 docs from db and store in array[]
  return await GIFsModel.find()
}


// TODO: findCombinations(docsArr) - Find every combination of GIF docs at size=3 (i.e. ABC, ABD, ACD, etc...)
// use combinations of 0-14 to calculate index combinations (i.e. 012 = arr[0], arr[1], arr[2])
// store combinations in array = [_id1, _id2, _id3]
// return [ [_id1, _id2, _id3], [_id1, _id2, _id4], ... ]
const findCombinations = async (GIFsDocs) => {
  // if GIFsDocs.length !== 15: return

  // Get all size=3 combinations of indexes 0-14 (i.e. index for each )
  // const idxs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  const idxs = [0, 1, 2, 3]
  const combinations = [] // result: [ [ 0, 1, 2 ], [ 0, 1, 3 ], ... ]
  for (let i = 0; i < idxs.length - 2; i++) {
    for (let j = i + 1; j < idxs.length - 1; j++) {
      for (let k = j + 1; k < idxs.length; k++) {
        combinations.push([GIFsDocs[idxs[i]], GIFsDocs[idxs[j]], GIFsDocs[idxs[k]]])
      }
    }
  }
  console.log(combinations)
}

findCombinations([{ _id: 1 }, { _id: 2 }, { _id: 3 }, { _id: 4 }])

// TODO: findSpotifySong(docsArr) - Find spotify song for each combination of GIFS
// get top 3 tags of each gif, search spotify
// store result in document -> { gifs: [_id1, _id2, _id3], song_url: xxxxx }
// insert each document into collection, remove all old docs


// TODO: FRONTEND
// 6 random GIFa from the 15 in DB are selected ->
// 2 GIFs shown to user at a time, user selects 1 choice of each ->
// Lookup in DB for document where { gifs: { $includesall: [_id1, _id2, _id3] } }
// Return spotify URL and present in play window to user