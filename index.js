var http = require('http');
var url = require('url');

var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true); // true tells node to convert query string to Object
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+\/+$/g, ''); // wtf?
  console.log('you have requested path:' + path);
  console.log('you have requested trimmed path:' + trimmedPath);
  var method = req.method; // typeof req.method is string
  console.log('Requested method is: ' + method); // GET
  var headers = req.headers;
  //console.log('Request headers:\n' + JSON.stringify(headers));
  console.log('Request headers:', headers); // more pretty printed in console
  console.log('Requested host: ' + headers.host);
  var queryStringObject = parsedUrl.query;
  console.log(queryStringObject);
  console.log(JSON.stringify(queryStringObject));
  res.end('Hello world привет');
});

server.listen(3000, function() {
  console.log('слушаю на порту 3000...');
});

// scratchpad below:
//
// echo system('curl localhost:3000/users/123')
//
// non-empty query string:
// echo system('curl localhost:3000/users/123?mode=userinfo')
