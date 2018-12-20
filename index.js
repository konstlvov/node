var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs = require('fs');
var handlers = require('./lib/handlers');

// instantiate the HTTP server
var httpServer = http.createServer(function (req, res) {
  unifiedServer(req, res);
});

// instantiate the HTTPS server
var httpsServerOptions = {
   'key': fs.readFileSync('./https/key.pem')
  ,'cert': fs.readFileSync('./https/cert.pem')
};

var httpsServer = https.createServer(httpsServerOptions, function (req, res) {
  unifiedServer(req, res);
});

// start HTTP server
httpServer.listen(config.httpPort, function() {
  console.log(`HTTP-сервер: слушаю на порту ${config.httpPort} в конфигурации "${config.envName}" ...`);
});

// start HTTPS server
httpsServer.listen(config.httpsPort, function() {
  console.log(`HTTPS-сервер: слушаю на порту ${config.httpsPort} в конфигурации "${config.envName}" ...`);
});

var unifiedServer = function (req, res) {
  var parsedUrl = url.parse(req.url, true); // 'true' flag tells node to convert query string to Object
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');
  console.log('you have requested path: ' + path);
  console.log('you have requested trimmed path: ' + trimmedPath);
  //
  var method = req.method; // typeof req.method is string
  console.log('Requested method is: ' + method); // GET
  //
  var headers = req.headers;
  //console.log('Request headers:\n' + JSON.stringify(headers));
  console.log('Request headers: ', headers); // more pretty printed in console
  console.log('Requested host: ' + headers.host);
  //
  var queryStringObject = parsedUrl.query;
  console.log('queryStringObject: ', queryStringObject);
  //
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  //
  // обработчк on('data'...) может вызываться несколько раз, по мере поступления данных
  req.on('data', function(data) {
    buffer += decoder.write(data);
  });
  //
  req.on('end', function() {
    buffer += decoder.end();
    var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
    var data = {
      'trimmedPath': trimmedPath
      ,'queryStringObject': queryStringObject
      ,'method': method
      ,'headers': headers
      ,'payload': buffer
    }
    //calling handler
    chosenHandler(data, function(statusCode, payload){
      statusCode == typeof(statusCode) == 'number' ? statusCode : 200;
      payload = typeof(payload) == 'object'? payload : {};
      var payloadString = JSON.stringify(payload); // string we are sending to user
      // instead of res.end sending something useful
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
      console.log('Request received with payload: ', buffer);
      console.log('Returning this response: ', statusCode, payloadString);
    });
  });
};

// router
var router = {
   'ping': handlers.ping
  ,'hello': handlers.hello
};

// scratchpad below:
//var _data = require('./lib/data');

// testing (@TODO: delete this)

//_data.create('test', 'newFile', {'foo': 'bar'}, function(err){
//  if(!err) {
//    console.log('create() function succeeded');
//  } else {
//    console.log('this was the error creating the file: ', err);
//  }
//});
//
// test read method, TODO: delete this
//_data.read('test', 'newFile', function(err, data){
//  console.log('this was the error ', err , ' and it was the data ', data);
//});
// test of update method, TODO: delete this
//_data.update('test', 'newFile', {'foo': 'bar baz bats boo moo foo', "moo": "boooo"}, function(err){
//  if (!err) {
//    console.log('update() function test succeeded');
//  } else {
//    console.log('this was the error in update() function: ', err);
//  }
//});
// test of update method, TODO: delete this
// 
// ... nice, it logs delete() before it logs create(), but works correctly
//
//_data.delete('test', 'newFile', function(err){
//  if (!err) {
//    console.log('delete() function test succeeded');
//  } else {
//    console.log('this was the error in delete() function: ', err);
//  }
//});

//
// this may be pasted in Vim command mode:
//
// you type
// :echo system('curl localhost:3000/hello')
//
// and it responds:
//   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
//                                  Dload  Upload   Total   Spent    Left  Speed
// 
//   0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
// 100    34    0    34    0     0    435      0 --:--:-- --:--:-- --:--:--   435{"welcomeMessage":"Hello, world!"}
//
//
// non-empty query string:
// echo system('curl localhost:3000/users/123?mode=userinfo')
// echo system('curl localhost:3000/users/123')
