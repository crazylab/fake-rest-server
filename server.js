/*
 * Copyright (c) 2014, Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';
var path = require('path');
var argv = require('yargs').argv;
var restify = require('restify');

var loadConfig = require('./libs/loadConfig');

var server = restify.createServer();
server.use(restify.bodyParser());

var config = loadConfig();
require('./routes/routes.js')(server, config);

const PORT = argv.port || config.PORT;

if (module.parent) {
    module.exports = server.server;
} else {
    server.listen(PORT, function () {
        console.log('%s listening at %s', server.name, server.url);
    });
}
