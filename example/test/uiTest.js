var assert = require('assert');
var webdriver = require('selenium-webdriver');

var httpClient = require('../httpClient');

var By = webdriver.By,
    until = webdriver;

var driver;

describe('UI Test', function () {
    before(function () {
        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
    });

    after(function () {
        driver.quit();
    });

    describe('display message', function () {
        var mockResponseForMessageEndpoint = {
            "route": "/api/message",
            "responseCode": 200,
            "responseBody": "Hello There."
        };
        before(function () {
            httpClient.post("http://localhost:3012/__add", mockResponseForMessageEndpoint,
                {"Content-Type": "application/json"},
                function (responseBody, res, err) {
                    if (err) throw err;
                }
            )
        });

        after(function () {
            httpClient.delete("http://localhost:3012/__remove", mockResponseForMessageEndpoint,
                {"Content-Type": "application/json"},
                function (responseBody, res, err) {
                    if (err) throw err;
                }
            )
        });

        var DISPLAY_MESSAGE_CONTAINER_CSS = '#message > h2';
        it('should display message served from /api/message endpoint', function (done) {
            driver.get('http://localhost:3000');
            driver.findElement(By.css(DISPLAY_MESSAGE_CONTAINER_CSS)).getText().then(function (data) {
                assert.equal(data, "Hello There.");
                done()
            });
        })
    });
});