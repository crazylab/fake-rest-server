var url = require('url');
var http = require('http');

var handleResponse = function (callback) {
    return function (res) {
        var body = [];
        res.on('data', function (chunk) {
            body.push(chunk);
        }).on('end', function () {
            body = Buffer.concat(body).toString();
            callback(body, res);
        });
    }
};

var sendRequestWithPayload = function (method, href, data, headers, callback) {
    var requestedUrl = url.parse(href);
    callback = callback || function () {
        };
    headers = headers || {"Content-Type": "application/json"};

    var options = {
        hostname: requestedUrl.hostname,
        port: +requestedUrl.port,
        method: method,
        path: requestedUrl.path,
        headers: headers,
        auth: requestedUrl.auth
    };
    var req = http
        .request(options, handleResponse(callback))
        .on('error', function (e) {
            callback(undefined, undefined, e)
        });

    req.end(JSON.stringify(data));
};

var httpClient = {
    get: function (url, callback) {
        http
            .get(url, handleResponse(callback))
            .on('error', function (e) {
                callback("Error connecting to backend server: " + e.message);
            });
    },

    post: function (url, data, headers, callback) {
        sendRequestWithPayload('POST', url, data, headers, callback);
    },

    delete: function (url, data, headers, callback) {
        sendRequestWithPayload('DELETE', url, data, headers, callback);
    }
};

module.exports = httpClient;