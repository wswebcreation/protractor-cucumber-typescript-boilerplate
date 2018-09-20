import { expect } from '../config/helpers/chai-imports';
import { defineSupportCode } from 'cucumber';
import { browser, by, element, protractor, $ } from 'protractor';
import { promise } from 'selenium-webdriver';
import { HomePage } from './pageObjects/HomePage';
import { Form } from './pageObjects/Form';
import { Contacts } from './pageObjects/Contacts';

const EC = protractor.ExpectedConditions;

defineSupportCode(({Given, When, Then}) => {
    let homepage = new HomePage();
    let form = new Form();
    let contacts = new Contacts();

    Given(/^website (.*) should launch$/, async function (url: string) {
        browser.ignoreSynchronization = true;

        await browser.get(url);
    });

    When(/^Click on get a demo button$/, async function () {
        let ACCEPT_TERMS = await homepage.get(HomePage.po.ACCEPT_TERMS, 'isPresent');

        if (ACCEPT_TERMS) {
            await homepage.clickOn(HomePage.po.ACCEPT_TERMS);
            await homepage.clickOn(HomePage.po.REQUEST_DEMOM);
        } else {
            await homepage.clickOn(HomePage.po.REQUEST_DEMOM);
        }
    });

    Then(/^A form should display to fill personal info$/, async function () {
        // browser.switchTo().frame(element(by.xpath('//iframe[contains(@src,"request-demo")]')));
        browser.switchTo().frame(element(by.tagName('iframe')).getWebElement());
        await form.shouldDisplay(Form.po.FORM_VIEW);
    });

    When(/^Fill the form with below mentioned details and dont submit the form$/, async function (dataTable) {
        let data = dataTable.hashes()[0];
        console.log(data);

        await form.enterWithOutClearingText(Form.po.FIRST_NAME, data.firstname);
        await form.enterWithOutClearingText(Form.po.LAST_NAME, data.lastname);
        await form.enterWithOutClearingText(Form.po.JOB_TITLE, data.jobtitle);
        await form.enterWithOutClearingText(Form.po.COMPANY, data.company);
        await form.enterWithOutClearingText(Form.po.EMAIL, data.email);
        await form.enterWithOutClearingText(Form.po.PHONE, data.phone);
        await form.enterWithOutClearingText(Form.po.COUNTRY, data.country);
        await form.enterWithOutClearingText(Form.po.MESSAGE, data.message);

        await browser.switchTo().defaultContent();

        await element(by.css('[title="Close"]')).click();
        await browser.wait(EC.stalenessOf($('.fancybox-overlay')), 10000);
    });

    When(/^Click on contact info button on home page$/, async function () {
        await contacts.clickOn(Contacts.po.CONTACT_BTN);
    });

    When(/^Click on Knowledge Base button$/, async function () {
        await contacts.clickOn(Contacts.po.KNOWLEDGE_BASE_BTN);
    });

    When(/^Search for the text (.*) and select first result/, async function (text) {

        await contacts.enterWithOutClearingText(Contacts.po.SEARCH_TXT_FLD, text);
        await browser.actions().sendKeys(protractor.Key.ENTER).perform();
        await contacts.clickOn(Contacts.po.FST_SRCH_RESULT);
    });

    When(/^The article writer should be (.*) and article has been updated on (.*)$/, async function (name, date) {

        await contacts.textShouldEqual(Contacts.po.ART_AUTHOR, name);
        await contacts.shouldContainText(Contacts.po.ART_DATE, date);
    });
});