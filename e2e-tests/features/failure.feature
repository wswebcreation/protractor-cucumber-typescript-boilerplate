@skip
Feature: Failure report
    Failed scenario's should have attached screenshots and stacktrace
    So a reviewer can judge what went wrong

  Background: Open Angular homepage
    Given I visit the Angular homepage

  Scenario: Check an incorrect to do amount
    Given I add the todo "write a protractor test"
    Then I should have 2 todo's
    And the last todo should hold "write a protractor test"