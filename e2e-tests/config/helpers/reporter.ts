import { Capabilities } from 'selenium-webdriver';
import { browser } from 'protractor';
const cucumber = require('cucumber');
const jsonFormatter = cucumber.Listener.JsonFormatter();
const fs = require('fs-extra');
const jsonFile = require('jsonfile');
const path = require('path');
const projectRoot = process.cwd();

module.exports = async function reportHook() {
    this.registerListener(jsonFormatter);
    await _generateAndSaveJSONFile();

    /**
     * Generate and save the report json files
     */
    async function _generateAndSaveJSONFile(): Promise<void> {
        jsonFormatter.log = async function (report: string) {
            const capabilities = await browser.getCapabilities();
            await _adjustAndSaveJSONFile(capabilities, report);
        };
    }

    /**
     * Adjust and save the json files
     */
    function _adjustAndSaveJSONFile(capabilities: Capabilities, report: string) {
        const browserName = capabilities.get('browserName');
        const jsonReport = JSON.parse(report);
        const featureName = jsonReport[0].name.replace(/\s+/g, '_').replace(/\W/g, '').toLowerCase() || 'noName';
        const snapshotPath = path.join(projectRoot, '.tmp/json-output');
        const filePath = path.join(snapshotPath, `${featureName}.${capabilities.get('browserName')}.${(new Date).getTime()}.json`);

        jsonReport[0].metadata = {
            'browser': {
                'name': browserName,
                'version': capabilities.get('version') || capabilities.get('browserVersion')
            },
            'device': 'MacBook Pro 15" 2017',
            'platform': {
                'name': 'osx',
                'version': '10.12.5'
            }
        };

        fs.ensureDirSync(snapshotPath);

        jsonFile.writeFileSync(filePath, jsonReport, {spaces: 2});
    }
};