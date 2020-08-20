const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  descr: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Article", articleSchema);
