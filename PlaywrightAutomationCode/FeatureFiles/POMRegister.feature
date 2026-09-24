Feature: Verify register functionality using POM

    @registerPOM
    Scenario: Register user with credentials and take screenshot using POM
        When I register with user credentials using POM

    @registerPOMAssertion
    Scenario: Register user with credentials and take screenshot using POM with Assertions
        When I register with user credentials using POM with Assertions