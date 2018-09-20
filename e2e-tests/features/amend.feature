@amendedTest
Feature: Navigate to orgvue and complete the given task

  Background:
    Given website https://www.orgvue.com should launch

  Scenario: Navigate to the website request for demo

    When Click on get a demo button
    Then A form should display to fill personal info
    And  Fill the form with below mentioned details and dont submit the form
      | firstname | lastname | jobtitle      | company | email             | phone      | country | message                                  |
      | Ashok     | MS       | Test Engineer | Harman  | ashok.ms@test.com | 1234567890 | India   | These are test comments for sanity test. |
    And  Click on contact info button on home page
    And  Click on Knowledge Base button
    And  Search for the text Test and select first result
    Then The article writer should be Rob Hatley and article has been updated on 2018
