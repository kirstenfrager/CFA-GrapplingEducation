var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res, next) {
  const userId = req.session.passport.user;
  User.find({})
  .then(user => {
    res.render('timekit', { user: user });
  })
});

module.exports = router;
