﻿// container for all the environments
var environments = {};

// Staging (default) env
environments.staging = {
   'httpPort': 3000
  ,'httpsPort': 3001
  ,'envName': 'staging'
};

// production
environments.production = {
   'httpPort': 5000
  ,'httpsPort': 5001
  ,'envName': 'production'
};

var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;
