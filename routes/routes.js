/*
 * Copyright (c) 2014, Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

'use strict';

var controllerModule = require('./controllerModule.js');

module.exports = function (server, config) {
    controllerModule.preloadRoutes(config.DEFAULT_ROUTES_PATH);

    var controller = controllerModule.getController();
    server.post('/__add', controller.add);
    server.del('/__remove', controller.remove);
    server.del('/__flush', controller.flush);
    server.get(/(.*)/, controller.match);
    server.post(/(.*)/, controller.match);
};
