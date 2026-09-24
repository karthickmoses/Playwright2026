import { pageFixture } from "../Utils/pageFixture";

export default class RegisterPage {
    private registerPageElements = {
        firstName: "//input[@name='firstname']",
        lastName: "//input[@name='lastname']",
        email: "input#input-email",
        phone: "input#input-telephone",
        pwd: "input#input-password",
        confirmPwd: "input#input-confirm",
        forgerPwd: "Forgotten Password",
        checkboxText: "I have read and agree to the",
        registerBtn: "//input[@type='submit']"
    };

    //Reuse methods
    // async launchUrl(url: string) {
    //     await pageFixture.page.goto(url);
    // };

    // async enterFirstName(fName:string){
    //     await pageFixture.page.locator(this.registerPageElements.firstName).fill(fName);

    // };

    // async enterLastName(lName:string){
    //     await pageFixture.page.locator(this.registerPageElements.lastName).fill(lName);
    // }

    // async enterEmail(email: string) {
    //     await pageFixture.page.locator(this.registerPageElements.email).fill(email);
    // }
    // async enterPassword(pass: string) {
    //     await pageFixture.page.locator(this.registerPageElements.pwd).fill(pass);
    // }
    // async clickRegisterBtn() {
    //     await pageFixture.page.click(this.registerPageElements.registerBtn);
    // }

    async ecomRegister(url: string, fName: string, lName: string, email: string, phone: string, pass: string, cnfmPass: string) {
        await pageFixture.page.goto(url);
        await pageFixture.page.locator(this.registerPageElements.firstName).fill(fName);
        await pageFixture.page.locator(this.registerPageElements.lastName).fill(lName);
        await pageFixture.page.locator(this.registerPageElements.email).fill(email);
        await pageFixture.page.locator(this.registerPageElements.phone).fill(phone);
        await pageFixture.page.locator(this.registerPageElements.pwd).fill(pass);
        await pageFixture.page.locator(this.registerPageElements.confirmPwd).fill(cnfmPass);
        // await pageFixture.page.click(this.registerPageElements.checkbox);
        await pageFixture.page.getByText(this.registerPageElements.checkboxText).click();
        await pageFixture.page.click(this.registerPageElements.registerBtn);
        // await pageFixture.page.screenshot({ path: "./test-result/screenshots/ecomRegister.jpg" });
    }

    async pageScreenshot(imageName:string, imgFormat:string) {
        let  imagePath = "./test-result/screenshots/" + imageName + "." + imgFormat; 
        await pageFixture.page.screenshot({ path: imagePath });
    }




}

