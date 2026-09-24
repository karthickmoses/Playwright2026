import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "playwright";
import eComRegister from "../TestData/eComRegister.json";

setDefaultTimeout(10 * 1000);
let browser: Browser; //undefined
let context: BrowserContext; //undefined -> incognito
let page: Page; //undefined

Given("I launch chrome browser", async function () {
  // Write code here
  browser = await chromium.launch({
    headless: false,
    args: ["--start-maximized"],
  });
  context = await browser.newContext({ viewport: null });
  page = await context.newPage();
  //  page = await browser.newPage();
});



When('I navigate to facebook website', async function () {
  // Write code here that turns the phrase above into concrete actions
  await page.goto("https://www.facebook.com/");

});



Then('I enter username', async function () {
  // Write code here that turns the phrase above into concrete actions
  //  return await page.locator("//input[@name='email']").fill("playwright");
  // return await page.locator("//label[text()='Email address or mobile number']").fill("playwright");
  await page.getByText('Email address or mobile number').fill("playwright");
});



Then('I enter password', async function () {
  // Write code here that turns the phrase above into concrete actions
  //  return await page.locator("//input[@name='pass']").fill("abcd@123");
  await page.getByText('Password', { exact: true }).fill("abcd@1234");


});


Then('I click login button', async function () {
  // Write code here that turns the phrase above into concrete actions
  //  await page
  // return await page.locator("//span[text()='Log in']").click();
  await page.getByRole('button', { name: 'Log in' }).click();
});



When('I navigate to orangeHRM website', async function () {
  // Write code here that turns the phrase above into concrete actions
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
});



Then('I log in into  orangeHRM website', async function () {
  // Write code here that turns the phrase above into concrete actions
  await page.getByPlaceholder('Username').fill("Admin");
  await page.getByPlaceholder('Password').fill("admin123");
  await page.getByRole('button', { name: 'Login' }).click();
});

When('I navigate to testautomation practice website', async function () {
  await page.goto('https://testautomationpractice.blogspot.com/');
});



// Then('I take screenshot using playwright', async function () {
//   // Write code here that turns the phrase above into concrete actions
//   //  jpg,png,jpeg are accepted
//   let logo = await page.locator("//img[@alt='client brand banner']");
//   await page.waitForSelector("//p[text()='Punched Out']");
//   await logo.screenshot({ path: "./test-result/screenshots/logo.jpg" });
//   await page.screenshot({ path: "./test-result/screenshots/visiblePage.jpeg" });
//   await page.screenshot({ path: "./test-result/screenshots/fullPage.png", fullPage: true });




// });

//jpg, jpeg or png
Then("I take screenshot particular element", async () => {
  await page
    .getByPlaceholder("Enter Name")
    .screenshot({ path: "./Screenshots/NameElement.jpg" });
});
Then("I take screenshot visible level", async () => {
  await page.screenshot({ path: "./Screenshots/VisibleLevel.jpeg" });
});

//default fullpage:false
Then("I take screenshot full page", async () => {
  await page.screenshot({ path: "./Screenshots/FullPage.png", fullPage: true });
});

Then("I handle single select dropdown", async () => {
  await page.getByText("Country:").scrollIntoViewIfNeeded();
  //Dropdown -> select by Value, Visible Text, Index
  //allInnerTexts()  allTextContents()
  let countryList = await page
    .locator("//select[@id='country']")
    .allInnerTexts();
  for (let country of countryList) {
    // console.log(country);

    if (country.includes("United Kingdom")) {
      //visibleText
      await page.selectOption("//select[@id='country']", {
        label: "United Kingdom",
      });

      //value
      // await page.selectOption("//select[@id='country']", "uk");
    }
  }
});
//CSS selector
//id->#<id's att. value>
//class-> .<class's att.value>
Then("I handle multi select dropdown2", async () => {
  // let colorList = await page.locator("#colors").allTextContents();
  let colorList = await page.locator("#colors").allInnerTexts();
  for (let color of colorList) {
    // console.log(color);
    await page.selectOption("#colors", ["blue", "yellow", "red"]);
  }
});

Then("I handle dynamic dropdown2", async () => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  // await page.locator("//input[@id='autocomplete']").type("au");
  await page.locator("//input[@id='autocomplete']").pressSequentially("co");
  await page.waitForSelector(".ui-menu-item-wrapper");
  console.log("====Country Suggestions=====");
  let uoCountries = await page.locator(".ui-menu-item-wrapper").allInnerTexts();
  for (let country of uoCountries) {
    console.log(country);
    if (country.includes("Mexico")) {
      //await page.locator(".ui-menu-item-wrapper").click(); => provide 'strict mode violation' error
      await page.getByText(country).click();
    }
  }
});

Then("I handle simple alert1", async () => {
  await page.goto("https://demoqa.com/alerts");

  //Listeners - listen for alert and complete the actions
  page.on("dialog", async (dialog) => {
    await page.waitForTimeout(1000);
    console.log("Alert_Type:", dialog.type());
    console.log("Alert_Message:", dialog.message());
    await dialog.accept();
  });

  await page.locator("#alertButton").click();
});

Then("I handle confirm alert1", async () => {
  await page.goto("https://demoqa.com/alerts");

  //Listeners - listen for alert and complete the actions
  page.on("dialog", async (dialog) => {
    await page.waitForTimeout(1000);
    console.log("Alert_Type:", dialog.type());
    console.log("Alert_Message:", dialog.message());
    // await dialog.accept();
    await dialog.dismiss();
  });

  await page.locator("#confirmButton").click();
});

Then("I handle prompt alert1", async () => {
  await page.goto("https://demoqa.com/alerts");

  //Listeners - listen for alert and complete the actions
  page.on("dialog", async (dialog) => {
    await page.waitForTimeout(1000);
    console.log("Alert_Type:", dialog.type());
    console.log("Alert_Message:", dialog.message());
    await dialog.accept("Selenium Automation");
    // await dialog.dismiss();
  });

  await page.locator("#promtButton").click();
});

Then("I handle dynamic suggestions in google search", async () => {
  await page.goto("https://www.google.com/");
  // await page.locator("//textarea[@title='Search']").fill("Playwright");
  await page.fill("//textarea[@title='Search']", "Playwright");
  await page.waitForSelector("//ul[@role='listbox']/li");
  console.log("======Google Suggestions====");
  let suggetList = await page
    .locator("//ul[@role='listbox']/li")
    .allInnerTexts();
  for (let text of suggetList) {
    console.log(text);
  }
});

Then ("I handle alert appear after 5 seconds", async ()=>{
  await page.goto("https://demoqa.com/alerts");
   page.on("dialog", async (dialog) => {
    await page.waitForTimeout(5000);
    console.log("Alert_Type:", dialog.type());
    console.log("Alert_Message:", dialog.message());
    await dialog.accept();
  });

  await page.locator("#timerAlertButton").click();


});

Then ("I handle data from external file for ecommerce website", async ()=>{
  await page.goto(eComRegister.url);
  await page.getByPlaceholder("First Name").fill(eComRegister.firstName);
  await page.getByPlaceholder("Last Name").fill(eComRegister.lastName);
  await page.getByPlaceholder("E-Mail").fill(eComRegister.email);
  await page.getByPlaceholder("Telephone").fill(eComRegister.phoneNumber);
  await page.getByPlaceholder("Telephone").scrollIntoViewIfNeeded();
  await page.getByPlaceholder("Password",{ exact: true }).fill(eComRegister.password);
  await page.getByPlaceholder("Password Confirm").fill(eComRegister.password);
  //  await page.locator("//input[@id='input-agree']").click();
  //getByRole for checkbox
  await page.locator("//label[@for='input-agree']").click();
  await page.locator("//input[@type='submit']").click();
});


Then("I handle single frame", async () => {
  await page.goto("https://ui.vision/demo/webtest/frames/");
  //Type-1 frames(), frame()
  let availableFrames = await page.frames();
  console.log("Frames_Count:", availableFrames.length);
  let frame1 = await page.frame({
    url: "https://ui.vision/demo/webtest/frames/frame_1",
  });
  await frame1?.fill("//input[@name='mytext1']", "Selenium");

  //Type-2 frameLocator()
  let frame4 = await page.frameLocator("//frame[@src='frame_4.html']");
  await frame4.locator("//input[@name='mytext4']").fill("Playwright");
  // await page.fill("//input[@name='mytext1']", "Selenium");
});

Then("I handle nested frame", async () => {
  await page.goto("https://ui.vision/demo/webtest/frames/");
  let frame3 = await page.frame({
    url: "https://ui.vision/demo/webtest/frames/frame_3",
  });
  await frame3?.fill("//input[@name='mytext3']", "NestedFrame");
  //childFrame
  // let childFrames = await frame3?.childFrames();
  // console.log("ChildFrame_Size:", childFrames?.length);
  // if (childFrames && childFrames?.length > 0) {
  //   await childFrames[0]
  //     .locator("//span[contains(text(),'UI.Vision')]")
  //     .click();
  //   await childFrames[0]
  //     .locator("//span[contains(text(),'Web Automation')]")
  //     .scrollIntoViewIfNeeded();

  //   await childFrames[0]
  //     .locator("//span[contains(text(),'Web Automation')]")
  //     .click();
  //   await childFrames[0].getByText("Next").click();

  // await childFrames[0].locator("//input[@class='whsOnd zHQkBf']").scrollIntoViewIfNeeded();
  // await childFrames[0].locator("//input[@class='whsOnd zHQkBf']").fill("Nested Handling");
  // // await  childFrames[0].getByText("Enter a long answer").scrollIntoViewIfNeeded();
  // await  childFrames[0].locator("//textarea[@jsaction='input:Lg5SV;ti6hGc:XMgOHc;rcuQ6b:WYd;']").scrollIntoViewIfNeeded();

  // // await  childFrames[0].locator("//textarea[@jsaction='input:Lg5SV;ti6hGc:XMgOHc;rcuQ6b:WYd;']").fill("Nesting done successfully");
  //  await  childFrames[0].locator("//textarea[@jsname='YPqjbf']").fill("Nesting done successfully");
  // await childFrames[0].getByRole('button',{name:'Submit'}).click();

  // }


  //  By directly calling th sinside frame url from inspect:
  let nestedFrame= await page.frame({url:"https://docs.google.com/forms/d/e/1FAIpQLSf5WiH3jEQApYku0Rl_nreU6_YMuLKAH5ffHuASyykQSIBjmg/viewform?embedded=true"});
  await nestedFrame?.locator("//span[contains(text(),'UI.Vision')]").click();
    await nestedFrame?.locator("//span[contains(text(),'Web Automation')]")
      .scrollIntoViewIfNeeded();
      

    await nestedFrame?.locator("//span[contains(text(),'Web Automation')]").click();
      
    await nestedFrame?.getByText("Next").click();

    // scroll based on label avoid class.
  await nestedFrame?.locator("//input[@class='whsOnd zHQkBf']").scrollIntoViewIfNeeded();
  await nestedFrame?.locator("//div[text()='Your answer']/parent::div/child::input").fill("Nested Handling");
  // await  childFrames[0].getByText("Enter a long answer").scrollIntoViewIfNeeded();
  await  nestedFrame?.locator("//textarea[@jsaction='input:Lg5SV;ti6hGc:XMgOHc;rcuQ6b:WYd;']").scrollIntoViewIfNeeded();

  // await  childFrames[0].locator("//textarea[@jsaction='input:Lg5SV;ti6hGc:XMgOHc;rcuQ6b:WYd;']").fill("Nesting done successfully");
   await  nestedFrame?.locator("//div[@role='listitem']/descendant::textarea").fill("Nesting done successfully");
  await nestedFrame?.getByRole('button',{name:'Submit'}).click();
});

Then("I handle keyboard actions via playwright", async () => {
  /*
  await page.goto("https://testautomationpractice.blogspot.com/");
  //input text box
  await page.getByPlaceholder("Enter Name").click();

  //Type text normally
  let inputText = "Playwright";
  await page.keyboard.type(inputText);

  //Select characters using Shift + ArrowLet
  //down -> long press
  await page.keyboard.down("Shift");
  for (let i = 0; i < inputText.length; i++) {
    await page.keyboard.press("ArrowLeft");
  }
  await page.keyboard.up("Shift");
  //Delete the word -> Backspace / Delete
  await page.keyboard.press("Backspace");
  */
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );

  await page.getByPlaceholder("Username").click();

  //Enteruser name -> type text (Upper / Lower)
  await page.keyboard.press("A");
  await page.keyboard.press("d");
  await page.keyboard.press("m");
  await page.keyboard.press("i");
  await page.keyboard.press("n");

  //using insertText without key event
  await page.getByPlaceholder("Password").click();
  await page.keyboard.insertText("admin123");

  //Click LoginButton
  await page.locator("//button[@type='submit']").click();
});

Then("I handle right click", async () => {
  //rightclick
  await page.goto("https://demo.guru99.com/test/simple_context_menu.html");
  await page.getByText("right click me").click({ button: "right" });
  //Listen for popup alert before click the menu item
  page.on("dialog", async (dialog) => {
    console.log(dialog.message());
    await page.waitForTimeout(2000);
    await dialog.accept();
  });

  //context-menu -> those are menu items in the context
  await page.locator(".context-menu-item", { hasText: "Copy" }).click();
});

Then("I handle double click", async () => {
  //rightclick
  await page.goto("https://demo.guru99.com/test/simple_context_menu.html");

  //Listen for popup alert before click the menu item
  page.on("dialog", async (dialog) => {
    console.log(dialog.message());
    await page.waitForTimeout(2000);
    await dialog.accept();
  });

  //double click
  await page.getByText("Double-Click Me To See Alert").dblclick();
});

Then("I handle drag and drop using mouse actions", async () => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.locator("//h2[text()='Drag and Drop']").scrollIntoViewIfNeeded();
  //id -> #, class -> .
  let source = page.locator("div#draggable");
  let target = page.locator("div#droppable");

  //mouse hover action -> drag
  await source.hover();
  await page.mouse.down(); //hold mouse at source point

  //mouser hover action -> drop
  await target.hover(); 
  await page.mouse.up(); //release element at target 

});

Then('I handle drag and drop via playwright', async ()=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
  await page.locator("//h2[text()='Drag and Drop']").scrollIntoViewIfNeeded();
  //id -> #, class -> .
  let source = page.locator("div#draggable");
  let target = page.locator("div#droppable");

  //drag and drop
  await source.dragTo(target);
});

Then("I handle new tabbed windows", async () => {
  await page.goto("https://demo.automationtesting.in/Windows.html");

  //Before click -  Pages count
  let pages = page.context().pages();
  console.log("No. of Pages-Before Click:", pages.length);

  //Listener - > Promise.all()
  await Promise.all([
    page.waitForEvent("popup"),
    page.locator("div#Tabbed button").click(),
  ]);

  //After click -  Pages count
  pages = page.context().pages();
  console.log("No. of Pages-After Click:", pages.length);

  //Handling Pages
  for (let p of pages) {
    let title = await p.title();
    let url = await p.url();
    console.log(title + ": " + url);
  }
});
Then("I handle new seperate widnows", async () => {
  await page.goto("https://demo.automationtesting.in/Windows.html");
  await page.click("//a[contains(text(),'New Seperate')]");
  //  await page.click("div#Seperate button");

  //Before click -  Pages count
  let pages = page.context().pages();
  console.log("No. of Pages-Before Click:", pages.length);

  //Listener - > Promise.all()
  await Promise.all([
    page.waitForEvent("popup"),
    page.click("div#Seperate button"),
  ]);

  //After click -  Pages count
  pages = page.context().pages();
  console.log("No. of Pages-After Click:", pages.length);

  //Handling Pages
  for (let p of pages) {
    let title = await p.title();
    let url = await p.url();
    console.log(title + ": " + url);
  }
});
Then("I handle multi seperate windows", async () => {
  await page.goto("https://demo.automationtesting.in/Windows.html");
  await page.click("//a[contains(text(),'Seperate Multiple')]");
  //  await page.click("div#Multiple button");

  //Before click -  Pages count
  let pages = page.context().pages();
  console.log("No. of Pages-Before Click:", pages.length);

  //Listener - > Promise.all()
  await Promise.all([
    page.waitForEvent("popup"),
    page.click("div#Multiple button"),
  ]);
  
  //wait - Listener
  await page.waitForTimeout(1000);
  
  //After click -  Pages count
  pages = page.context().pages();
  console.log("No. of Pages-After Click:", pages.length);

  //Handling Pages
  for (let p of pages) {
    let title = await p.title();
    let url = await p.url();
    console.log(title + ": " + url);

    // if (title != "Index") {
    //   await p.close();
    // }
    if (title === "Index") {
      await p.getByText("Skip Sign In").click();
    }
  }
});

Then("I upload single file", async () => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.getByText("Upload Files").scrollIntoViewIfNeeded();
  let uploadSnglFile = await page.locator("input#singleFileInput");
  let uploadSnglFileBtn = await page.getByText("Upload Single File");
  //Upload Single File
  await uploadSnglFile.setInputFiles(["Screenshots/FullPage.png"]);
  await uploadSnglFileBtn.click();
});
Then("I upload mutliple files", async () => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.getByText("Upload Files").scrollIntoViewIfNeeded();
  let uploadMtplFile = await page.locator("input#multipleFilesInput");
  let uploadMtplFileBtn = await page.getByText("Upload Multiple Files");
  //Upload Multiple File
  await uploadMtplFile.setInputFiles([
    "Screenshots/FullPage.png",
    "Screenshots/VisibleLevel.jpeg",
  ]);
  await uploadMtplFileBtn.click();
});


 Then ("I register the user and take screenshot", async()=>{
  await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/register");
  await page.screenshot({path:"./test-result/screenshots/ecomm.jpeg",fullPage:true});
  await page.locator("//input[@name='firstname']").fill("Rock");
  await page.locator("//input[@name='lastname']").fill("Ranton");
  await page.locator("input#input-email").fill("rockrandyortonso@gmail.com");
  await page.locator("input#input-telephone").fill("+918989990999");
  await page.locator("input#input-password").fill("abcd4567");
  await page.locator("input#input-confirm").fill("abcd4567");
  // await page.locator("input#input-agree").click();
  await page.getByText("I have read and agree to the ").click();
  await page.screenshot({path:"./test-result/screenshots/ecommFilled.jpeg",fullPage:true});
  await page.locator("//input[@type='submit']").click();
  await page.screenshot({path:"./test-result/screenshots/ecommContinue.png",fullPage:true});


 });

  Then ("I login with user credentials",async()=>{
    await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/login");
    // await page.locator("input#input-email").fill("rockrandyortons@gmail.com");
    // await page.locator("input#input-password").fill("abcd4567");
    //invalid credentials
    await page.locator("input#input-email").fill("rockrandyortons@g.com");
    await page.locator("input#input-password").fill("abcd456");
    await page.locator("//input[@type='submit']").click();
    await page.screenshot({path:"./test-result/screenshots/login.png"});
  });



// Then("I handle dynamic dropdown2", async () => {
  
 
//   // await page.locator("//input[@id='autocomplete']").type("au");
//   await page.locator("//textarea[@id='input']").pressSequentially("co");
  
// });