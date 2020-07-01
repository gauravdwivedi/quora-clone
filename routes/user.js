const express = require('express');

const router = express.Router();

const passport = require('passport');
const userController = require('../controllers/user_controller');

router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.get('/login', userController.login);
router.get('/sign-up', userController.signUp);
router.post('/create', userController.createUser);

// //use passport as a middleware to authenticate 
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: 'users/login' }
), userController.createSession);

router.get('/sign-out', userController.destroySession);

module.exports = router;