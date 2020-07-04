const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
    date: {
      type: String,
    },
    comments:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Comment'
    }]
  },
  {
    timestamps: true,
  }
);


const Post = mongoose.model("Post", postSchema);

module.exports = Post;
