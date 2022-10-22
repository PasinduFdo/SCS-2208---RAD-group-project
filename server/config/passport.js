const LocalStrategy = require('passport-local').Strategy;
const user = require("../models/user");
const dbconfig = require('./database');
const bcrypt = require('bcrypt');

module.exports = (passport) => {
    //Local Strategy
    passport.use(new LocalStrategy( (username, password, done) => {

        //Match Username
        user.findOne({email:username}, (err, userDetails) => {
            if (err) {
                return done(err);
            }

            if (!userDetails) {
                console.log('Incorrect Username');
                return done(null,false, {message : 'Incorrect Username'});
            }

            //Match Password
            bcrypt.compare(password,userDetails.password, (err,result) => {

                if (err) {
                    return done(err, false);
                }
                if (result === false) {
                    console.log('Incorrect Password');
                    return done(null,false,{message : 'Incorrect Password'});
                }

                console.log('Authenticated');
                return done(null,userDetails);
            });

        });
    }));

    passport.serializeUser((user,done) => {
        done(null, user.email)
    });

    passport.deserializeUser((username,done) => {
        user.findOne({email:username}, (err, userDetails) => {
            done(err,userDetails);
        });
    });
}