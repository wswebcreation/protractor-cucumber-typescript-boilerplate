import { element, by, ElementFinder } from 'protractor';
import { Assertions } from '../testResources/Assertions';


export class Contacts extends Assertions {
  static po = {

    CONTACT_BTN: { type: 'xpath', value: '//div[@class="main-menu"]//a[contains(@href,"contact")]'},
    KNOWLEDGE_BASE_BTN: { type: 'xpath', value: '//p[.="Visit Knowledge Base"]'},
    SEARCH_TXT_FLD: { type: 'css', value: '[name="query"]'},
    FST_SRCH_RESULT: { type: 'css', value: '.search-result:first-child a:first-child'},
    ART_AUTHOR: { type: 'css', value: '.article-author'},
    ART_DATE: { type: 'css', value: '.article-updated time'}
  };

}




