"use strict";

var engines = require("../engines/engines.js");

var Engine = function(name, schema) {
  this.name = name;
  var self = this;
  if(!engines[name]) {
    return error("Engine not supported: "+name);
  }
  Object.keys(engines[name]).forEach(function(k){
    self[k] = engines[name][k];
  });
  this.init = function(callback){
    var driver = null;
    try {
      driver = require(this.name);
    } catch(e) {
      process.stdout.write("Engine not installed: "+this.name+", installing ..\n");
      npm.load({ quiet: true }, function(err, npm) {
        npm.localPrefix = __dirname
        npm.commands.install([self.name], function(err, data){
          self.init(callback);
        });
      });
      return;
    }
    try {
      this.instance = this.setup(driver, schema);
    } catch(e) {
      return callback(e.message);
    }
    callback();
  };
}

module.exports = Engine;
