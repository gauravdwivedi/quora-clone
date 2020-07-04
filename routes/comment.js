const express = require("express");

const router = express.Router();
const passport = require('passport');
const postController = require("../controllers/post_controller");

router.get('/delete/:id', passport.checkAuthentication, postController.deleteComment);

module.exports = router;
