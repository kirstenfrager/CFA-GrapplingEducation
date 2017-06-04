var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/programs', function(req, res, next) {
  res.render('programs');
});

module.exports = router;
