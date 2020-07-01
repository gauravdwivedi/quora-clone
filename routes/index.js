const express = require("express");

const router = express.Router();
const passport = require('passport');

const homeController = require("../controllers/home_controller");
console.log("router loaded");


router.get("/", homeController.home);
router.use("/user", require("./user"));
router.use("/posts", require("./post"));

router.get("*", function (req, res) {
  res.send("What are you looking for bro ? Page does not exist!", 404);
});

module.exports = router;
