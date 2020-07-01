const Post = require("../models/post");
const Feed = require('../models/feed');
const User = require('../models/user');

module.exports.create = async function (req, res) {

  try {
    let date = new Date().toDateString();

    console.log(date);

    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
      date: date,
    });

    // //if we want to populate just the name of the user (we will not want to send the password)
    post = await post.populate('user', 'name').execPopulate();

    // return res.status(200).json({
    //   data: {
    //     post: post
    //   },
    //   message: "Post created!"
    // });

    return res.redirect("back");
  } catch (err) {

    return res.redirect('back');

  }
}


module.exports.addFeed = function (req, res) {

  return res.render('add-feed', {
    title: 'Add Feeds'
  });

}

module.exports.createFeed = async function (req, res) {
  try {
    let feed = Feed.create({
      feedname: req.body.feedname
    });
    return res.redirect('back');

  } catch (err) {
    console.log('error : ');
    return res.redirect('back');
  }
}

module.exports.destroy = async function (req, res) {
  try {
    //check if user is same who created the post
    let post = await Post.findById(req.params.id);
    console.log(post);
    if (post.user == req.user.id) {
      post.remove();
      return res.redirect('/');
    } else {
      console.log('Wrong user: ');
      return res.redirect('/');
    }
  } catch (err) {
    console.log('Under catch block : ');
    return res.redirect('back');
  }
}