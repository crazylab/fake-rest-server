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
    server.post('/add', controller.add);
    server.post('/remove', controller.remove); // todo: convert to delete
    server.del('/flush', controller.flush);
    server.get(/(.*)/, controller.match);
    server.post(/(.*)/, controller.match);
};
