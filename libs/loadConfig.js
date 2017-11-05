var fs = require('fs');
var path = require('path');

const CONFIG_FILE_PATH = require('../consts/conf').CONFIG_FILE_PATH;
const DEFAULT_CONF = require('../consts/conf').DEFAULT_CONF;

var requireJsonFile = function (filePath) {
    var jsonObject = undefined;
    try {
        jsonObject = JSON.parse(fs.readFileSync(filePath, "utf8"))
    } catch (err) {
        console.log(err.message);
        return false;
    }
    return jsonObject;
};

module.exports = function () {
    var config = requireJsonFile(path.resolve(CONFIG_FILE_PATH));
    if (config) {
        console.log('Loading default routes from: ', path.resolve(config.DEFAULT_ROUTES_PATH));
        config['PORT'] = config['PORT'] || DEFAULT_CONF.PORT;
        config['DEFAULT_ROUTES_PATH'] = config['DEFAULT_ROUTES_PATH'] || DEFAULT_CONF.DEFAULT_ROUTES_PATH;
        config['LOG_DIR'] = config['LOG_DIR'] || DEFAULT_CONF.LOG_DIR;
    } else {
        console.log("Falling back to default configuration.");
        config = DEFAULT_CONF;
    }
    return config;
};