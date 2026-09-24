import test from "@playwright/test";

test("Handle elements via playwright locators",async({page})=>{
   await page.goto('https://testautomationpractice.blogspot.com/');
//    placeholder="Enter Name"
   await page.getByPlaceholder("Enter Name").type("Automation Test");
   await page.getByPlaceholder("Enter Name").clear();
   await page.getByText("START").click();
//    await page.getByLabel("Days:").scrollIntoViewIfNeeded();
await page.getByText("Days:").scrollIntoViewIfNeeded();
await page.getByRole("checkbox",{name:"Sunday"}).click();
await page.getByRole("checkbox",{name:"Tuesday"}).check();
await page.getByRole("checkbox",{name:"Sunday"}).uncheck();
await page.getByRole("button",{name:"stop"}).click();
await page.getByRole("radio",{name:"Male",exact: true}).click();

//getByAltText
await page.goto('https://parabank.parasoft.com/parabank/index.htm');
let title = await page.title();
let url = await page.url();
console.log(title+": "+url );
//alt="ParaBank"
// await page.getByAltText("ParaBank").click();
//title="ParaBank"
await page.getByTitle("ParaBank").click();
 title = await page.title();
 url = await page.url();
console.log(title+": "+url );





})