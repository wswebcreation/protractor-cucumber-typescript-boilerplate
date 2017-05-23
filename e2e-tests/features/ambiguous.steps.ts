import { defineSupportCode } from 'cucumber';

defineSupportCode(({Given, When, Then}) => {
    Given(/^Ambiguous Johnny visits the Angular homepage$/, givenAmbiguousVisitsAngularHomepage)
     async function givenAmbiguousVisitsAngularHomepage (): Promise<void> {
        return Promise.resolve();
    }

    When(/^he clicks on the second button/, whenClicksOnSecondButton);
    async function whenClicksOnSecondButton (): Promise<void> {
        return Promise.resolve();
    }

    When(/^he clicks on the (.*) button/, whenClicksOnButton);
    async function whenClicksOnButton (which: string): Promise<void> {
        return Promise.resolve();
    }

    Then(/^he expects that something really ambiguous happens$/, thenReallyExpectSomething);
    async function thenReallyExpectSomething (): Promise<string> {
        return Promise.resolve('pending');
    }

    Then(/^he expects that something (.*) ambiguous happens$/, thenExpectSomething);
    async function thenExpectSomething (really: string): Promise<string> {
        return Promise.resolve('pending');
    }
});