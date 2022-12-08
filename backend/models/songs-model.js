const mongoose = require('mongoose');

const SpotifySchema = new mongoose.Schema({
  gif_ids: { type: Array},
  song_data: { 
    name: { type: String },
    artist: { type: String },
    url: { type: String },
    preview_url: { type: String }
  }
});

module.exports = mongoose.model("songs", SpotifySchema)
