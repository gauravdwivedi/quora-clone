const Feed = require("../models/feed");

module.exports.create = function (req, res) {
  Feed.create({
    feedname: req.body.feedname,
  });

  return res.redirect("back");
};
