"use strict";

let ExtendableError = require('./ExtendableError.js'),
    HttpStatus = require('http-status-codes');

module.exports = class UnauthorizedError extends ExtendableError {
  constructor(data, errDetails) {
    super(data, HttpStatus.UNAUTHORIZED, errDetails);
  }
}