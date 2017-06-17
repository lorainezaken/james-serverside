const mongoose = require('mongoose');
const Promise = require('bluebird');

module.exports = () => {
    mongoose.Promise = Promise;
    mongoose.connect("mongodb://james:james@ds129402.mlab.com:29402/james");
}