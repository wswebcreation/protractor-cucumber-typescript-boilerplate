@example @happy-flow @angular
Feature: Happy flow V3

  Background: Open Angular homepage
    Given I visit the Angular homepage

  @visitor @julie
  Scenario: As a visitor I want to be greeted
    Given I submit the name "Julie"
    Then I am greeted as "Hello Julie!"

  @todo @count @validate
  Scenario: Validate todo list
    Given I count 2 todo's
    Then the last todo should hold "build an AngularJS app"

  @todo @count @add
  Scenario: Add a todo
    Given I add the todo "write a protractor test"
    Then I should have 3 todo's
    And the last todo should hold "write a protractor test"