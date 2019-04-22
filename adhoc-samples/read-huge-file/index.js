var fs = require('fs');
var es = require('event-stream'); // install this package using: >npm install event-stream
var s = fs.createReadStream('./my_huge_file.txt')
  .pipe(es.split())
  .pipe(es.mapSync(function(line){
   // do something with the line:
   console.log('*' + line + '*'); // don't know why Vim cannot capture this output, but it works when running node from cmd.exe shell
}));
