'use strict';

const protractorFlake = require('protractor-flake');
const argv = require('yargs').argv;

protractorFlake({
    maxAttempts: 2,
    parser: 'cucumber',
    protractorArgs: [
        './e2e-tests/config/protractor.e2e.conf.js',
        `--feature=${argv.feature || '*'}`,
        `--tags=${argv.tags || ''}`
    ]
}, (status) => {
    process.exit(status);
});
