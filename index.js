var http = require('http');
var url = require('url');

var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url);
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+\/+$/g, ''); // wtf?
  console.log('you have requested path:' + path);
  console.log('you have requested trimmed path:' + trimmedPath);
  res.end('Hello world');
});

server.listen(3000, function() {
  console.log('listening on port 3000...');
});
