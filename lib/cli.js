"use strict";

var fs = require("fs"),
    path = require("path"),
    program = require("commander"),
    yaml = require("js-yaml"),
    npm = require("npm"),
    version = require("../package.json").version,
    Engine = require("./engine");

program
  .version(version)
  .usage("[options] <files to check ...>")
  .option("-s, --schema [schema]", "Schema file")
  .option("-e, --engine [validator]", "Specify validator to use", "tv4")
  .option("-v, --verbose", "Verbose", function (v, t) { return t + 1; }, 0)
  .option("-r, --check-recursive", "Enable `checkRecursive` flag")
  .option("-u, --ban-unknown-properties", "Enable `banUnknownProperties` flag");

function error(err) {
  process.stderr.write("Error: " + err + "\n");
  process.exit(1);
}

function verror(err) {
  if(err == undefined) {
    return null;
  }
  if(typeof err === 'string') {
    return err;
  }
  if(typeof err === 'object' && err.length) {
    var out = [];
    err.forEach(function(err){
      out.push(verror(err));
    });
    return out.join(', ' );
  }
  var out = err.message;
  if (err.dataPath) {
    out = out + " [path=" + err.dataPath + (err.schemaPath ? ", schemaPath=" + err.schemaPath : "") + "]";
  }
  if (err.field) {
    out = out + " [field="+ err.field +"]";
  }
  return out;
}

function loadFile(fn) {
  if (!fs.existsSync(fn)) {
    return error("File not exist: " + fn);
  }
  var content = fs.readFileSync(fn);
  var extname = path.extname(fn);
  var data = null;
  if (extname.match(/(yml|yaml)/)) {
    data = yaml.load(content);
  }
  if (data === null) {
    data = JSON.parse(content);
  }
  return data;
}

function cli() {
  program.parse(process.argv);

  var schemas = [];
  var debug = program.verbose;
  var banUnknownProperties = program.banUnknownProperties;
  var checkRecursive = program.checkRecursive;
  var engine = program.engine;

  if(debug) {
    process.stdout.write("Using engine: "+engine+"\n");
  }

  if (program.schema) {
    schemas.push(loadFile(program.schema));
  }

  if (program.args.length) {
    program.args.forEach(function (fn) {
      var data = loadFile(fn);
      if (debug) {
        process.stdout.write("File to validate: " + fn + "\n");
      }
      if (!schemas.length) {
        return error("no schema defined");
      }
      if (debug) {
        process.stdout.write("Schema against: " + program.schema + "\n");
      }
      var schema = schemas[0];
      var engine = new Engine(program.engine, schema);
      engine.init(function(err){
        if(err) {
          error("Engine not initialized: \n  "+err);
        }
        var options = {
          checkRecursive: checkRecursive,
          banUnknownProperties: banUnknownProperties
        };
        engine.validate(data, schema, options, function(err, res){
          if (!res.valid) {
            var error = res.error;
            process.stdout.write("Validation error: " + verror(error) + "\n");
            if (error && error.subErrors) {
              error.subErrors.forEach(function (err) {
                process.stdout.write("  Sub error: " + verror(err) + "\n");
              });
            }
            return false;
          }
          process.stdout.write("Validation OK.\n");
        });
      });
    });
  }

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

module.exports = cli;
