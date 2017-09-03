'use strict';
const argv = require('yargs').argv;
const fs = require('fs-extra');
const path = require('path');
const multiCucumberHTLMReporter = require('multiple-cucumber-html-reporter');
let instanceData;
const resultsFolder = '.tmp/results';
const jsonOutputFolder = './.tmp/json-output-folder';
const cucumberReportName = `results`;


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
            format: [`json:${resultsFolder}/${cucumberReportName}.json`, 'pretty'],
            tags: ''
        },
        specs: getFeatureFiles(),

        beforeLaunch: () =>{
            fs.ensureDirSync(resultsFolder);
            fs.ensureDirSync(jsonOutputFolder);
        },

        onPrepare: function () {
            // place something here
            return browser.getCapabilities()
                .then((capabilities) => {
                    browser.browserName = capabilities.get('browserName').toLowerCase();

                    instanceData = {
                        pid: process.pid,
                        metadata: {
                            browser: {
                                name: browser.browserName,
                                version: 'latest'
                            },
                            device: 'MacBook Pro 15',
                            deviceType: 'laptop',
                            environment: 'local',
                            platform: {
                                name: 'OSX',
                                version: '10.12.6'
                            }
                        }
                    };
                });
        },
        onCleanUp: function () {
            if (fs.existsSync(`./${resultsFolder}/results.${instanceData.pid}.json`)) {
                const jsonReport = fs.readJsonSync(`./${resultsFolder}/${cucumberReportName}.${instanceData.pid}.json`);

                jsonReport.map((singleReport) => {
                    const featureName = singleReport.name.replace(/\s+/g, '_').replace(/\W/g, '').toLowerCase() || 'noName';
                    const filePath = path.join(jsonOutputFolder, `${featureName}.${browser.browserName}_${Date.now()}.json`);

                    // Remove a previous file if it exists to prevent double reports of 1 feature + browser execution
                    fs.readdirSync(jsonOutputFolder)
                        .filter((file) => file.match(new RegExp(`${featureName}.${browser.browserName}`, 'ig')))
                        .forEach((file) => fs.removeSync(`${jsonOutputFolder}/${file}`));

                    singleReport.metadata = instanceData.metadata;
                    fs.writeJsonSync(filePath, JSON.parse(`[${JSON.stringify(singleReport)}]`), { spaces: 2 });
                });
            } else {
                console.warn(`File: './${resultsFolder}/${cucumberReportName}.${instanceData.pid}.json' is not present.`);
            }
        },

        afterLaunch: function(){
            fs.removeSync(resultsFolder);

            multiCucumberHTLMReporter.generate({
                openReportInBrowser: true,
                jsonDir: '.tmp/json-output-folder',
                reportPath: './.tmp/report/'
            });
        },

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
