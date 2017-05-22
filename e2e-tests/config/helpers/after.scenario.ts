import { HookScenario } from 'cucumber';
import { binding, after } from 'cucumber-tsflow';
import * as path from 'path';
import { browser } from 'protractor';
import { WriteStream, ensureDirSync, createWriteStream } from 'fs-extra';

@binding()
export default class AfterScenario {

    @after()
    public afterScenario(scenarioResult: HookScenario): Promise<void> {
        return (scenarioResult.isFailed()) ? this.saveFailedScenarioScreenshot(scenarioResult) : Promise.resolve();
    }

    /**
     * Save a screenshot when a scenario failed
     */
    private async saveFailedScenarioScreenshot(scenarioResult: HookScenario) {
        const screenshot = await(browser.takeScreenshot());
        const decodedImage = new Buffer(screenshot.replace(/^data:image\/png;base64,/, ''), 'base64');
        const fileName = `${scenarioResult.getName()
            .replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s/g, '-')
            .toLowerCase().substr(0,100)}.png`;

        scenarioResult.attach(decodedImage, 'image/png');

        this.saveScreenshot(screenshot, fileName);

        return Promise.resolve();
    }

    /**
     * Save a screenshot
     */
    private saveScreenshot(screenshot: string, fileName: string) {
        const screenshotPath = path.resolve(process.cwd(), '.tmp/screenshots');
        const filepath = path.resolve(screenshotPath, fileName);

        let stream: WriteStream;

        ensureDirSync(screenshotPath);
        stream = createWriteStream(filepath);
        stream.write(new Buffer(screenshot, 'base64'));
        stream.end();
    }
}