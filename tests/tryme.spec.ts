import { test, expect } from '@playwright/test';
import { logAndVerifyDropdownOptions,selectStudio } from '../utils/dropdownHelper';




test.beforeEach(async ({ page }) => {
    await page.goto('https://admin.manduu.app/app/main/contracts/all-contracts')

})
test('test contract',async({page})=>{

   
    // await page.getByRole('link', { name: 'Contract', exact: true }).click();
    await page.getByRole('link', { name: ' All Contracts' }).click();
    await expect(page.getByRole('textbox', { name: 'Search...' })).toBeEmpty();
  
    // Use the selectStudio function to select "Edmond Oklahoma"
  await logAndVerifyDropdownOptions(page);
  await selectStudio(page, 'Edmond Oklahoma');
// await page.locator('p-dropdown:has(span:has-text("Select Studio")) .p-dropdown-trigger').click();
  
//   await page.locator('.p-dropdown-item:has-text("Edmond Oklahoma")').click();


  

    await expect(page.getByRole('button', { name: 'Create New Contract' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Contract' })).toBeVisible();
    await expect(page.getByText('Actions Name Client Client Email Phone Studio')).toBeVisible();
    await page.getByRole('button', { name: 'Create New Contract' }).click();
    await expect(page.getByText('Create Contract')).toBeVisible();
    await expect(page.getByRole('button', { name: 'View Clients' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'View Invoice' })).toBeVisible();
    
    await expect(page.getByLabel('Contract Template *')).toBeEmpty();
    await page.getByLabel('Contract Template *').fill('Unlimifit OK');
    await expect(page.getByLabel('Contract Template *')).toHaveValue('Unlimifit OK');
    await expect(page.getByLabel('Contract Template *')).toBeVisible();
    await expect(page.getByLabel('Client *')).toBeEmpawait expect(page.getByLabel('Contract Template *')).toHaveValue('Unlimifit OK');
    await expect(page.getByRole('dialog')).toContainText('Create ContractView ClientsView Invoice');
    await expect(page.getByLabel('Contract Template *')).toBeVisible();

    await expect(page.getByLabel('Start date *')).toBeEmpty();
    await expect(page.getByLabel('Billing start date')).toBeEmpty();
    await expect(page.getByLabel('Billing start date')).toBeVisible();
    
   


    await logAndVerifyDropdownOptions(page);
    await selectStudio(page, 'Edmond Oklahoma');
    
   await page.getByLabel('Select Option').click()
    await expect(page.getByLabel('NO', { exact: true })).toBeVisible();

  });
   


locator('.modal-body > div:nth-child(2)').first()
getByLabel('NO', { exact: true })

await page.getByText('Contract Terms').click();
await expect(page.getByLabel('Initial Fees')).toBeVisible();
await expect(page.getByLabel('Do not invoice until this date')).toBeVisible();
await expect(page.getByLabel('Pause contract on this date')).toBeVisible();
await expect(page.locator('app-input').filter({ hasText: 'Session cost' }).locator('#face-value')).toBeVisible();
await expect(page.getByLabel('Cancel contract on this date')).toBeVisible();
await expect(page.getByLabel('Restart contract on this date')).toBeVisible();
await page.getByLabel('Initial Fees').click();
await page.getByLabel('Initial Fees').fill('3');
await page.getByLabel('Initial Fees').press('Enter');
await page.getByLabel('Do not invoice until this date').click();
await page.getByLabel('Do not invoice until this date').click();
await page.getByLabel('Do not invoice until this date').click();
await page.getByRole('button', { name: '2024' }).click();
await page.getByRole('button', { name: '- 2032' }).click();
await page.getByText('2018').click();
await page.getByText('February').click();
await page.getByText('6', { exact: true }).first().click();
await page.getByLabel('Do not invoice until this date').click();
await page.getByRole('button', { name: '›' }).click();
await page.getByText('14', { exact: true }).click();
await page.getByLabel('Cancel contract on this date').click();
await page.getByRole('button', { name: '›' }).click();
await page.getByText('16', { exact: true }).click();
await page.getByLabel('Restart contract on this date').click();
await page.getByRole('button', { name: '›' }).click();
await page.getByText('Fri', { exact: true }).click();
await page.locator('app-input').filter({ hasText: 'Session cost' }).locator('#face-value').click();
await page.locator('app-input').filter({ hasText: 'Session cost' }).locator('#face-value').fill('2');
await page.locator('app-input').filter({ hasText: 'Session cost' }).locator('#face-value').click();
await page.locator('#kt_app_main textarea').click();
await page.locator('#kt_app_main textarea').fill('testing');
await page.locator('#kt_app_main textarea').click();
await page.getByText('Contract Adminstrations').click();
await page.getByLabel('Date frozen').click();
await page.getByRole('button', { name: '›' }).click();
await page.getByText('19', { exact: true }).click();
await page.getByLabel('Date cancelled').click();
await page.getByRole('button', { name: '›' }).click();
await page.getByText('17', { exact: true }).click();
await page.getByLabel('Memo').fill('test');
await page.getByLabel('Initial note').fill('test note');
await page.getByLabel('Audit Note').fill('test audit note');

getByRole('button', { name: 'Save' }).click();
// // Function to handle the "Yes/No" dropdown
// export async function handleYesNoDropdown(page: any) {
//   const yesNoDropdownSelector = 'p-dropdown:has(span:has-text("Select Option")) .p-dropdown-trigger';
  
//   // Click on the dropdown to open it
//   await page.locator(yesNoDropdownSelector).click();
  

//   // Get all visible options in the dropdown
//   const dropdownOptions = await page.$$eval('.p-dropdown-item', options =>
//     options.map(option => option.textContent ? option.textContent.trim() : '').filter(option => option)
//   );

//   // Print the dropdown options
//   console.log('Visible dropdown options:', dropdownOptions);

//   // Verify the options are visible as expected
//   const expectedOptions = ['Yes', 'NO'];

//   // Check if all expected options are visible
//   const allOptionsVisible = expectedOptions.every(option => dropdownOptions.includes(option));

//   if (allOptionsVisible) {
//     console.log('All expected options are visible.');
//   } else {
//     console.error('Some expected options are missing:', expectedOptions.filter(option => !dropdownOptions.includes(option)));
//   }

//   // Select "Yes" from the dropdown menu
//   await page.locator('.p-dropdown-item:has-text("Yes")').click();
// }

