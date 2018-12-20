var fs = require('fs');
var path = require('path');

var lib = {};

// Base directory of the data folder
// __dirname is built-in node keyword. It has value of path where we are right now
lib.baseDir = path.join(__dirname, '/../.data/');

lib.create = function(dir, file, data, errHandlerFunc) {
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
              errHandlerFunc(false); // false means there is no error
            }
            else {
              errHandlerFunc('Error closing file ' + file + '.json');
            }
          });
        }
        else {
          errHandlerFunc('Error writing to new file ' + file + '.json');
        }
      });
    }
    else {
      errHandlerFunc('Could not create file ' + file + '.json' + ' in dir ' + dir + ' May be it exists already');
    }
  });
};

lib.read = function(dir, file, callback) {
  fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function(err, data) {
    callback(err, data);
  });
};


// errHandlerFunc is a function that accepts string with error description, if there was an error,
// and false if everything is fine
lib.update = function(dir, file, data, errHandlerFunc) {
  var fileFullPath = lib.baseDir + dir + '/' + file + '.json';
  fs.open(fileFullPath, 'r+', function(err, fileDescriptor){
    if(!err && fileDescriptor) {
      var stringData = JSON.stringify(data);
      fs.truncate(fileDescriptor, function(err){
        if(!err) {
          // write to the file and close it
          fs.writeFile(fileDescriptor, stringData, function(err){
            if (!err) {
              fs.close(fileDescriptor, function(err){
                if (!err) {
                  errHandlerFunc(false); // success
                } else {
                  errHandlerFunc('Error closing file ' + fileFullPath);
                }
              });
            } else {
              errHandlerFunc('Error writing to existing file ' + fileFullPath);
            }
          });
        } else {
          errHandlerFunc('There was error truncating file ' + fileFullPath);
        }
      });
    }
    else {
      errHandlerFunc('Could not update file ' + lib.baseDir + dir + '/' + file + '.json, it may not exist yet');
    }
  });
};

lib.delete = function(dir, file, errHandlerFunc){
  // Unlink the file ... "unlink" means delete the file
  var fileFullPath = lib.baseDir + dir + '/' + file + '.json';
  fs.unlink(fileFullPath, function(err){
    if(!err) {
      errHandlerFunc(false);
    } else {
      errHandlerFunc('Error unlinking file ' + fileFullPath);
    }
  });
};

module.exports = lib;
