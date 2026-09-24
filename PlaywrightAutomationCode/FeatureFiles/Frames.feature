Feature: Verify frames using playwright
@frames
Scenario: Validate frames
    Given I launch chrome browser
    # Then I handle single frame
    Then I handle nested frame