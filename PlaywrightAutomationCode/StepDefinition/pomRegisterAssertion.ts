import { When } from "@cucumber/cucumber";
import RegisterPageAssertions from "../PageObjectModel/RegisterPageAssertions";
import eComRegister from "../TestData/eComRegister.json";

const rp = new RegisterPageAssertions();

When("I register with user credentials using POM with Assertions", async () => {

    await rp.ecomRegister(
        eComRegister.url,
        eComRegister.firstName,
        eComRegister.lastName,
        eComRegister.email,
        eComRegister.phoneNumber,
        eComRegister.password,
        eComRegister.confirmPassword
    );

    await rp.pageScreenshot(
        "ecomRegisterFixer",
        "jpg"
    );
});