var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var chokidar = require('chokidar')
const watchDir = 'server';
var watcher = chokidar.watch('./' + watchDir) // каталог с файлами, изменения в которых приводят к сбросу кэша

app.use(function (rq, rs, next) {
    // Website you wish to allow to connect
    rs.setHeader('Access-Control-Allow-Origin', 'http://localhost:8090');
    // Request methods you wish to allow
    rs.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    rs.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    rs.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// This is example of how to use express to serve static files.
// DO NOT INCLUDE 'public' in URL! Put 'page.html' in 'public' directory and then use simple URL address: http://locahost:8090/page.html
app.use(express.static('public'));

app.use(express.json()); // for parsing application/json, this works only when Content-Length in reuqest headers is specified
//app.use(bodyParser.json()); // this works like string above
app.use(bodyParser.urlencoded({ extended: true })); // this works for parsing application/x-www-form-urlencoded: for hot weather widget

watcher.on('ready', function() {
  watcher.on('all', function() {
    console.log("Clearing [" + watchDir + "] module cache from server")
	// тут при конструировании регекспа надо использовать то же, что было передано в chokidar.watch
	const rx = RegExp("[/\\\\]" + watchDir + "[\/\\\\]");
    Object.keys(require.cache).forEach(function(id) {
		rx.lastIndex = 0;
		if (rx.test(id)) {
			console.log('about to delete require.cache entry ' + id);
			delete require.cache[id];
		}
    })
  })
})

// Можно сгруппировать эндпойнты по разным модулям. Например, тут используются два модуля:
// index для заглавной страницы и endpoints для оконечных точек эмулятора
app.use(function (req, res, next) {
  require('./' + watchDir + '/index')(req, res, next);
})

app.use(function (req, res, next) {
  require('./' + watchDir + '/endpoints')(req, res, next);
})

app.listen(8090, function () {
  console.log('Emulator is listening on port 8090!');
});
