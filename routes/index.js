var express = require('express');
var router = express.Router();
var quickstart = require('../config/quickstart');

/* GET home page. */
router.get('/', function(req, res, next) {
  // const userId = req.session.passport.user;
  const hello = quickstart.hello;
  res.render('index', { title: 'Express', hello: hello });
});

module.exports = router;
