const passport = require('passport');

const JWTStrategy = require('passport-jwt').Strategy;

//extract jwt token from header part
const ExtractJWT = require('passport-jwt').ExtractJwt; 


//User for authentication
const User =require('../models/user');

console.log('inside JWT Strategy')
let opts ={
    jwtFromRequest :ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: 'quora'
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id,function(err,user){
        if(err){
            console.log('Error in finding the user in JWT'); return;
        }

        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }

    })
}))


module.exports =passport;