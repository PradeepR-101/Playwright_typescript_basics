import { test, expect, Page } from '@playwright/test';

async function selectDateOfBirth(page: Page, birthYear: string, birthMonth: string, birthDate: string) {
    // Select Year
     await page.locator('select[data-handler="selectYear"]').selectOption(birthYear);
    
    // Select Month
    await page.locator('select.ui-datepicker-month').selectOption(birthMonth);
    
    // Select Date
    const dateCells = await page.locator('table.ui-datepicker-calendar td a').all();
    for (const cell of dateCells) {
        if (await cell.textContent() === birthDate) {
            await cell.click();
            break;
        }
    }
}

async function selectDate(page: Page, requiredYear: string, requiredMonth: string, requiredDate: string) {
    // Select Year
      await page.locator('select[data-handler="selectYear"]').selectOption(requiredYear);
    
    // Select Month
    await page.locator('select[aria-label="Select month"]').selectOption(requiredMonth);
    
    // Select Date
    const dateCells = await page.locator('table.ui-datepicker-calendar td a').all();
    for (const cell of dateCells) {
        if (await cell.textContent() === requiredDate) {
            await cell.click();
            break;
        }
    }
}

test('Dummy Ticket Booking', async ({ page }) => {
    // Launch the url
    await page.goto('https://www.dummyticket.com/dummy-ticket-for-visa-application/');
      
    // Assert page title
    await expect(page).toHaveTitle(/Dummy ticket/);

    // Choose the correct option: Dummy ticket for Visa Application radio option
    await page.locator('#product_549').check();
    await expect(page.locator('#product_549')).toBeChecked();

    // Passenger details //

    // Enter first and last name
    await page.locator('[name="travname"]').fill('Akash');
    await page.locator('#travlastname').fill('Ratore');

    // Select Date Of Birth
    const birthYear = "2001";
    const birthMonth = "Mar";
    const birthDate = "2";
    await page.locator('#dob').click();
    await selectDateOfBirth(page, birthYear, birthMonth, birthDate);

    // Verify date was selected
    const dobValue = await page.locator('#dob').inputValue();
    expect(dobValue).not.toBe('');


    // Select sex
    await page.locator('#sex_1').check();
    await expect(page.locator('#sex_1')).toBeChecked();

    // Travel Details //

    // Select trip
    await page.locator('#traveltype_1').check();
    await expect(page.locator('#traveltype_1')).toBeChecked();
    await page.locator('[name="fromcity"]').fill('Toronto');
    await page.locator('[name="tocity"]').fill('Mumbai');

    // Select departure date
    const requiredYear = "2025";
    const requiredMonth = "Nov";
    const requiredDate = "25";
    await page.locator('#departon').click();
    await selectDate(page, requiredYear, requiredMonth, requiredDate);

    // Verify departure date was selected
    const departValue = await page.locator('#departon').inputValue();
    expect(departValue).not.toBe('');
 
    // Additional information
    await page.locator('#notes').fill('Need visa as soon as possible');
    await expect(page.locator('#notes')).toHaveValue('Need visa as soon as possible');

    // Delivery options //

    // Purpose of ticket
    await page.locator('#select2-reasondummy-container').click();
    await page.locator('.select2-results li:first-child').click();

    // Select appointment date
    const apptYear = "2025";
    const apptMonth = "Dec";
    const apptDate = "10";
    await page.locator('#appoinmentdate').click();
    await selectDate(page, apptYear, apptMonth, apptDate);

    // Verify appointment date was selected
    const apptValue = await page.locator('#appoinmentdate').inputValue();
    expect(apptValue).not.toBe('');
   
    // Notification
    await page.locator('#deliverymethod_1').check();
    await expect(page.locator('#deliverymethod_1')).toBeChecked();

    // Billing Details //
    await page.locator('#billname').fill('Akash Rathore');
    await page.locator('[name="billing_phone"]').fill('+12345678956');
    await page.locator('#billing_email').fill('abc.123@gmail.com');
    
    // Select country
    await page.locator('#select2-billing_country-container').click();
    await page.locator('.select2-results li:has-text("Canada")').click();
    
    await page.locator('#billing_address_1').fill('123 Scott Street');
    await page.locator('[name="billing_city"]').fill('Niagara Falls');
    
    // Select state
    await page.locator('#select2-billing_state-container').click();
    await page.locator('.select2-results li:has-text("Ontario")').click();
    
    await page.locator('#billing_postcode').fill('L2C 6M1');

    // Verify billing details were filled
    await expect(page.locator('#billname')).toHaveValue('Akash Rathore');
    await expect(page.locator('[name="billing_phone"]')).toHaveValue('+12345678956');
    await expect(page.locator('#billing_email')).toHaveValue('abc.123@gmail.com');
    await expect(page.locator('#select2-billing_country-container')).toHaveText('Canada');
    await expect(page.locator('#billing_address_1')).toHaveValue('123 Scott Street');
    await expect(page.locator('[name="billing_city"]')).toHaveValue('Niagara Falls');
    await expect(page.locator('#select2-billing_state-container')).toHaveText('Ontario');
    await expect(page.locator('#billing_postcode')).toHaveValue('L2C 6M1');

    //Verify Product details table 
    const productName=page.locator('.product-details');
    await expect(productName).toHaveText("Dummy ticket for Visa Application");

    const productPrice=page.locator('.shop_table.woocommerce-checkout-review-order-table tfoot tr:nth-child(2) td');
    await expect(productPrice).toHaveText("₹1,200");


    //Place order
    await page.locator('#place_order').click();
  

});