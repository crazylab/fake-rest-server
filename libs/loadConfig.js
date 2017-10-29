var fs = require('fs');
var path = require('path');

const CONFIG_FILE_PATH = require('../consts/conf').CONFIG_FILE_PATH;
const DEFAULT_CONF = require('../consts/conf').DEFAULT_CONF;

var requireJsonFile = function (filePath) {
    var jsonObject = undefined;
    try {
        jsonObject = JSON.parse(fs.readFileSync(filePath, "utf8"))
    } catch (err) {
        console.log("Error loading/parsing file: ");
        console.log(err.message);
    }
    return jsonObject;
};

module.exports = function () {
    var configFilePath = path.resolve(CONFIG_FILE_PATH);
    var config = requireJsonFile(configFilePath);
    if (config) {
        console.log('Loading default routes from: ', path.resolve(config.DEFAULT_ROUTES_PATH));
    } else {
        console.log("Falling back to default configuration.");
        config = DEFAULT_CONF
    }
    return config;
};