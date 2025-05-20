import { test, expect, Page } from '@playwright/test';

async function selectDate(page: Page, targetYear: string, targetMonth: string, targetDate: string) {
  while (true) {
    const currentMonth = await page.locator('span.ui-datepicker-month').innerText();
    const currentYear = await page.locator('span.ui-datepicker-year').innerText();

    if (currentMonth === targetMonth && currentYear === targetYear) {
      break;
    } 
    else {
      await page.click('a.ui-datepicker-next'); // click next
    }
  }

  const allDates = page.locator('table.ui-datepicker-calendar tbody td a');
  const count = await allDates.count();

  for (let i = 0; i < count; i++) {
    const dateText = await allDates.nth(i).innerText();
    if (dateText === targetDate) {
      await allDates.nth(i).click();
      break;
    }
  }

/*
const allDates = await page.locator('table.ui-datepicker-calendar tbody td a').all();
    
    for (let date of allDates) {
        const dateText = await date.innerText();
            if (dateText === targetDate) {
                await date.click();
                break;
            }
    }
 */


}

test('IRCTC Date Picker Demo', async ({ page }) => {
  await page.goto('https://www.irctc.co.in/nget/train-search');

  // Open the date picker
  const dateInput=page.locator('#jDate span input');
  await dateInput.click();

  const targetYear = '2025';
  const targetMonth = 'June';
  const targetDate = '10';

  await selectDate(page, targetYear, targetMonth, targetDate);

  // Assert the selected date is reflected in the input field 
  const selectedDate = await dateInput.inputValue();
  expect(selectedDate).toContain('10'); 

   // Other way to Verify selected date is correctly filled in the input field
   const expectedDateString = '10/06/2025';  //dd/mm/yyyy
   await expect(dateInput).toHaveValue(expectedDateString); // dd/mm/yyyy format

});
