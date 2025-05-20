import { test, expect, Locator } from '@playwright/test';

test('Scenario 1: CPU load of Chrome should match yellow label', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

  const rows: Locator[] = await page.locator("table#taskTable tbody tr").all();

  for (const row of rows) {
    const processName = await row.locator('td').nth(0).innerText();
    if (processName === 'Chrome') {
      const cpuLoad = await row.locator("td",{hasText : '%'}).innerText();
      const expectedCpu = await page.locator('strong.chrome-cpu').innerText();
      expect(cpuLoad).toBe(expectedCpu);
      break;
    }
  }
});

test('Scenario 2: Memory usage of Firefox should match blue label', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

  const rows: Locator[] = await page.locator("table#taskTable tbody tr").all();

  for (const row of rows) {
    const processName = await row.locator('td').nth(0).innerText();
    if (processName === 'Firefox') {
      //const memoryUsage = await row.locator("td", {hasText: 'MB' }).innerText();//Here MB is matching with 3 elements. so use regex like below
      const memoryUsage = await row.locator("td", { hasText: /MB$/ }).innerText();
      const expectedMemory = await page.locator('strong.firefox-memory').innerText();
      expect(memoryUsage).toBe(expectedMemory);
      break;
    }
  }
});

test('Scenario 3: Network speed of Chrome should match orange label', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

  const rows: Locator[] = await page.locator("table#taskTable tbody tr").all();

  for (const row of rows) {
    const processName = await row.locator('td').nth(0).innerText();
    if (processName === 'Chrome') {
      const networkSpeed = await row.locator("td",{hasText : 'Mbps'}).innerText();
      const expectedNetwork = await page.locator('strong.chrome-network').innerText();
      expect(networkSpeed).toBe(expectedNetwork);
      break;
    }
  }
});

test('Scenario 4: Disk space of Firefox should match violet label', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

  const rows: Locator[] = await page.locator("table#taskTable tbody tr").all();

  for (const row of rows) {
    const processName = await row.locator('td').nth(0).innerText();
    if (processName === 'Firefox') {
      const diskSpace = await row.locator("td", {hasText : 'MB/s'}).innerText();
      const expectedDisk = await page.locator('strong.firefox-disk').innerText();
      expect(diskSpace).toBe(expectedDisk);
      break;
    }
  }
});