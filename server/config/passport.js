const LocalStrategy = require('passport-local').Strategy;
const user = require("../model/user");
const bcrypt = require('bcrypt');

module.exports = (passport) => {
    //Local Strategy
    passport.use(new LocalStrategy( (username, password, done) => {

        //Match Username
        user.findOne({username:username}, (err, userDetails) => {
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
        console.log('serializeUser');
        done(null, user)
    });

    passport.deserializeUser((req, user, done) => {
        console.log('deserializeUser');
        user.findById( user._id, async (err, userDetails) => {
            if (err) {
                done(err);
            }
            if (userDetails) {
                done(null, userDetails);
            } else {
                done(null, false);
            }
        });
    });
}