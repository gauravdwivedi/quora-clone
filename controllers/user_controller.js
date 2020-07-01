const User = require('../models/user');

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

module.exports.profile = async function (req, res) {

    try {
        let user = await User.findById(req.params.id);

        return res.render('user_profile', {
            title: "User profile",
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
        title: 'Login'
    })
}
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }

    return res.render('sign_up',
        {
            title: 'Sign-up'
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