const Post = require("../models/post");
const Feed = require('../models/feed');
const User = require('../models/user');
const Question = require('../models/question');

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



    let feed = req.body.feedname;

    Feed.create({
      feedname: feed
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

module.exports.getQuestion = async function (req, res) {
  try {
    let questions = await Question.find({}).sort("-createdAt");
    let feed = await Feed.find({}).sort("-createdAt")
      .populate('');
    return res.render('question', {
      title: "Ask Questions",
      questions: questions,
      feeds: feed
    });
  } catch (err) {

    console.log('error', err);
    return res.redirect('back');
  }

}
module.exports.createQuestion = async function (req, res) {
  try {
    console.log(req.body);
    let date = new Date().toDateString();
    let question = await Question.create({
      content: req.body.addquestion,
      category: req.body.category,
      user: req.user._id,
      date
    });

    return res.redirect('back');


  } catch (err) {
    console.log('Error');
    return res.redirect('back');
  }
}