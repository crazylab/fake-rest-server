/*
 * Copyright (c) 2014, Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

module.exports = function (server, config) {
    var controller = require('./controller.js')(config.DEFAULT_ROUTES_PATH);

    server.post('/__add', controller.add);
    server.del('/__remove', controller.remove);
    server.del('/__flush', controller.flush);
    server.get(/(.*)/, controller.match);
    server.post(/(.*)/, controller.match);
    server.del(/(.*)/, controller.match);
    server.patch(/(.*)/, controller.match);
};
