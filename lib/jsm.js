"use strict";

var Engine = require('./engine');

var JSM = function(engine){
  var name = engine || 'tv4';
  this.engine = new Engine(name);
}

JSM.prototype.init = function(callback) {
  this.engine.init(callback);
}

JSM.prototype.validate = function(data, schema, options, callback) {
  this.engine.validate(data, schema, options, callback);
}

module.exports = {
  createEngine: function(name, callback){
    var engine = new JSM(name);
    engine.init(function(){
      callback(null, engine);
    });
  }
};
