import {defineSupportCode, HookScenarioResult} from 'cucumber';
import * as path from 'path';
import {browser} from 'protractor';
import {WriteStream, ensureDirSync, createWriteStream} from 'fs-extra';

interface World {
    'attach': ((arg1: string | Buffer, arg2: string) => void);
}

/**
 * In CucumberJS version 3 the `HookScenarioResult` has been brought down from an object with all the
 * feature / scenario / step data in it to a bare minimum.
 * Because `@types/cucumber` is not compatible with CucumberJS 3 I've extended the `HookScenarioResult`
 * with the new interface
 */
interface TestCase extends HookScenarioResult {
    sourceLocation: ({
        uri: string;
        line: number
    });
    result: ({
        duration: number;
        status: string
    });
}

defineSupportCode(({After}) => {
    After(function (testCase: TestCase): Promise<void> {
        const world = this;
        return (testCase.result.status === 'failed') ? saveFailedScenarioScreenshot(<World> world, testCase) : Promise.resolve();
    });

    /**
     * Save a screenshot when a scenario failed
     */
    async function saveFailedScenarioScreenshot(world: World, testCase: TestCase) {
        const screenshot = await(browser.takeScreenshot());

        // Because the scenario name isn't available in CucumberJS 3 we now use the format
        // `${Date.now()}.${featureName}.${browserName}.png`
        const featureName = testCase.sourceLocation.uri.match(/([^\/]+)(?=\.\w+$)/)[0]
            .replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s/g, '-')
            .toLowerCase().substr(0, 100);
        const fileName = `${Date.now()}.${featureName}.${browser.browserName}.png`;

        world.attach(screenshot, 'image/png');

        saveScreenshot(screenshot, fileName);

        return Promise.resolve();
    }

    /**
     * Save a screenshot
     */
    function saveScreenshot(screenshot: string, fileName: string) {
        const screenshotPath = path.resolve(process.cwd(), '.tmp/screenshots');
        const filepath = path.resolve(screenshotPath, fileName);

        let stream: WriteStream;

        ensureDirSync(screenshotPath);
        stream = createWriteStream(filepath);
        stream.write(new Buffer(screenshot, 'base64'));
        stream.end();
    }
});
