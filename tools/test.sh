#!/bin/sh
../bin/jsm -s ../test/fixtures/products-schema.json ../test/fixtures/products-invalid.json -e is-my-json-valid $*
