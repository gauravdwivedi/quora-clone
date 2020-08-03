const Post = require("../models/post");
const Feed = require('../models/feed');
const User = require('../models/user');
const Question = require('../models/question');
const Comment = require('../models/comment');
const { remove } = require("../models/post");
const commentsMailers = require('../mailers/comments_mailer');
module.exports.create = async function (req, res) {

  try {
    let date = new Date().toDateString();

    console.log(date);

    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
      date: date,
      category: req.body.category,
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
    let post = await Post.findById(req.params.id);

    //check if user is same who created the post
    if (post.user == req.user.id) {

      await Comment.deleteMany({ post: req.params.id });
      console.log('COmments deleted I think');
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

module.exports.addComment = async function (req, res) {
  try {

    let post = await Post.findById(req.body.postid);

    if (post) {

      let comments = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.body.postid,
      });

      comments = await comments.populate('user','name email').execPopulate();

      if (comments) {
        post.comments.push(comments);
        await post.save();
        commentsMailers.newComment(comments);
      }
    }

    // console.log(req.body);


    return res.redirect('back');



  } catch (err) {
    console.log('Error: Inside Catch');
    return res.redirect('back');
  }
}

module.exports.deleteComment = async function (req, res) {

  try {
    let comment = await Comment.findById(req.params.id);


    if (comment.user == req.user.id) {
      let postid = comment.post;

      comment.remove();

      await Post.findByIdAndUpdate(postid, { $pull: { comments: req.params.id } });

      return res.redirect('back');
    }

    return res.redirect('back');
  } catch (err) {

    console.log('Comment not deleted');
    return res.redirect('back');
  }
}