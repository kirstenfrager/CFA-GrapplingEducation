var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/athletes', function(req, res, next) {
  res.render('athletes');
});

module.exports = router;
