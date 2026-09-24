Feature: Account register for New user and login with credentials
    @ecom
    Scenario: Register user with credentials and take screenshot
        Given I launch chrome browser
        Then I register the user and take screenshot


    @login
    Scenario: Login user with credentials and take screenshot
        Given I launch chrome browser
        Then I login with user credentials