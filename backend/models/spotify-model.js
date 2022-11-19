const mongoose = require('mongoose');

const SpotifySchema = new mongoose.Schema({
  gif_ids: { type: Array},
  song_url: { type: String }
});

module.exports = mongoose.model("songs", SpotifySchema)
