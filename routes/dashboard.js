var express = require('express');
var router = express.Router();
var User = require('../models/User');
var googleApiOne = require('../config/googleApiOne');
var googleApiThree = require('../config/googleApiThree');

/* GET home page. */
router.get('/dashboard', ensureAuthenticated, ensureAdmin, function(req, res, next) {
  const userId = req.session.passport.user;
  User.find({})
  .then(user => {
    res.render('dashboard', { user: user, timekitBookings: googleApiOne.timekitBookings, freeTime: googleApiThree.freeTime });
  })
});

// authenticate user
function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in.');
    res.redirect('/users/login');
  }
};

function ensureAdmin(req, res, next) {
   if (req.user.role === 'admin') {
     return next();
   } else {
     req.flash('error_msg', 'You are not permitted to view this page');
     res.redirect('/');
   }
 }

module.exports = router;
