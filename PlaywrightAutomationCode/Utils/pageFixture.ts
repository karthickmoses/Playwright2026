import { Page } from "playwright";

let page: Page; //Undefined
//typecasting
export const pageFixture = { page: undefined as unknown as Page}; 
