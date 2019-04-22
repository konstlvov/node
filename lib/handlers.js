//привет
var _data = require('./data');
var helpers = require('./helpers');
var handlers = {};

// ping handler
handlers.ping = function(data, callback) {
  //callback(406, {'name': 'ping handler'});
  callback(200);
}

// hello handler
handlers.hello = function(data, callback) {
  callback(200, {'welcomeMessage': 'Hello, world!'});
}

handlers.users = function(data, callback) {
  var acceptableMethods = ['get', 'post', 'put', 'delete'];
  if(acceptableMethods.indexOf(data.method.toLowerCase()) > -1) {
    // underscore by convention means "private method"
    handlers._users[data.method](data, callback);
  } else {
    callback(405); // 405 code means "HTTP method not allowed"
  }
}

handlers._users = {};

handlers._users.post = function(data, callback){
  var firstName = typeof(data.payload.firstName) == 'string'
    && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;;
  var lastName = typeof(data.payload.lastName) == 'string'
    && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;;
  var phone = typeof(data.payload.phone) == 'string'
    && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;;
  var password = typeof(data.payload.password) == 'string'
    && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;;
  var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean'
    && data.payload.tosAgreement == true ? true : false;;
  if (firstName && lastName && phone && password && tosAgreement) {
    _data.read('users', phone, function(err, data){
      if (err) {
        // going to hash the password
        var hashedPassword = helpers.hash(password);
      } else {
        callback(400, {'Error': 'User with phone ' + phone + ' already exists'});
      }
    });
  } else {
    callback(400, {'Error': 'Missing one or more required fields'});
  }
}

handlers._users.get = function(data, callback){
}

handlers._users.put = function(data, callback){
}

handlers._users.delete = function(data, callback){
}

// not found hanlder
handlers.notFound = function(data, callback) {
  callback(404);
}

module.exports = handlers;
