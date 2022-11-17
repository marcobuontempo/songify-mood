const mongoose = require('mongoose');

const GIFSchema = new mongoose.Schema({
  url: { type: String },
  tags: { type: Array},
  date: { type: Date }
});

module.exports = mongoose.model("featured-gifs", GIFSchema)
