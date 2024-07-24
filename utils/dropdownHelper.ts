import { Page } from '@playwright/test';

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
export async function selectStudio(page: Page, studioName: string) {
  // Ensure the dropdown is open
  // await page.locator('p-dropdown:has(span:has-text("Select Studio")) .p-dropdown-trigger').click();
  // await page.getByLabel('All Studio').click()


  // Select the specified studio from the dropdown menu
  await page.locator(`.p-dropdown-item:has-text("${studioName}")`).click();
}



  // // Select the "Edmond Oklahoma" studio
  // await selectStudio(page, 'Edmond Oklahoma');
  // await expect(page.getByLabel('Edmond Oklahoma')).toBeVisible();
  // // await expect(page.getByRole('option', { name: 'Edmond Oklahoma' })).toBeVisible()
  // // Select the "Brentwood/Hill Center" studio
  // await page.getByLabel('All Studio').click()
  // await selectStudio(page, 'Brentwood/Hill Center');
  // await expect(page.getByLabel('Brentwood/Hill Center')).toBeVisible();
  // // await expect(page.getByRole('option', { name: 'Brentwood/Hill Center' })).toBeVisible()






//  // Additional dropdown handling (Yes/No)
//  const yesNoDropdownSelector = 'p-dropdown:has(span:has-text("Yes/No"))';
//  const expectedYesNoOptions = ['Yes', 'No'];

//  // Log and verify dropdown options for the "Yes/No" dropdown
//  await logAndVerifyDropdownOptions(page, yesNoDropdownSelector, expectedYesNoOptions);

//  // Select "Yes" from the "Yes/No" dropdown menu
//  await selectDropdownOption(page, yesNoDropdownSelector, 'Yes');