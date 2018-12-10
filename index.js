var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

var server = http.createServer(function (req, res) {

  var parsedUrl = url.parse(req.url, true); // 'true' flag tells node to convert query string to Object
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+\/+$/g, ''); // wtf?
  console.log('you have requested path:' + path);
  console.log('you have requested trimmed path:' + trimmedPath);
  //
  var method = req.method; // typeof req.method is string
  console.log('Requested method is: ' + method); // GET
  //
  var headers = req.headers;
  //console.log('Request headers:\n' + JSON.stringify(headers));
  console.log('Request headers:', headers); // more pretty printed in console
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
      ,'payload': payload
    }
    //calling handler
    chosenHandler(data, function(statusCode, payload){
      //statusCode == typeof(statusCode) == 'number'
    });

    // moving res.end into the handler of 'end' event of req object
    res.end('Hello world привет');
    console.log('Request received with payload: ', buffer);
  });
});

server.listen(3000, function() {
  console.log('слушаю на порту 3000...');
});

var handlers = {};

// sample handler
handlers.sample = function(data, callback) {
  callback(406, {'name': 'sample handler'});
}

// not found hanlder
handlers.notFound = function(data, callback) {
  callback(404);
}

// router
var router = {
  'sample': handlers.sample
};

// scratchpad below:
//
// echo system('curl localhost:3000/users/123')
//
// non-empty query string:
// echo system('curl localhost:3000/users/123?mode=userinfo')
