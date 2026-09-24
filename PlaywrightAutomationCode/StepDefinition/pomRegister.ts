import { When } from "@cucumber/cucumber";
import { pageFixture } from "../Utils/pageFixture";
import RegisterPage from "../PageObjectModel/RegisterPage";
import eComRegister from "../TestData/eComRegister.json";

let rp = new RegisterPage();

When("I register with user credentials using POM", async () => {
  await rp.ecomRegister(
    eComRegister.url,
    eComRegister.firstName,
    eComRegister.lastName,
    eComRegister.email,
    eComRegister.phoneNumber,
    eComRegister.password,
    eComRegister.confirmPassword
  );
  await rp.pageScreenshot("ecomRegisterFixed","jpeg");
  });
