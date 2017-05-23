import { defineSupportCode } from 'cucumber';

defineSupportCode(({Given, When, Then}) => {
    Given(/^Johnny visits the Angular homepage$/, givenVisitsAngularHomepage);
    function givenVisitsAngularHomepage (): Promise<string> {
        return Promise.resolve('pending');
    }

    When(/^he clicks on the first link$/,whenClicksOnFirstLink );
    function whenClicksOnFirstLink (): Promise<string> {
        return Promise.resolve('pending');
    }

    Then(/^he expects that something happens$/, thenExpectSomething);
    async function thenExpectSomething (): Promise<string> {
        return Promise.resolve('pending');
    }
});