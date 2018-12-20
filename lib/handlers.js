//привет
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

// not found hanlder
handlers.notFound = function(data, callback) {
  callback(404);
}

module.exports = handlers;
