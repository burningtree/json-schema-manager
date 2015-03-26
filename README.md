# JSON Schema manager (jsm) 

[![Build Status](https://travis-ci.org/burningtree/json-schema-manager.svg)](https://travis-ci.org/burningtree/json-schema-manager) [![Dependency Status](https://david-dm.org/burningtree/json-schema-manager.svg)](https://david-dm.org/burningtree/json-schema-manager) 
<!--[![NPM version](https://badge.fury.io/js/json-schema-manager.svg)](http://badge.fury.io/js/json-schema-manager)-->

Universal library and CLI for [JSON Schema](http://json-schema.org) validation.

For benchmarks see [json-schema-benchmark](https://github.com/ebdrup/json-schema-benchmark).

## Supported Engines
- [tv4](https://github.com/geraintluff/tv4)
- [is-my-json-valid](https://github.com/mafintosh/is-my-json-valid)
- [jsen](https://github.com/bugventure/jsen)
- [themis](https://github.com/playlyfe/themis)
- [z-schema](https://github.com/zaggino/z-schema)
- [jsck](https://github.com/pandastrike/jsck)
- [jjv](https://github.com/acornejo/jjv)
- [JSV](https://github.com/garycourt/JSV)

## Node.js Module
### Installation
```
$ npm install json-schema-manager
```

### Example
```javascript
var jsm = require('json-schema-manager');

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
```

## CLI
### Installation
```
$ npm install -g json-schema-manager
```

### Usage
```
  Usage: jsm [options] -s <schema> <files to check ...>

  Options:

    -h, --help                    output usage information
    -V, --version                 output the version number
    -s, --schema [schema]         Schema file
    -r, --check-recursive         Enable `checkRecursive` flag
    -u, --ban-unknown-properties  Enable `banUnknownProperties` flag

```

## LICENSE
(The MIT License)

Copyright (c) 2015 Jan Stránský &lt;jan.stransky@arnal.cz&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
