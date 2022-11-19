const axios = require("axios");
const SpotifyModel = require('../models/spotify-model')

// get spotify authorisation token and api access
// returns auth token for future API calls
module.exports.getSpotifyAuthToken = async () => {
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

// uses a specified search query to fetch a relevant song from spotify API
// returns an array of objects containing data about matching tracks. array may also be empty []
const searchSpotifyTracks = async (authToken, searchTerms) => {
  console.log("searching...", searchTerms)
  return await axios.get("https://api.spotify.com/v1/search?type=track&limit=1&q=" + searchTerms, { headers: { 'Authorization': `${authToken.token_type} ${authToken.access_token}`, 'Content-Type': 'application/json' } })
    .then(res => res.data)
    .then(data => {
      console.log("done:", data.tracks.items)
      return data.tracks.items
    })
    .catch(err => {
      console.log(err)
    })
}

// helper function: returns a random element from an input array or string
const getRandom = (inpArr) => {
  return inpArr[Math.floor((Math.random()*inpArr.length))];
}

const searchRandomSpotifyTrack = async (authToken) => {
  const randomCharacter = getRandom("abcdefghijklmnopqrstuvwxyz") + "%"  // get random letter and append wildcard character to end
  const randomOffset = Math.floor(Math.random() * 100)
  const searchTerm = randomCharacter + "&offset=" + randomOffset
  return await searchSpotifyTracks(authToken, searchTerm)
}

// Returns a spotify track based on search query. If search returns no tracks, fetches a random track instead
const getSpotifyTrack = async (authToken, searchTerms) => {
  const tracks = searchSpotifyTracks(authToken, searchTerms)
  if (tracks.length === 0) {
    tracks = await searchRandomSpotifyTrack(authToken)
  }
  return tracks[0]
}


// find every combination of GIF docs at size=3 (i.e. ABC, ABD, ACD, etc...)
// returns objects of each spotify doc to insert to MongoDB
module.exports.createSpotifyCombinations = async (authToken, GIFsDocs) => {
  // ensure there are 15 docs
  // if (GIFsDocs.length !== 15) {
  //   throw Error("Invalid documents")
  // }


  // Get all size=3 combinations of indexes 0-14 (i.e. index for each )
  const idxs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  const spotifyDocs = [] // result: [ [ { _id: 1 }, { _id: 2 }, { _id: 3 } ], [ { _id: 1 }, { _id: 2 }, { _id: 4 } ], ... ]    <->   where id# are actuall new Object(id) of mongoDB docs
  for (let i = 0; i < idxs.length - 2; i++) {
    for (let j = i + 1; j < idxs.length - 1; j++) {
      for (let k = j + 1; k < idxs.length; k++) {
        const docs = [ GIFsDocs[idxs[i]], GIFsDocs[idxs[j]], GIFsDocs[idxs[k]] ]
        const joinedTags = docs.map(doc => getRandom(doc.tags)).join(" ")

        const newDoc = {
          gif_ids: docs.map(doc => doc._id),
          song_url: await getSpotifyTrack(authToken, joinedTags)
        }
        spotifyDocs.push(newDoc)
      }
    }
  }
  return spotifyDocs
}

module.exports.insertSpotifyDocsToDB = async (newSpotifyDocs) => {
  // ensure input is correct    ->    15 gifs = 455 combinations
  // if (newSpotifyDocs.length !== 455) {
  //   throw Error("Incorrect array input size")
  // }

  console.log("updating Spotify docs in DB...")
  const insertedDocs = await SpotifyModel.insertMany(newSpotifyDocs)
  return insertedDocs
}


// deletes any old Spotify docs from MongoDB
module.exports.deleteOldSpotifyDocsFromDB = async (insertedDocs) => {
  // get _id of each inserted doc
  const insertedIDs = insertedDocs.map(doc => doc._id)

  // check if insert was successful (i.e. input array is length==455)
  if (insertedIDs.length === 455) {
    // if successful, delete all docs that are NOT in new _ids
    await SpotifyModel.deleteMany({ "_id": { "$nin": insertedIDs } })
    console.log("fetching and updating completed")
  } else {
    // if unsuccessful, delete any newly inserted docs, i.e. where docs match any _ids
    await SpotifyModel.deleteMany({ "_id": { "$in": insertedIDs } })
    throw Error(`Unexpected document insertion - only inserted ${insertedIDs.length} documents`)
  }
}

// TODO: FRONTEND
// 6 random GIFa from the 15 in DB are selected ->
// 2 GIFs shown to user at a time, user selects 1 choice of each ->
// Lookup in DB for document where { gifs: { $includesall: [_id1, _id2, _id3] } }
// Return spotify URL and present in play window to user




