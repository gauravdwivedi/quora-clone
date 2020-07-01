const express = require("express");

const router = express.Router();
const passport = require('passport');
const postController = require("../controllers/post_controller");

router.post("/create", passport.checkAuthentication, postController.create);
router.get('/add-feed', passport.checkAuthentication, postController.addFeed);

router.post('/add-feed', postController.createFeed);

module.exports = router;
