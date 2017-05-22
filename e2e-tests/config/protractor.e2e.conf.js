'use strict';
const config = require('./protractor.shared.conf').config;

config.baseUrl = 'http://localhost:5555';

config.multiCapabilities = [
    {
        browserName: 'chrome',
        chromeOptions: {
            args: ['disable-infobars']
        },
        shardTestFiles: true,
        maxInstances: 5
    }
];

exports.config = config;