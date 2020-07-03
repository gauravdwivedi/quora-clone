const express = require("express");

const router = express.Router();
const passport = require('passport');
const postController = require("../controllers/post_controller");

router.get("/destroy/:id", passport.checkAuthentication, postController.destroy);
router.post("/create", passport.checkAuthentication, postController.create);
router.get('/add-feed', passport.checkAuthentication, postController.addFeed);
router.get('/ask', passport.checkAuthentication, postController.getQuestion);
router.post('/add-feed', postController.createFeed);
router.post('/add-question', passport.checkAuthentication, postController.createQuestion);

module.exports = router;
