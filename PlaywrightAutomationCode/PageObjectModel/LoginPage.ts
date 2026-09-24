import {pageFixture} from "../Utils/pageFixture";

export default class LoginPage{
    //Locator => class level variable
    private loginPageElements = {
        email : "input#input-email",
        pwd : "input#input-password",
        forgerPwd: "Forgotten Password",
        loginBtn:"//input[@type='submit']"
    };
    
    //Reuse methods
    async launchUrl(url:string){
        await pageFixture.page.goto(url);
    };
   
    async enterEmail(email:string){
        await pageFixture.page.locator(this.loginPageElements.email).fill(email);
    }
    async enterPassword(pass:string){
        await pageFixture.page.locator(this.loginPageElements.pwd).fill(pass);
    }
    async clickLoginBtn(){
        await pageFixture.page.click(this.loginPageElements.loginBtn);
    }

    async ecomLogin(url:string, email:string, pass:string){
        await pageFixture.page.goto(url);
        await pageFixture.page.locator(this.loginPageElements.email).fill(email);
        await pageFixture.page.locator(this.loginPageElements.pwd).fill(pass);
        await pageFixture.page.click(this.loginPageElements.loginBtn);
    }

    //Screenshot?????

}

