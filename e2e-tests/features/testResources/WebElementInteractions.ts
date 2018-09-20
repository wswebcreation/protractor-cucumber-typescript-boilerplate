import { browser, by, protractor } from 'protractor';


export class WebElementInteraction {

    //Events on element

    //isDisplayed
    //isVisible
    //isPresent
    //isAttributeContains
    //isCssValueContains
    //isSelected
    //getLocation
    //evaluate
    //isElementPresent
    //getCssValue
    // getAttribute
    //takeScreenshot
    //getText
    //getSize

    public get(key: { type: string; value: string }, method: string, bInstance?: any): any {
        let browserInstance = bInstance ? bInstance : browser;

        return browserInstance['element'](by[key.type](key.value))[method]();
    }

    public enter(key: { type: string; value: string }, text: string, bInstance?: any) {
        let browserInstance = bInstance ? bInstance : browser;

        return this.getElement(key, browserInstance).clear().then(() => {
            return this.getElement(key, browserInstance).sendKeys(text);
        });
    }

    public enterWithOutClearingText(key: { type: string; value: string }, text: string, bInstance?: any) {
        let browserInstance = bInstance ? bInstance : browser;

        return browserInstance['element'](by[key.type](key.value)).sendKeys(text);
    }

    public clickOn(key: { type: string; value: string }, bInstance?: any) {
        let browserInstance = bInstance ? bInstance : browser;

        return this.getElement(key, browserInstance).click();
    }

    public waitToDisappear(key: { type: string; value: string }, time: number, bInstance?: any) {
        /* The time frame should less than allScriptsTimeout mention in config file
         * if we provide more time than allScriptsTimeout, Then the condition waits for allScriptsTimeout value and will not consider the given value
         */
        let EC = protractor.ExpectedConditions;
        let browserInstance = bInstance ? bInstance : browser;
        return browserInstance.wait(EC.stalenessOf(browserInstance['element'](by[key.type](key.value))), time);
    }

    public waitToAppear(key: { type: string; value: string }, time: number, bInstance?: any) {
        /* The time frame should less than allScriptsTimeout mention in config file
         * if we provide more time than allScriptsTimeout, Then the condition waits for allScriptsTimeout value and will not consider the given value
        */
        let EC = protractor.ExpectedConditions;
        let browserInstance = bInstance ? bInstance : browser;
        return browserInstance.wait(EC.visibilityOf(browserInstance['element'](by[key.type](key.value))), time);
    }

    public getElement(key: { type: string; value: string }, browserInstance?: any) {
        return browserInstance['element'](by[key.type](key.value));
    }

}
