const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodeMailer = require('../mailers/forgot_password_mailer');
const verifyToken = require('../config/middleware').default;
const axios = require('axios');

module.exports.createUser = async function (req, res) {
    try {

        if (req.body.password != req.body.confirm_password) {
            console.log('Password is not matched !')
            return res.redirect('back');
        }

        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) { console.log('error in finding user in Signing-up'); return; }

            if (!user) {
                User.create(req.body, function (err, user) {
                    if (err) { console.log('error in creating user'); return; }

                    return res.redirect('/user/login');
                })
            } else {
                console.log('User not created');
                return res.redirect('back');
            }
        })

    } catch (err) {
        console.log('error :', err.message);
    }
}


//Shopify Movie Nomination Page
module.exports.shopifynomination = function (req, res) {
    return res.render('shopify-movie-nomination', {
        title: "Shopify Movie Nomination",
        path: "shopifynomination"
    });
}

module.exports.shopifynominationResults = async function (req, res) {
    try {

        const response = await axios.get('http://www.omdbapi.com/?apikey=3ca5df7&t=${val}')


    } catch (err) {
        console.log('error :', err.message);

    }
}



module.exports.profile = async function (req, res) {

    try {
        let user = await User.findById(req.params.id);

        return res.render('user_profile', {
            title: "User profile",
            path: 'profile',
            user: user
        })

    }
    catch (err) {
        return res.redirect('back');
    }
}

module.exports.login = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/');
    }

    return res.render('sign_in', {
        title: 'Login',
        path: 'login',
    })
}
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }

    return res.render('sign_up',
        {
            title: 'Sign-up',
            path: 'signup',
        })
}

module.exports.createSession = function (req, res) {
    console.log('Logged In Successfully');

    return res.redirect('/');

}

module.exports.destroySession = function (req, res) {
    req.logout();
    return res.redirect('/');
}

module.exports.resetPassword = function (req, res) {


    return res.render('forgot_password', {
        path: 'forgot-password',
        title: 'forgot password'
    });
}

module.exports.email_reset_password_link = async function (req, res) {
    try {

        let user = await User.findOne({
            email: req.body.email
        });

        if (user) {
            jwt.sign({ user }, 'ftf', { expiresIn: '5000s' }, (err, token) => {
                // nodeMailer.newForgotPassWordEmail(user.email,token);
                return res.status(200).json({
                    message: "This server do not attached to Redis Server so you cannot get email of reset link Sorry"
                })
            })
        } else {
            return res.status(500).json({
                message: "Email Address does not exsits"
            })
        }

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }


}

module.exports.changePassword = async function (req, res) {

    if (verifyToken(req.params.token)) {


        return res.render('password_emailreset', {
            path: 'email-reset',
            title: 'email Reset'
        })
    } else {
        return res.status(500).json({
            message: "Unauthorized token"
        })
    }
}