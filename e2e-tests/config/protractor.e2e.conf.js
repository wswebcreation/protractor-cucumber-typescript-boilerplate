'use strict';
const config = require('./protractor.shared.conf').config;

config.baseUrl = 'http://localhost:5555';
config.seleniumAddress = 'http://localhost:4444/wd/hub/';

config.multiCapabilities = [
    {
        browserName: 'chrome',
        chromeOptions: {
            args: ['disable-infobars']
        },
        shardTestFiles: true,
        maxInstances: 5
    },
    {
        browserName: 'firefox',
        shardTestFiles: true,
        maxInstances: 5
    }
];

exports.config = config;