import { expect } from "@playwright/test";
import { pageFixture } from "../Utils/pageFixture";

export default class RegisterPageAssertions {

    private registerPageElements = {
        firstName: "//input[@name='firstname']",
        lastName: "//input[@name='lastname']",
        email: "input#input-email",
        phone: "input#input-telephone",
        pwd: "input#input-password",
        confirmPwd: "input#input-confirm",
        // policyCheckbox: "input[name='agree']",
        checkboxText: "I have read and agree to the",
        registerBtn: "//input[@type='submit']",

        // Success Message
        successMsg: " Your Accountt Has Been Created!"
    };

    async ecomRegister(
        url: string,
        fName: string,
        lName: string,
        email: string,
        phone: string,
        pass: string,
        cnfmPass: string
    ) {

        await pageFixture.page.goto(url);

        // Page Validation
        await expect(pageFixture.page).toHaveURL(url);

        // Verify fields are visible
        await expect(
            pageFixture.page.locator(this.registerPageElements.firstName)
        ).toBeVisible();

        await expect(
            pageFixture.page.locator(this.registerPageElements.lastName)
        ).toBeVisible();

        await expect(
            pageFixture.page.locator(this.registerPageElements.email)
        ).toBeVisible();

        // Enter details
        await pageFixture.page
            .locator(this.registerPageElements.firstName)
            .fill(fName);

        await pageFixture.page
            .locator(this.registerPageElements.lastName)
            .fill(lName);

        await pageFixture.page
            .locator(this.registerPageElements.email)
            .fill(email);

        await pageFixture.page
            .locator(this.registerPageElements.phone)
            .fill(phone);

        await pageFixture.page
            .locator(this.registerPageElements.pwd)
            .fill(pass);

        await pageFixture.page
            .locator(this.registerPageElements.confirmPwd)
            .fill(cnfmPass);

        // Accept Privacy Policy
        await pageFixture.page
            .getByText(this.registerPageElements.checkboxText)
            .check();

        await expect(
            pageFixture.page.getByText(this.registerPageElements.checkboxText)
        ).toBeChecked();

        // Click Register
        await pageFixture.page
            .locator(this.registerPageElements.registerBtn)
            .click();

        // Success Assertion
        await expect(
            pageFixture.page.getByText(this.registerPageElements.successMsg)
        ).toBeVisible();

        await expect(
            pageFixture.page.getByText(this.registerPageElements.successMsg)
        ).toContainText("Your Account Has Been Created!");
    }

    async pageScreenshot(imageName: string, imgFormat: string) {
        const imagePath =
            `./test-result/screenshots/${imageName}.${imgFormat}`;

        await pageFixture.page.screenshot({
            path: imagePath,
            fullPage: true
        });
    }
}