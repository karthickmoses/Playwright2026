import { When } from "@cucumber/cucumber";
import { pageFixture } from "../Utils/pageFixture";
import LoginPage from "../PageObjectModel/LoginPage";
import eComCredentials from "../TestData/eComCredentials.json";

let lp = new LoginPage();

When("I login with user credentials using POM", async () => {
  await lp.ecomLogin(
    eComCredentials.loginUrl,
    eComCredentials.user1.email,
    eComCredentials.user1.password,
  );
  //   await lp.launchUrl(eComCredentials.loginUrl);
  //   await lp.enterEmail(eComCredentials.user2.email);
  //   await lp.enterPassword(eComCredentials.user2.password);
  //   await lp.clickLoginBtn();
  //   await pageFixture.page.screenshot({ path: "./test-result/screenshots/login.png" });
});

/*
When("I login with user credentials using POM", async()=>{
   await pageFixture.page.goto(
    "https://ecommerce-playground.lambdatest.io/index.php?route=account/login",
  );
  await pageFixture.page.locator("input#input-email").fill("rockrandyortons@gmail.com");
  await pageFixture.page.locator("input#input-password").fill("abcd4567");
  await pageFixture.page.locator("//input[@type='submit']").click();
  await pageFixture.page.screenshot({ path: "./test-result/screenshots/login.png" });
});
*/
