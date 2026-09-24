import test from "@playwright/test";

test('Learning playwright in test automation website',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.locator("//input[@id='name']").fill("Test Automation");
    await page.locator("//button[text()='START']").click();

})

