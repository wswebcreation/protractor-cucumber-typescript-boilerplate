'use strict';
const config = require('./protractor.shared.conf').config;

//When we don't provide address - Protractor pics idle port and run the server on its own.
// config.seleniumAddress = 'http://localhost:4444/wd/hub/';


//We have given 5 parallel instances in config - since we are passing only one feature only one instance will run
config.multiCapabilities = [
    {
        browserName: 'chrome',
        chromeOptions: {
            args: ['disable-popup-blocking', '--start-maximized', '--allow-running-insecure-content', '--disable-save-password-bubble[5]', 'no-sandbox', 'enable-automation']
        },
        shardTestFiles: true,
        maxInstances: 5,
        deviceProperties:{
            browser: {
                name: 'chrome',
                version: 'latest'
            },
            device: 'local development machine',
            platform: {
                name: 'osx',
                version: '10.12.6'
            }
        }
    }
    // ,
    // {
    //     browserName: 'firefox',
    //     "firefox_binary": "C:\\Program Files\\Mozilla Firefox 52\\firefox.exe",
    //     marionette: true,
    //     shardTestFiles: true,
    //     maxInstances: 5,
    //     deviceProperties:{
    //         browser: {
    //             name: 'firefox',
    //             version: 'latest'
    //         },
    //         device: 'local development machine',
    //         platform: {
    //             name: 'osx',
    //             version: '10.12.6'
    //         }
    //     }
    // }
];

exports.config = config;
