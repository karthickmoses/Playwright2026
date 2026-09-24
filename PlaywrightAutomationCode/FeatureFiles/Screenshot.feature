Feature: verify screenshot functionality
    @screenshot
    Scenario: validate screenshot of functionality
        Given I launch chrome browser
        When  I navigate to orangeHRM website
        Then I log in into  orangeHRM website
        Then I take screenshot using playwright


# Feature: Verify screenshot function in playwright
    @screenshot2
    Scenario: Validate screenshot function in playwright
        Given I launch chrome browser
        When I navigate to testautomation practice website
        Then I take screenshot particular element
        Then I take screenshot visible level
        Then I take screenshot full page