import { element, by, ElementFinder } from 'protractor';
import { Assertions } from '../testResources/Assertions';


export class Form extends Assertions {
  static po = {
    FORM_VIEW: { type: 'css', value: '[class="webform"]'},
    FIRST_NAME: { type: 'css', value: '[name="firstname"]'},
    LAST_NAME: { type: 'css', value: '[name="lastname"]'},
    JOB_TITLE: { type: 'css', value: '[name="jobtitle"]'},
    COMPANY: { type: 'css', value: '[name="company"]'},
    EMAIL: { type: 'css', value: '[name="email"]'},
    PHONE: { type: 'css', value: '[name="phone"]'},
    COUNTRY: { type: 'css', value: '[name="country"]'},
    MESSAGE: { type: 'css', value: '[name="message"]'}
  };

}




