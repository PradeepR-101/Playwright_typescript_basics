import {test,expect} from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import {HomePage} from '../pages/HomePage';
import {CartPage} from '../pages/CartPage';


test('User can login, add a product to the cart', async({page})=>{

await page.goto("https://www.demoblaze.com/index.html")


//Login Page
const loginPage=new LoginPage(page);
await loginPage.clickLoginLink();

//await page.pause();
await loginPage.enterUserName("pavanol");
await loginPage.enterPassord("test@123");
await loginPage.clickOnLoginButton();

//await loginPage.performLogin("pavanol","test@123");

//Homepage
const homePage=new HomePage(page);
await homePage.addProductToCart("Samsung galaxy s6");
 await page.waitForTimeout(2000);
await homePage.gotoCart();
 await page.waitForTimeout(2000);

//Cart Page
const cartPage=new CartPage(page);
const isProductInCart=await cartPage.checkProductInCart("Samsung galaxy s6");
expect(isProductInCart).toBe(true);


})


