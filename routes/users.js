var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/User');

// register
router.get('/register', function(req, res, next) {
  res.render('register');
});

// login
router.get('/login', function(req, res) {
  res.render('login');
});

// register user
router.post('/register', function(req, res, next) {
  // get all the stuff submitted and put it into a variable
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  // validations
  req.checkBody('firstName', 'First name is required').notEmpty();
  req.checkBody('lastName', 'Last name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if(errors) {
    res.render('register', {
      errors: errors
    });
  } else {
      var newUser = new User({
          firstName: firstName,
          lastName: lastName,
          email: email,
          username: username,
          password: password,
      });

    User.createUser(newUser, function(err, user) {
      if(err) throw err;
      console.log(user);
    });

    req.flash('success_msg', 'You are registered and can now login');

    res.redirect('/users/login');
  }
});

// ********* dashboard /
router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
})

// facebook passport login routes
// Redirect the user to Facebook for authentication.  When complete, Facebook will redirect the user back to the application at /auth/facebook/callback
router.get('/auth/facebook', passport.authorize('facebook', { scope: ['email'] } ));

// Facebook will redirect the user to this URL after approval.
// ************ success redirirect maybe to dashboard???
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/users/login' }));

// Google passport login routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] } ));

router.get('/auth/google/callback',
  passport.authenticate('google', { successRedirect: '/',
                                      failureRedirect: '/users/login' }));

module.exports = router;
