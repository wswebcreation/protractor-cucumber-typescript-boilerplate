'use strict';
const argv = require('yargs').argv;
const fs = require('fs-extra');
const path = require('path');

exports.config = {
    /**
     * Protractor specific
     */
    directConnect:true,
    getPageTimeout: 59000,
    allScriptsTimeout: 58000,
    disableChecks: true,

    beforeLaunch: () => {
        console.log(`\n==========================================================================`);
        console.log(`\nThe directory './tmp', which holds reports / screenshots is being removed.\n`);
        console.log(`\nThe directory './reports', which holds existed reports is being removed.\n`);
        console.log(`==========================================================================\n`);
        fs.removeSync('./.tmp');
        fs.removeSync('./reports');
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
        format: 'json:.tmp/cucumber-test-results.json',
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
            jsonOutputPath: path.resolve(process.cwd(), 'reports' ,  'protractor-multiple-cucumber-html-reporter-output'),
            reportPath: path.resolve(process.cwd(), 'reports'),
            reportName: 'protractor-multiple-cucumber-html-reporter.html',

            automaticallyGenerateReport: true,
            metadataKey: 'deviceProperties',
            removeExistingJsonReportFile: true,
            removeOriginalJsonReportFile: false,
            customData: {
                title: 'Run info',
                data: [
                    {label: 'Project', value: 'Ashok Temp Proj'},
                    {label: 'Release', value: '1.2.3'},
                    {label: 'Cycle', value: 'B11221.34321'},
                    {label: 'Execution Start Time', value: 'Nov 19th 2017, 02:31 PM EST'},
                    {label: 'Execution End Time', value: 'Nov 19th 2017, 02:56 PM EST'}
                ]
            }
        }
    }],
    afterLaunch: function afterLaunch() {
        // Incase of parallel execution the protractor-multiple-cucumber-html-reporter-plugin will not generate entire report hence this helps
        const reporter = require('cucumber-html-reporter');
        const options = {
            // theme: '['bootstrap', 'hierarchy', 'foundation', 'simple']',
            theme: 'foundation',
            // jsonFile: 'reports/protractor-cucumber-results.json',
            jsonDir: '.tmp',
            output: 'reports/cucumber-html-reporter.html',
            reportSuiteAsScenarios: true,
            launchReport: false
        };

        reporter.generate(options);
    }
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
