import { expect } from '../config/helpers/chai-imports';
import { defineSupportCode } from 'cucumber';
import { browser, by, element } from 'protractor';

defineSupportCode(({Given, Then}) => {
    Given(/^I visit the Angular homepage$/, givenVisitHomepage);
     async function givenVisitHomepage(): Promise<void>{
        await browser.get('http://www.angularjs.org');
    }

    Given(/^I submit the name "([^"]*)"$/, givenSubmitName);
     async function givenSubmitName (name: string): Promise<void> {
        return element(by.model('yourName')).sendKeys(name);
    }

    Given(/^I count (\d+) todo's$/, givenCount);
     async function givenCount (amount: string): Promise<void> {
        const todoList = element.all(by.repeater('todo in todoList.todos'));

        await expect(todoList.count()).to.eventually.equal(+amount);
    }

    Given(/^I add the todo "([^"]*)"$/, giveAddTodo);
     async function giveAddTodo (todoText: string): Promise<void> {
        const addTodo = element(by.model('todoList.todoText'));
        const addButton = element(by.css('[value="add"]'));

        await addTodo.sendKeys(todoText);
        await addButton.click();
    }

    Then(/^I am greeted as "([^"]*)"$/,thenGreeted);
     async function thenGreeted (greetingText: string): Promise<void> {
        const greeting = element(by.binding('yourName'));

        await expect(greeting.getText()).to.eventually.equal(greetingText);
    }


    Then(/^the last todo should hold "([^"]*)"$/,thenTodoListHold);
     async function thenTodoListHold (todoText: string): Promise<void> {
        const todoList = element.all(by.repeater('todo in todoList.todos'));

        await expect(todoList.last().getText()).to.eventually.equal(todoText);
    }

    Then(/^I should have (\d+) todo's$/, thenHaveAmount);
     async function thenHaveAmount (amount: string): Promise<void> {
        const todoList = element.all(by.repeater('todo in todoList.todos'));
        await expect(todoList.count()).to.eventually.equal(+amount);
    }
});