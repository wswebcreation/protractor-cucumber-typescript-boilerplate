import { binding, given, when, then } from 'cucumber-tsflow';

@binding()
export default class AmbiguousSteps {
    @given(/^Ambiguous Johnny visits the Angular homepage$/)
    public async givenAmbiguousVisitsAngularHomepage (): Promise<void> {
        return Promise.resolve();
    }

    @when(/^he clicks on the second button/)
    public async whenClicksOnSecondButton (): Promise<void> {
        return Promise.resolve();
    }

    @when(/^he clicks on the (.*) button/)
    public async whenClicksOnButton (which: string): Promise<void> {
        return Promise.resolve();
    }

    @then(/^he expects that something happens$/)
    public async thenExpectSomething (): Promise<string> {
        return Promise.resolve('pending');
    }

}