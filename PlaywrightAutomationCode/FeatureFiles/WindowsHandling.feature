Feature: Verify windows handling using playwright

    @windows
    Scenario: Validate windows handling
        Given I launch chrome browser
        # Then I handle new tabbed windows
        # Then I handle new seperate widnows
        Then I handle multi seperate windows