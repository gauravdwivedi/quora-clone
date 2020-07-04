const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema(
  {
    feedname: {
      type: String,
      required: true,
      unique: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

const Feed = mongoose.model("Feed", feedSchema);

module.exports = Feed;
