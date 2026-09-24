Feature: Verify keyboard and mouse actions
    @keyboard
    Scenario: Validate keyboard and mouse actions
        Given I launch chrome browser
        Then I handle keyboard actions via playwright
        Then I handle right click
        Then I handle double click

    @mouseActions
    Scenario: Validate drag and drop functionality
        Given I launch chrome browser
        Then I handle drag and drop using mouse actions
        Then I handle drag and drop via playwright

