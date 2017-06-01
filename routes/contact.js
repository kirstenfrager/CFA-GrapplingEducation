var express = require('express');
var router = express.Router();
// var User = require('../models/user');

router.get('/contact', function(req, res) {
  res.render('contact');
});

router.post('/contact', function(req, res, next) {
  var api_key = process.env.SANDBOX_API_KEY;
  var domain = process.env.SANDBOX_DOMAIN;
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

  var data = {
    from: process.env.SANDBOX_EMAIL,
    to: process.env.SANDBOX_EMAIL_SENDTO,
    subject: 'Enquiry from ' + req.body.name,
    name: req.body.name,
    html: [
      "<b>Name: </b>" + req.body.name,
      "<b>Mobile: </b>" + req.body.mobile,
      "<b>Message: </b>" + req.body.message,
    ]
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
    if(!error) {
      req.flash('success_msg', 'Email Sent. Thank you.');
      res.redirect('/contact');
    } else {
      req.flash('error_msg', 'Error. Please try again.');
    }
  });
})

module.exports = router;
