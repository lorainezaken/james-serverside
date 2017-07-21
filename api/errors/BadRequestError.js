"use strict";

let ExtendableError = require('./ExtendableError.js'),
    HttpStatus = require('http-status-codes');

module.exports = class BadRequestError extends ExtendableError {
  constructor(data, errDetails) {
    super(data, HttpStatus.BAD_REQUEST, errDetails);
  }
}