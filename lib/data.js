var fs = require('fs');
var path = require('path');

var lib = {};

// Base directory of the data folder
// __dirname is built-in node keyword. It has value of path where we are right now
lib.baseDir = path.join(__dirname, '/../.data/');

// callback is an error-handling function here
lib.create = function(dir, file, data, callback) {
  // open file for writing
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function(err, fileDescriptor){
    if(!err && fileDescriptor) {
      // convert data to string
      var stringData = JSON.stringify(data);
      // write to file and close it
      fs.writeFile(fileDescriptor, stringData, function(err){
        if (!err) {
          fs.close(fileDescriptor, function(err){
            if(!err){
              callback(false); // false means there is no error
            }
            else {
              callback('Error closing file ' + file + '.json');
            }
          });
        }
        else {
          callback('Error writing to new file ' + file + '.json');
        }
      });
    }
    else {
      callback('Could not create file ' + file + '.json' + ' in dir ' + dir + ' May be it exists already');
    }
  });
};

lib.read = function(dir, file, callback) {
  fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function(err, data) {
    callback(err, data);
  });
};


lib.update = function(dir, file, callback) {
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function(err, fileDescriptor){
    if(!err && fileDescriptor) {
    }
    else {
      callback('Could not update file ' + lib.baseDir + dir + '/' + file + '.json');
    }
  });
};

module.exports = lib;
