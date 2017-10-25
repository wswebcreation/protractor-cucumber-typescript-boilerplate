'use strict';
const argv = require('yargs').argv;
const fs = require('fs-extra');
const path = require('path');

exports.config = {
    /**
     * Protractor specific
     */
    allScriptsTimeout: 11000,
    disableChecks: true,

    beforeLaunch: () => {
        console.log(`\n==========================================================================`);
        console.log(`\nThe directory './tmp', which holds reports / screenshots is being removed.\n`);
        console.log(`==========================================================================\n`);
        fs.removeSync('./.tmp');
    },

    /**
     * CucumberJS specific
     */
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        compiler: "ts:ts-node/register",
        require: [
            path.resolve(process.cwd(), './e2e-tests/**/after.scenario.ts'),
            path.resolve(process.cwd(), './e2e-tests/**/cucumber.config.ts'),
            path.resolve(process.cwd(), './e2e-tests/**/*.steps.ts')
        ],
        format: 'json:.tmp/results.json',
        tags: argv.tags || ''
    },
    specs: getFeatureFiles(),

    /**
     * From `protractor-cucumber-framework`, allows cucumber to handle the 199
     * exception and record it appropriately
     */
    ignoreUncaughtExceptions: true,

    /**
     * The new reporting plugin
     */
    plugins: [{
        package: 'protractor-multiple-cucumber-html-reporter-plugin',
        options: {
            automaticallyGenerateReport: true,
            metadataKey: 'deviceProperties',
            removeExistingJsonReportFile: true,
            removeOriginalJsonReportFile: true
        }
    }]
};

/**
 * Get the featurefiles that need to be run based on an command line flag that is passed, if nothing is passed all the
 * featurefiles are run
 *
 * @example:
 *
 * <pre>
 *     // For 1 feature
 *     npm run e2e -- --feature=playground
 *
 *     // For multiple features
 *     npm run e2e -- --feature=playground,dashboard,...
 *
 *     // Else
 *     npm run e2e
 * </pre>
 */
function getFeatureFiles() {
    if (argv.feature) {
        return argv.feature.split(',').map(feature => `${process.cwd()}/e2e-tests/**/${feature}.feature`);
    }

    return [`${process.cwd()}/e2e-tests/**/*.feature`];
}
