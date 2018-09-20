import { WebElementInteraction } from './WebElementInteractions';
import { browser, by, protractor } from 'protractor';

const chai = require('chai');
const expect = chai.expect;

export class Assertions extends WebElementInteraction {


    //Assertions

    //Use to find and assert the partial text of element

    public shouldDisplay(key:{ type: string; value: string }, browserInst?: any) {
        let browserInstance = browserInst ? browserInst : browser;
        let deferred = protractor.promise.defer();

        browserInstance['element'](by[key.type](key.value)).isDisplayed().then((isDisplayed:string) => {
            expect(isDisplayed).to.be.true;
            deferred.fulfill();
        });
        return deferred.promise;
    }

    public shouldContainText(key:{ type: string; value: string }, expText:string, browserInst?: any) {
        let browserInstance = browserInst ? browserInst : browser;
        let deferred = protractor.promise.defer();

        browserInstance['element'](by[key.type](key.value)).getText().then((actualText:string) => {
            expect(actualText).to.contain(expText);
            deferred.fulfill();
        });
        return deferred.promise;
    }

    public textShouldEqual(key:{ type: string; value: string }, expText:string, browserInst?: any) {
        let browserInstance = browserInst ? browserInst : browser;
        let deferred = protractor.promise.defer();

        browserInstance['element'](by[key.type](key.value)).getText().then((actualText:string) => {
            expect(actualText).to.equal(expText);
            deferred.fulfill();
        });
        return deferred.promise;
    }

}
