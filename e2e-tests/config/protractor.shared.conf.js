'use strict';
const argv = require('yargs').argv;
const path = require('path');
const multiCucumberHTLMReporter = require('multiple-cucumber-html-reporter');

exports.config = sharedConfig();

function sharedConfig() {
    const config = {
        framework: 'custom',
        frameworkPath: require.resolve('protractor-cucumber-framework'),
        cucumberOpts: {
            compiler: "ts:ts-node/register",
            require: [
                path.resolve(process.cwd(), './e2e-tests/**/after.scenario.ts'),
                path.resolve(process.cwd(), './e2e-tests/**/cucumber.config.ts'),
                path.resolve(process.cwd(), './e2e-tests/**/reporter.ts'),
                path.resolve(process.cwd(), './e2e-tests/**/*.steps.ts')
            ],
            tags: ''
        },
        specs: getFeatureFiles(),

        onPrepare: function () {
            // place something here
            return browser.getCapabilities()
                .then((capabilities) => {
                    browser.browserName = capabilities.get('browserName').toLowerCase();
                })
        },
        // afterLaunch: function () {
        //     multiCucumberHTLMReporter.generate({
        //         openReportInBrowser: true,
        //         jsonDir: '.tmp/json-output',
        //         reportPath: './.tmp/report/'
        //     });
        // },

        allScriptsTimeout: 11000,
        disableChecks: true,

        // From `protractor-cucumber-framework`, allows cucumber to handle the 199 exception and record it appropriately
        ignoreUncaughtExceptions: true
    };

    return config;
}

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
