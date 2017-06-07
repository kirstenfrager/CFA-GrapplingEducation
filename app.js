require('dotenv').config();

var express = require('express');
var expressValidator = require('express-validator');
var exphbs = require('express-handlebars');
var flash = require('connect-flash');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var MongoStore = require('connect-mongo')(session);

const mlabpassword = process.env.DBPASSWORD

var mongoose = require('mongoose');
// mongoose.connect(`mongodb://grapplingeducation:${mlabpassword}@ds113282.mlab.com:13282/grappling-education`);
mongoose.connect('mongodb://localhost/grapplingeducation')
var db = mongoose.connection;

// files used for routes
var index = require('./routes/index');
var contact = require('./routes/contact');
var users = require('./routes/users');
var dashboard = require('./routes/dashboard');
var timekit = require('./routes/timekit');
var programs = require('./routes/programs');
var athletes = require('./routes/athletes');
var bookings = require('./routes/bookings');

// initialise the app
var app = express();

// view engine setup. want a folder called views to handle views
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
  defaultLayout: 'layout',
  partialsDir: __dirname + '/views/partials/',
 }));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// publicly accessible in the browser. eg images, stylesheets, jquery
app.use(express.static(path.join(__dirname, 'public')));

// middleware for express session
app.use(session({
  secret: 'grapplingeducation',
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

// passport initialise
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// middleware for the validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.'),
        root    = namespace.shift(),
        formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// connect flash
app.use(flash());

// flash variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  // if user is there then can access the user from anywhere, if not will be null
  res.locals.user = req.user || null;
  next();
});

// middleware for route files
app.use('/', index);
app.use('/', contact);
app.use('/', dashboard);
app.use('/', programs);
app.use('/', athletes);
app.use('/', bookings);
app.use('/users', users);
app.use('/timekit', timekit);

app.set('port', (3001));
// app.listen(process.env.PORT || 3000, function(){
//   console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });

// app.listen(app.get('port'), function() {
//   console.log('Server started on port '+app.get('port'));
// });

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
