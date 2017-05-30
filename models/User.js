var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User schema
var UserSchema = mongoose.Schema({
    username: {
      type: String,
      index: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    facebook: {
      id: String,
      token: String,
      email: String,
      firstName: String,
      lastName: String,
    },
  });

// variable we can access outside this file
var User = module.exports = mongoose.model('User', UserSchema);

// user functions
// create user
module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.getUserByUsername = function(username, callback) {
  var query = { username: username };
  User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err) throw err;
    callback(null, isMatch);
  });
};
