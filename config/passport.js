const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv/config');
require('./../app');



//Load User Model
const User = mongoose.model('users');

module.exports = function(passport){
    /*****************************GOOGLE STRATEGY******************/
    passport.use(
        new GoogleStrategy({
            clientID: process.env.googleClientID,
            clientSecret: process.env.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true
        }, 
        (accessToken, refreshToken, profile, done)=>{

            const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
            const newUser = {
                googleID: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                image: image
            }
            
            //Check for existing user
            User.findOne({
                email: profile.emails[0].value
            }).then(user => {
                if(user){
                    user.googleID = profile.id;
                    user.image = image;
                    
                    user.save()
                    .then(then => done(null, user))
                    .catch(err => console.log(err));
                    
                   
                }else{
                   //Create user
                    new User(newUser)
                        .save()
                        .then(then => done(null, user));
                }
            })
        })
    );


    /******************************LOCAL STRATEGY**************************/
     passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
         let userEmail = email.toLowerCase();
        //Match User
        User.findOne({
            email: userEmail
        }).then(user => {
            if(!user){
                return done(null, false, {message: 'No User Found'});
            }
            
            //Match Password
            bcrypt.compare(password, user.password, (err, isMatch)=>{
                if(err) throw err;
                
                if(isMatch){
                    return done(null, user)
                }else{
                    return done(null, false, {message: 'Password Incorrect'});
                }
            })
        })    
    }));
   
    passport.serializeUser((user, done)=>{
        done(null, user.id)
    });
    
    passport.deserializeUser((id, done)=>{
        User.findById(id).then(user => done(null, user));
    });
    
}