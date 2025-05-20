import {test,expect,chromium} from "@playwright/test";

test('Handle multiple Pages/Tabs', async () => {
    // Launch the browser
    const browser = await chromium.launch();
  
    // Create a new context (a single browsing session)
    const context = await browser.newContext();
  
    // Create two pages
    const parentPage = await context.newPage();
    await parentPage.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    
    // Start waiting for new page before clicking. 
   
    //Should go parallely
    const [childPage]=await Promise.all([
        context.waitForEvent('page'), // Wait for the new tab to open and return the page
        parentPage.locator("a:has-text('OrangeHRM, Inc')").click(),  //// Click the button that opens new tab
    ]);

    
    console.log(await parentPage.title()); //OrangeHRM
    console.log(await childPage.title()); //Human Resources Management Software | OrangeHRM HR Software

       await expect(parentPage).toHaveTitle('OrangeHRM')
    await expect(childPage).toHaveTitle('Human Resources Management Software | OrangeHRM HR Software')
  

    await parentPage.waitForTimeout(3000)
    await childPage.waitForTimeout(3000)
        
  })