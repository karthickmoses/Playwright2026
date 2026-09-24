Feature: Verify alert functionality in Playwright
    @alertTypes
    Scenario: Validate alerts in playwright
        Given I launch chrome browser
        # Then I handle simple alert1
        # Then I handle confirm alert1
       # Then I handle prompt alert1
        Then I handle alert appear after 5 seconds