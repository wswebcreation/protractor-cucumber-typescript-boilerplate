'use strict';

const protractorFlake = require('protractor-flake');

protractorFlake({
    maxAttempts: 2,
    parser: 'cucumberMulti',
    protractorArgs: [
        './e2e-tests/config/protractor.e2e.conf.js',
        `--feature=${argv.feature || '*'}`,
        `--tags=${argv.tags || ''}`
    ]
}, (status) => {
    process.exit(status);
});
