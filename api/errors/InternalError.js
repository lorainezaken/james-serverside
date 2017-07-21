"use strict";

let ExtendableError = require('./ExtendableError.js'),
    HttpStatus = require('http-status-codes');

module.exports = class InternalError extends ExtendableError {
  constructor(data, errDetails) {
    super(data, HttpStatus.INTERNAL_ERROR, errDetails);
  }
}