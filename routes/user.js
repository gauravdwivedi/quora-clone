const express = require('express');

const router = express.Router();

const passport = require('passport');
const userController = require('../controllers/user_controller');

router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.get('/login', userController.login);
router.get('/sign-up', userController.signUp);
router.post('/create', userController.createUser);
router.get('/reset-password',userController.resetPassword);
router.post('/email_reset_password_link',userController.email_reset_password_link);

router.get('/shopifynomination',userController.shopifynomination);
//not working on heroku becz heroku does not provide redis-server without CreditCard
router.get('/change_password_via_email/:token',userController.changePassword);

// //use passport as a middleware to authenticate 
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: 'login' }
), userController.createSession);

router.get('/sign-out', userController.destroySession);

module.exports = router;