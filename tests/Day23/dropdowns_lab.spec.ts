import { test, expect,Locator } from '@playwright/test';

test('Product sort and print lowest/highest price with names', async ({ page }) => {
  // Navigate to the URL
  await page.goto('https://www.bstackdemo.com/');
  await page.setViewportSize({ width: 1280, height: 720 });

  // Locate the "Order by" dropdown using CSS selector and select "Lowest to highest"
  const orderByDropdown = page.locator('div.sort>select');
  await expect(orderByDropdown).toBeVisible(); // Assert dropdown is visible
  await expect(orderByDropdown).toBeEnabled(); // Assert dropdown is enabled

  await orderByDropdown.selectOption({ label: 'Lowest to highest' });

   // Wait for sorting to reflect
  await page.waitForTimeout(3000);

  // Get all product price and name elements using CSS
  const priceElements:Locator = page.locator('div.val');
  const nameElements:Locator = page.locator('p.shelf-item__title');

  const prices:string[] = await priceElements.allTextContents();
  const names:string[] = await nameElements.allTextContents();

  expect(prices.length).toBe(names.length); // Assert that prices and names count are equal

  console.log('Printing Product Names along with their Prices.......');
  for (let i = 0; i < names.length; i++) {
    console.log(`${names[i]} : ${prices[i]}`);
  }

  console.log(`Lowest Priced Product: ${names[0]} : ${prices[0]}`);
  console.log(`Highest Priced Product: ${names[names.length - 1]} : ${prices[prices.length - 1]}`);
});
