var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/dashboard', ensureAuthenticated, ensureAdmin, function(req, res, next) {
  res.render('dashboard');
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
