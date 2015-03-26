var jsm = require('./');

var json = {};
var schema = {
  type: 'object'
};
var options = {};

jsm.createEngine('tv4', function(err, engine){
  engine.validate(json, schema, options, function(err, res){
    console.log(res);
  });
});
