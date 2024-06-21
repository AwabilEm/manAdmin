// // dropdownHelper.ts
// import { Page } from '@playwright/test';

// export async function selectStudio(page: Page, studioName: string) {
//   // Click on the "Select Studio" dropdown
//   await page.locator('p-dropdown:has(span:has-text("Select Studio")) .p-dropdown-trigger').click();

//   // Wait for the dropdown options to be visible
//   await page.waitForSelector('.p-dropdown-items .p-dropdown-item');

//   // Get all visible options in the dropdown
//   const dropdownOptions = await page.$$eval('.p-dropdown-item', options =>
//     options.map(option => option.textContent ? option.textContent.trim() : '').filter(option => option)
//   );

//   // Print the dropdown options
//   console.log('Visible dropdown options:', dropdownOptions);

//   // Verify the options are visible as expected
//   const expectedOptions = [
//     'Austin/Lakeway',
//     'Birmingham/Homewood',
//     'Brentwood/Hill Center',
//     'Charlotte/Stonecrest',
//     'Chicago Glenview',
//     'Chicago Lakeview',
//     'Chicago_Libertyville',
//     'Dallas/Preston Center (Next to Starbucks)',
//     'Downtown Franklin',
//     'Edmond Oklahoma',
//     'Houston',
//     'Little Rock - Chenal',
//     'Manduu Collierville',
//     'Memphis/Perkins at Poplar',
//     'Memphis/Poplar at Kirby',
//     'Naples Mercato',
//     'Nashville/Green Hills'
//   ];

//   // Check if all expected options are visible
//   const allOptionsVisible = expectedOptions.every(option => dropdownOptions.includes(option));

//   if (allOptionsVisible) {
//     console.log('All expected options are visible.');
//   } else {
//     console.error('Some expected options are missing:', expectedOptions.filter(option => !dropdownOptions.includes(option)));
//   }

//   // Select the specified studio from the dropdown menu
//   await page.locator(`.p-dropdown-item:has-text("${studioName}")`).click();
// }


import { Page } from '@playwright/test';

// Function to log and verify dropdown options
export async function logAndVerifyDropdownOptions(page: any) {
  // Click on the "Select Studio" dropdown
  await page.locator('p-dropdown:has(span:has-text("Select Studio")) .p-dropdown-trigger').click();



  // Get all visible options in the dropdown
  const dropdownOptions = await page.$$eval('.p-dropdown-item', options => 
    options.map(option => option.textContent ? option.textContent.trim() : '').filter(option => option)
  );

  // Print the dropdown options
  console.log('Visible dropdown options:', dropdownOptions);

  // Define the expected options
  const expectedOptions = [
    'Austin/Lakeway',
    'Birmingham/Homewood',
    'Brentwood/Hill Center',
    'Charlotte/Stonecrest',
    'Chicago Glenview',
    'Chicago Lakeview',
    'Chicago_Libertyville',
    'Dallas/Preston Center (Next to Starbucks)',
    'Downtown Franklin',
    'Edmond Oklahoma',
    'Houston',
    'Little Rock - Chenal',
    'Manduu Collierville',
    'Memphis/Perkins at Poplar',
    'Memphis/Poplar at Kirby',
    'Naples Mercato',
    'Nashville/Green Hills'
  ];

  // Check if all expected options are visible
  const allOptionsVisible = expectedOptions.every(option => dropdownOptions.includes(option));

  if (allOptionsVisible) {
    console.log('All expected options are visible.');
  } else {
    console.error('Some expected options are missing:', expectedOptions.filter(option => !dropdownOptions.includes(option)));
  }
}

// Function to select a specific studio from the dropdown
// Function to select a specific studio from the dropdown
export async function selectStudio(page: Page, studioName: string) {
  // Ensure the dropdown is open
  // await page.locator('p-dropdown:has(span:has-text("Select Studio")) .p-dropdown-trigger').click();
  
  
  // Select the specified studio from the dropdown menu
  await page.locator(`.p-dropdown-item:has-text("${studioName}")`).click();
}
