import { binding, given, when, then } from 'cucumber-tsflow';

@binding()
export default class PendingSteps {
    @given(/^Johnny visits the Angular homepage$/)
    public givenVisitsAngularHomepage (): Promise<string> {
        return Promise.resolve('pending');
    }

    @when(/^he clicks on the first link$/)
    public whenClicksOnFirstLink (): Promise<string> {
        return Promise.resolve('pending');
    }

    @then(/^he expects that something happens$/)
    public async thenExpectSomething (): Promise<string> {
        return Promise.resolve('pending');
    }

}