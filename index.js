// echo system('curl localhost:3000/users/123')
var http = require('http');
var url = require('url');

var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url);
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+\/+$/g, ''); // wtf?
  console.log('you have requested path:' + path);
  console.log('you have requested trimmed path:' + trimmedPath);
  var method = req.method; // typeof req.method is string
  console.log('Requested method is: ' + method); // GET
  res.end('Hello world привет');
});

server.listen(3000, function() {
  console.log('слушаю на порту 3000...');
});
