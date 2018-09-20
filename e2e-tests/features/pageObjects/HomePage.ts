import { element, by, ElementFinder } from 'protractor';
import { Assertions } from '../testResources/Assertions';


export class HomePage extends Assertions {
  static po = {

    ACCEPT_TERMS: { type: 'css', value: '[id="hs-eu-confirmation-button"]'},
    REQUEST_DEMOM: { type: 'xpath', value: '//a[contains(@href,"request-demo")]'}
  };

}




