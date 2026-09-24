import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium } from "playwright";
import { pageFixture } from "../Utils/pageFixture";

// setDefaultTimeout(10 * 1000);
let browser: Browser, context: BrowserContext;
//Before -> Launch the browser
Before(async function () {
  // Write code
  browser = await chromium.launch({
    headless: false,
    args: ["--start-maximized"],
  });

  context = await browser.newContext({ viewport: null });
  //   page = await context.newPage();
  pageFixture.page = await context.newPage();
});

//After - Close the browser
// After(async function () {
//   // setDefaultTimeout(40_000);
//   await pageFixture.page.setDefaultTimeout(40_000);
//   await pageFixture.page.close();
//   await context.close();
//   await browser.close();
// });
