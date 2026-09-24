Feature: Verify facebook login function

Scenario: Validate faecebook login
    Given I launch chrome browser
    When I navigate to facebook website
    Then I enter username
    Then I enter password
    Then I click login button