import {test,expect} from "@playwright/test";

//Syntax:
/*
test("title",()=>{

//step1
//step2
//step3
    
})

*/

//fixture - global variable  : page, browser


test("Verify page title",async ({page})=>{

   await page.goto("http://www.automationpractice.pl/index.php"); 
   
   //let title:string=await page.title();
   
   console.log("Title:",await page.title());

   await expect(page).toHaveTitle("My Shop"); 

})







