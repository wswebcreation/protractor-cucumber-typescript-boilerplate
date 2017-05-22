import { binding, given, when, then } from 'cucumber-tsflow';
import { expect } from '../config/helpers/chai-imports';
import { TableDefinition } from 'cucumber';
import { browser, by, element } from 'protractor';

@binding()
export default class ExampleSteps {

    @given(/^I visit the Angular homepage$/)
    public async GivenVisitHomepage(): Promise<void> {
        await browser.get('http://www.angularjs.org');
    }

    @given(/^I submit the name "([^"]*)"$/)
    public async GivenSubmitName (name: string): Promise<void> {
        return element(by.model('yourName')).sendKeys(name);
    }

    @given(/^I count (\d+) todo's$/)
    public async GivenCount (amount: string): Promise<void> {
        const todoList = element.all(by.repeater('todo in todoList.todos'));

        await expect(todoList.count()).to.eventually.equal(+amount);
    }

    @given(/^I add the todo "([^"]*)"$/)
    public async GiveAddTodo (todoText: string): Promise<void> {
        const addTodo = element(by.model('todoList.todoText'));
        const addButton = element(by.css('[value="add"]'));

        await addTodo.sendKeys(todoText);
        await addButton.click();
    }

    @then(/^I am greeted as "([^"]*)"$/)
    public async ThenGreeted (greetingText: string): Promise<void> {
        const greeting = element(by.binding('yourName'));

        await expect(greeting.getText()).to.eventually.equal(greetingText);
    }


    @then(/^the last todo should hold "([^"]*)"$/)
    public async ThenTodoListHold (todoText: string): Promise<void> {
        const todoList = element.all(by.repeater('todo in todoList.todos'));

        await expect(todoList.last().getText()).to.eventually.equal(todoText);
    }

    @then(/^I should have (\d+) todo's$/)
    public async ThenHaveAmount (amount: string): Promise<void> {
        const todoList = element.all(by.repeater('todo in todoList.todos'));

        await expect(todoList.count()).to.eventually.equal(+amount);
    }
}