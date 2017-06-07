var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../models/User');
var configAuth = require('./auth');

module.exports = function(passport) {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.getUserByUsername(username, function(err, user) {
        if(err) throw err;
        if(!user) {
          return done(null, false, { message: 'Unknown User' });
        }

        User.comparePassword(password, user.password, function(err, isMatch) {
          if(err) throw err;
          if(isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Invalid Pasword' });
          }
        });
      });
    }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });

// facebook passport stategy
  passport.use(new FacebookStrategy({
      clientID: configAuth.facebookAuth.FACEBOOK_APP_ID,
      clientSecret: configAuth.facebookAuth.FACEBOOK_APP_SECRET,
      callbackURL: configAuth.facebookAuth.FB_CALLBACK_URL,
      profileFields: ['id', 'emails', 'name'],
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        User.findOne({ 'facebook.id': profile.id }, function(err, user) {
          if(err)
            return done(err);
          if(user)
            return done(null, user);
          else {
            var newUser = new User();
            console.log(profile)
            newUser.facebook.id = profile.id;
            newUser.facebook.token = accessToken;
            newUser.facebook.firstName = profile.name.givenName;
            newUser.facebook.lastName = profile.name.familyName;
            newUser.facebook.email = profile.emails[0].value;

            newUser.save(function(err) {
              if(err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }));

// google passport strategy
    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.GOOGLE_APP_ID,
        clientSecret: configAuth.googleAuth.GOOGLE_APP_SECRET,
        callbackURL: configAuth.googleAuth.GOOGLE_CALLBACK_URL,
        // profileFields: ['id', 'emails', 'name'],
      },
      function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
          User.findOne({ 'google.id': profile.id }, function(err, user) {
            if(err)
              return done(err);
            if(user)
              return done(null, user);
            else {
              var newUser = new User();
              console.log(profile)
              newUser.google.id = profile.id;
              newUser.google.token = accessToken;
              newUser.google.firstName = profile.name.givenName;
              newUser.google.lastName = profile.name.familyName;
              newUser.google.email = profile.emails[0].value;

              newUser.save(function(err) {
                if(err)
                  throw err;
                return done(null, newUser);
              });
            }
          });
        });
      }));

};
