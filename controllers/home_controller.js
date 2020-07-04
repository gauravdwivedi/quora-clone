const Post = require("../models/post");
const Feed = require("../models/feed");
const User = require("../models/user");
const Comment = require('../models/comment');

module.exports.home = async function (req, res) {
  try {


    let post = await Post.find({}).sort("-createdAt")
      .populate('user', 'name').
      populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      })
      .exec();

    let feed = await Feed.find({}).sort("-createdAt");

    let users = await User.find({});

    return res.render("home", {
      title: "Home",
      posts: post,
      feeds: feed,
      all_users: users
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};
