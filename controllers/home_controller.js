const Post = require("../models/post");
const Feed = require("../models/feed");
const User = require("../models/user");
const Comment = require('../models/comment');

module.exports.main = function(req,res){

  return res.render('main',{
    title:"Welcome to SponserTruck",
    path:"main"
  });
}


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
      path:'home',
      posts: post,
      feeds: feed,
      all_users: users
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

module.exports.updatefeed = async function (req, res) {
  try {
    let post = await Post.find({
      'category': req.params.id
    }).sort("-createdAt").
      populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      })
      .exec();

    let feed = await Feed.find({}).sort("-createdAt");

    let users = await User.find({});
    console.log(req.params.id);

    return res.render("home", {
      title: "Home",
      path:'feed',
      posts: post,
      feeds: feed,
      all_users: users
    });

  } catch (err) {
    console.log("Error", err);
    return;
  }
}