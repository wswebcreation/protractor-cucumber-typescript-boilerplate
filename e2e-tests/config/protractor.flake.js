'use strict';

const protractorFlake = require('protractor-flake');
const argv = require('yargs').argv;
let configFile = './e2e-tests/config/protractor.travis.conf.js';

if(argv.multiCap){
    configFile = './e2e-tests/config/protractor.e2e.conf.js';
    console.log('***************Executing Config*************',configFile);
}

protractorFlake({
    maxAttempts: 1,
    parser: 'cucumber',
    protractorArgs: [
        configFile,
        `--feature=${argv.feature || '*'}`,
        `--tags=${argv.tags || ''}`
    ]
}, (status) => {
    process.exit(status);
});
