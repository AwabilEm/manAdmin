import { test, expect } from '@playwright/test';


// await page.getByLabel('Nashville/Green Hills').click({
//     button: 'right'
//   });

// Austin/Lakeway
// Birmingham/Homewood
// Brentwood/Hill Center
// Charlotte/Stonecrest
// Chicago Glenview
// Chicago Lakeview
// Chicago_Libertyville
// Dallas/Preston Center (Next to Starbucks)
// Downtown Franklin
// Edmond Oklahoma
// Houston
// Little Rock - Chenal
// Manduu Collierville
// Memphis/Perkins at Poplar
// Memphis/Poplar at Kirby
// Naples Mercato
// Nashville/Green Hills

test.beforeEach(async ({ page }) => {
    await page.goto('https://admin.manduu.app/app/main/contracts/all-contracts')

})
test('test contract',async({page})=>{

   
    // await page.getByRole('link', { name: 'Contract', exact: true }).click();
    await page.getByRole('link', { name: ' All Contracts' }).click();
    await expect(page.getByRole('textbox', { name: 'Search...' })).toBeEmpty();
   // Click on the "Select Studio" dropdown


// // Click on the "Select Studio" dropdown
// await page.locator('p-dropdown[aria-label="Select Studio"] .p-dropdown-trigger').click();

// // Select "Edmond Oklahoma" from the dropdown menu
// await page.locator('.p-dropdown-item:has-text("Edmond Oklahoma")').click();


// Click on the "Select Studio" dropdown
await page.locator('p-dropdown:has(span:has-text("Select Studio")) .p-dropdown-trigger').click();

// Wait for the dropdown options to be visible
await page.waitForSelector('.p-dropdown-items .p-dropdown-item');

// Get all visible options in the dropdown
const dropdownOptions = await page.$$eval('.p-dropdown-item', options => 
  options.map(option => option.textContent ? option.textContent.trim() : '').filter(option => option)
);

// Print the dropdown options
console.log('Visible dropdown options:', dropdownOptions);

// Verify the options are visible as expected
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

// Select "Edmond Oklahoma" from the dropdown menu
await page.locator('.p-dropdown-item:has-text("Edmond Oklahoma")').click();




    await expect(page.locator('#pn_id_25').getByRole('combobox')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create New Contract' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Contract' })).toBeVisible();
    await expect(page.getByText('Actions Name Client Client Email Phone Studio ontract LARGE Michelle Stephens chellebelle0@gmail.com 6153903442 Nashville/Green Hills Action Edit Make active billing contract View contract Waiver Template Test Manduu testmanduu4@gmail.com 8004437227 Little Rock - Chenal Action Edit Make active billing contract View contract LARGE Test Manduu testmanduu4@gmail.com 8004437227 Little Rock - Chenal Action Edit Make active billing contract View contract Waiver Template Michelle Stephens chellebelle0@gmail.com 6153903442 Nashville/Green Hills Action Edit Make active billing contract View contract LARGE Michelle Harrison morrissetteharrison@yahoo 4056648308 Edmond Oklahoma Rows per page: 20201 - 20 of 45863 1 2 3 4')).toBeVisible();
    await page.getByRole('button', { name: 'Create New Contract' }).click();
    await expect(page.getByText('Create Contract')).toBeVisible();
    await expect(page.getByRole('button', { name: 'View Clients' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'View Invoice' })).toBeVisible();
    await expect(page.getByLabel('Contract Template *')).toBeVisible();
    await expect(page.getByLabel('Contract Template *')).toBeEmpty();
    await expect(page.getByLabel('Client *')).toBeEmpty();
    await expect(page.getByLabel('Start date *')).toBeEmpty();
    await expect(page.getByLabel('Billing start date')).toBeEmpty();
    await page.getByLabel('Select Option').click();
    await expect(page.getByLabel('Billing start date')).toBeVisible();
    
    await expect(page.getByLabel('Select Studio')).toBeVisible();
    await expect(page.getByLabel('Select Studio')).toContainText('Select Studio');
    await expect(page.getByRole('textbox', { name: 'Search...' })).toBeEmpty();
    await expect(page.getByText('ContractaddCreate New ContractSelect StudioAll StudiosBrentwood/Hill')).toBeVisible();
    await expect(page.getByLabel('Brentwood/Hill Center')).toBeVisible();
    await page.locator('#pn_id_9').getByLabel('dropdown trigger').click();
    await page.getByLabel('Select Studio').click();

});
    // await expect(page.getByLabel('Select Studio')).toBeVisible();
    // await page.getByText('ContractaddCreate New ContractSelect StudioAll StudiosBrentwood/Hill').click();
    // await expect(page.locator('#main-page-table-container')).toContainText('Nashville/Green Hills Actions Name Client Client Email Phone Studio Action Edit Make active billing contract View contract LARGE Nancy Belser nancybelser@gmail.com 6152181190 Nashville/Green Hills Action Edit Make active billing contract View contract Waiver Template Nancy Belser nancybelser@gmail.com 6152181190 Nashville/Green Hills Action Edit Make active billing contract View contract LARGE Marie Hixon marie.hixon@gmail.com 2146972302 Nashville/Green Hills Action Edit Make active billing contract View contract Waiver Template Sandra Burtt smburtt@gmail.com 3302562568 Nashville/Green Hills Action Edit Make active billing contract View contract Flex-10 Prepaid $540 Adam Boehler adambo@gmail.com 6172300127 Nashville/Green Hills Action Edit Make active billing contract View contract Single Session $72 Martin Davis mdavis@pamerinet.com 6158285419 Nashville/Green Hills Action Edit Make active billing contract View contract Single Session $72 Kathy Davis kathy@pamerinet.com 6158289769 Nashville/Green Hills Action Edit Make active billing contract View contract Flex-10 Prepaid $540 Shira Boehler shiraboehler@gmail.com 4155153055 Nashville/Green Hills Action Edit Make active billing contract View contract LARGE Audrey Campbell agcampbell2004@icloud.com 6152021360 Nashville/Green Hills Action Edit Make active billing contract View contract Waiver Template Audrey Campbell agcampbell2004@icloud.com 6152021360 Nashville/Green Hills Action Edit Make active billing contract View contract LARGE Chloe Ward chloeward2323@gmail.com 6155402790 Nashville/Green Hills Action Edit Make active billing contract View contract Waiver Template Chloe Ward chloeward2323@gmail.com 6155402790 Nashville/Green Hills Action Edit Make active billing contract View contract LARGE Michelle Stephens chellebelle0@gmail.com 6153903442 Nashville/Green Hills Action Edit Make active billing contract View contract Waiver Template Michelle Stephens chellebelle0@gmail.com 6153903442 Nashville/Green Hills Action Edit Make active billing contract View contract Fit-6 $219 Patricia Imperial pwimperial1015@gmail.com 9122206277 Nashville/Green Hills Action Edit Make active billing contract View contract Waiver Template test tes 2@2.com 2012012011 Nashville/Green Hills Action Edit Make active billing contract View contract LARGE Elizabeth Smith emsmith419@gmail.com 9895607511 Nashville/Green Hills Action Edit Make active billing contract View contract LARGE Patricia Imperial pwimperial1015@gmail.com 9122206277 Nashville/Green Hills Action Edit Make active billing contract View contract Fit-6 $219 MaryPat Payne marypatp@yahoo.com 6159476736 Nashville/Green Hills Action Edit Make active billing contract View contract Waiver Template jim haney scubahaney@hotmail.com 6154055715 Nashville/Green Hills Rows per page: 20201 - 20 of 5063 1 2 3 4 5');
    // await page.locator('div').filter({ hasText: /^Nashville\/Green Hills$/ }).first().click();
    // await expect(page.getByText('Nashville/Green HillsAll StudiosBrentwood/Hill CenterDowntown FranklinMemphis/Perkins at PoplarHoustonNashville/Green HillsMemphis/Poplar at KirbyAustin/LakewayDallas/Preston Center (Next to Starbucks)Chicago_LibertyvilleChicago GlenviewChicago LakeviewNaples MercatoLittle Rock - ChenalCharlotte/StonecrestBirmingham/HomewoodManduu ColliervilleEdmond Oklahoma Actions Name Client Client Email Phone Studio Action Edit Make active billing contract View contract LARGE Nancy Belser nancybelser@gmail.com 6152181190 Nashville/Green Hills Action Edit Make active billing contract View contract Waiver Template Nancy Belser nancybelser@gmail.com 6152181190 Nashville/Green Hills Action Edit Make active billing contract View contract LARGE Marie Hixon marie.hixon@gmail.com 2146972302 Nashville/Green Hills Action Edit Make active billing contract View contract Waiver Template Sandra Burtt smburtt@gmail.com 3302562568 Nashville/Green Hills Action Edit Make active billing contract View contract Flex-10 Prepaid $540 Adam Boehler adambo@gmail.com 6172300127 Nashville/Green Hills Action Edit Make active billing contract View contract Single Session $72 Martin Davis mdavis@pamerinet.com 6158285419 Nashville/Green Hills Action Edit Make active billing contract View contract Single Session $72 Kathy Davis kathy@pamerinet.com 6158289769 Nashville/Green Hills Action Edit Make active billing contract View contract Flex-10 Prepaid $540 Shira Boehler shiraboehler@gmail.com 4155153055 Nashville/Green Hills Action Edit Make active billing contract View contract LARGE Audrey Campbell agcampbell2004@icloud.com 6152021360 Nashville/Green Hills Action Edit Make active billing contract View contract Waiver Template Audrey Campbell agcampbell2004@icloud.com 6152021360 Nashville/Green Hills Action Edit Make active billing contract View contract LARGE Chloe Ward chloeward2323@gmail.com 6155402790 Nashville/Green Hills Action Edit Make active billing contract View contract Waiver Template Chloe Ward chloeward2323@gmail.com 6155402790 Nashville/Green Hills Action Edit Make active billing contract View contract LARGE Michelle Stephens chellebelle0@gmail.com 6153903442 Nashville/Green Hills Action Edit Make active billing contract View contract Waiver Template Michelle Stephens chellebelle0@gmail.com 6153903442 Nashville/Green Hills Action Edit Make active billing contract View contract Fit-6 $219 Patricia Imperial pwimperial1015@gmail.com 9122206277 Nashville/Green Hills Action Edit Make active billing contract View contract Waiver Template test tes 2@2.com 2012012011 Nashville/Green Hills Action Edit Make active billing contract View contract LARGE Elizabeth Smith emsmith419@gmail.com 9895607511 Nashville/Green Hills Action Edit Make active billing contract View contract LARGE Patricia Imperial pwimperial1015@gmail.com 9122206277 Nashville/Green Hills Action Edit Make active billing contract View contract Fit-6 $219 MaryPat Payne marypatp@yahoo.com 6159476736 Nashville/Green Hills Action Edit Make active billing contract View contract Waiver Template jim haney scubahaney@hotmail.com 6154055715 Nashville/Green Hills Rows per page: 20201 - 20 of 5063 1 2 3 4')).toBeVisible();


    // await page.getByRole('button', { name: 'Close' }).click();
    // await expect(page.locator('#pn_id_9').getByLabel('dropdown trigger')).toBeVisible();
    // await page.getByLabel('Nashville/Green Hills').click();
    // await expect(page.getByLabel('All Studios')).toBeVisible();
    // await page.getByLabel('Nashville/Green Hills').click({
    //   button: 'right'
    // });
