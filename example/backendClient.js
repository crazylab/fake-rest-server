var url = require('url');
var httpClient = require('./httpClient');

var backendHost = require('./config').backend.host;

module.exports = function (uri, callback) {
    var uri = url.resolve(backendHost, uri);
    httpClient.get(uri, callback)
};