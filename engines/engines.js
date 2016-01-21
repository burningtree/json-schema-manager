// inspired by https://github.com/ebdrup/json-schema-benchmark/blob/master/index.js

module.exports = {
  'tv4': {
    setup: function(engine, schema) { 
      return engine;
    },
    validate: function(data, schema, options, cb) {
      var result = this.instance.validateResult(data, schema, 
        options.checkRecursive, options.banUnknownProperties);
      cb(null, { valid: result.error ? false : true, error: result.error } );
    }
  },
  'is-my-json-valid': {
    setup: function(engine, schema) {
      return engine(schema);
    },
    validate: function(data, schema, options, cb) {
      var result = this.instance(data);
      cb(null, { valid: result, error: this.instance.errors });
    }
  },
  'jsen': {
    setup: function(engine, schema) {
      return engine(schema);
    },
    validate: function(data, schema, options, cb) {
      var result = this.instance(data);
      cb(null, { valid: result, error: 'Not valid' });
    }
  },
  'themis': {
    setup: function(engine, schema) {
      return engine.validator(schema);
    },
    validate: function(data, schema, options, cb) {
      var result = this.instance(data, '0');
      cb(null, { valid: result.valid, error: result.errors });
    }
  },
  'z-schema': {
    setup: function(engine, schema) {
      var validator = new engine({ ignoreUnresolvableReferences: true });
      return validator;
    },
    validate: function(data, schema, options, cb) {
      var result = this.instance.validate(data, schema);
      cb(null, { valid: result, error: this.instance.getLastErrors() });
    }
  },
  'jsck': {
    setup: function(engine, schema) {
      return new engine.draft4(schema);
    },
    validate: function(data, schema, options, cb) {
      var result = this.instance.validate(data);
      cb(null, { valid: result.valid, error: result.errors });
    }
  },
  'jjv': {
    setup: function(engine, schema) {
      return new engine();
    },
    validate: function(data, schema, options, cb) {
      var result = this.instance.validate(schema, data);
      cb(null, { valid: result.length ? true : false, error: JSON.stringify(result, null, 2) });
    }
  },
  'JSV': {
    setup: function(engine, schema) {
      return engine;
    },
    validate: function(data, schema, options, cb) {
      var result = this.instance.JSV.createEnvironment().validate(data, schema);
      cb(null, { valid: !result.errors.length ? true : false, error: result.errors });
    }
  },
  'ajv': {
    setup: function(engine, schema) {
      return engine({ missingRefs: 'fail' });
    },
    validate: function(data, schema, options, cb) {
      var result = this.instance.validate(schema, data);
      cb(null, { valid: result, error: this.instance.errors });
    }
  }
};
