import { Page } from '@playwright/test';
import { expectedStudios } from './studios';
// Function to log and verify dropdown options
export async function logAndVerifyDropdownOptions(page: Page) {
  // Click on the "Select Studio" dropdown
  // await page.locator('p-dropdown:has(span:has-text("Select Studio")) .p-dropdown-trigger').click();
await page.getByLabel('All Studio').click()
  // Wait for the dropdown options to be visible
  await page.waitForSelector('.p-dropdown-items .p-dropdown-item');

  // Get all visible options in the dropdown
  const dropdownOptions = await page.$$eval('.p-dropdown-item', options =>
    options.map(option => option.textContent ? option.textContent.trim() : '').filter(option => option)
  );

  // Print the dropdown options
  console.log('Visible dropdown options:', dropdownOptions);


  // Check if all expected options are visible
  const allOptionsVisible = expectedStudios.every(option => dropdownOptions.includes(option));

  if (allOptionsVisible) {
    console.log('All expected options are visible.');
  } else {
    console.error('Some expected options are missing:', expectedStudios.filter(option => !dropdownOptions.includes(option)));
  }
}


export async function studioVisibilty(page:any) {
 

  await page.locator('div').filter({ hasText: /^Studios$/ }).nth(1).click();
  
  
  // Wait for the dropdown options to be visible
  await page.waitForSelector('p-multiselectitem li[aria-label]');
  
  // Get all visible options in the dropdown
  const dropdownOptions = await page.$$eval('p-multiselectitem li[aria-label]', options =>
    options.map(option => option.getAttribute('aria-label')?.trim() || '').filter(option => option)
  );
  
  // Log the visible dropdown options
  console.log('Visible dropdown options:', dropdownOptions);
  
  // Check if all expected options are visible
  const allOptionsVisible = expectedStudios.every(option => dropdownOptions.includes(option));
  
  if (allOptionsVisible) {
    console.log('All expected options are visible.');
  } else {
    console.error('Some expected options are missing:', expectedStudios.filter(option => !dropdownOptions.includes(option)));
  }
  }
  
  



  

