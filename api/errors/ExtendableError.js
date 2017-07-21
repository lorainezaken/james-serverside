"use strict";

let HttpStatus = require('http-status-codes');

module.exports = class ExtendaleError extends Error {
  constructor (data, status, errDetails) {

    // Calling parent constrcutor of base Error class.
    super(data);

    // Capturing stack trace, excluding constructor call from it.
    Error.stackTraceLimit = 3;
    Error.captureStackTrace(this, this.constructor);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Put INTERNAL_SERVER_ERROR if no status is specified
    this.status = status || HttpStatus.INTERNAL_SERVER_ERROR;

    // Additional errDetails
    this.errDetails = errDetails;
  }

  toJSON() {
    let ret = {
      type:    this.name,
      message: this.message,
      errDetails: this.errDetails
    }; 

    if (process.env.NODE_ENV === 'test')
      ret.stack = this.stack;
    
    return ret;
  }
};