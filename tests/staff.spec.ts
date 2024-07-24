import { test, expect } from '@playwright/test';
import { logAndVerifyDropdownOptions, studioVisibilty } from '../utils/dropdownHelper';
import { deleteStaffMember } from '../utils/deleteUser';

// Define all variables
const firstName = 'Test';
const lastName = 'AutomateSaff';
const dateOfBirth = '05/15/2024';
const gender = 'Male';
const email = 'test.manduu.staff@gmail.com';
const phoneNumber = '0543473847';
const streetAddress = 'accra';
const city = 'accra city';
const state = 'Iowa';
const country = 'United States';
const zipCode = '123456';
const workHours = '24';
const payRate = '5';
const employeeNumber = '1235678';
const studios = ['Austin/Lakeway', 'Houston', 'Chicago Lakeview'];
const department = 'Houston';
const salary = 'Salary';
const preferredLanguage = 'English';
const password = 'TestUser@1';
const confirmPassword = 'TestUser@1';
const expectedWarningText = `${firstName} ${lastName} will be deleted`;

test('staffPage', async ({ page }) => {
  try {
    // Navigate to the dashboard
    await page.goto('https://admin.manduu.app/app/main/dashboard');

    // Click on the Staff link
    await page.getByRole('link', { name: 'Staff' }).click();

    // Click on the All Staff link
    await page.getByRole('link', { name: ' All Staff' }).click();

    // Verify the Staff heading is visible
    await expect(page.getByRole('heading', { name: 'Staff' })).toBeVisible();

    // Verify the Create New Staff button is visible
    await expect(page.getByRole('button', { name: 'Create New Staff' })).toBeVisible();

    // Verify the Search textbox is empty
    await expect(page.getByRole('textbox', { name: 'Search...' })).toBeEmpty();

    // Verify the All Studio label is visible
    await expect(page.getByLabel('All Studio')).toBeVisible();

    // Log and verify dropdown options
    await logAndVerifyDropdownOptions(page);

    // Select studios

     await page.locator(`.p-dropdown-item:has-text("Edmond Oklahoma")`).click();

    // await page.waitForTimeout(1000); // Adjust timeout for search results to load

  //  await expect(page.getByLabel('Edmond Oklahoma')).toBeVisible();
  //  await expect(page.getByLabel('Edmond Oklahoma')).toBeVisible();
   await expect(page.locator(`#p-multiselect-label:has-text(Edmond Oklahoma)`)).toBeVisible();
   
    // Verify the table heading is visible
    await expect(page.getByText('Actions Name Last Name Roles Email Creation Time Action')).toBeVisible();
  } catch (error) {
    console.error('Error occurred during staffPage test:', error);
    throw error; // Fail the test explicitly
  }
});

test('creating a new staff', async ({ page }) => {
  try {
    // Navigate to the staff management page
    await page.goto('https://admin.manduu.app/app/main/staff/all');

    // Click on the Create New Staff button

    // Fill staff details
    await fillStaffDetails(page);

    // Save the new staff
    await page.getByRole('button', { name: 'Save' }).click();

    // Handle pop-up if username is already taken
    await handleUsernameTaken(page);

  } catch (error) {
    console.error('Error occurred during creating a new staff:', error);
    throw error; // Fail the test explicitly
  }
});

// Function to fill in staff details
async function fillStaffDetails(page) {
  await page.getByRole('button', { name: 'Create New Staff' }).click();

  await page.getByLabel('Stress Address').fill(firstName);
  await page.locator('app-input').filter({ hasText: 'Last Name *' }).locator('#face-value').fill(lastName);
  await page.locator('app-date-picker #face-value').fill(dateOfBirth);
  await page.getByLabel('Gender *').click();
  await page.getByLabel(gender, { exact: true }).click();
  await page.locator('input[type="email"]').fill(email);
  await page.locator('app-input').filter({ hasText: 'Phone Number *' }).locator('#face-value').fill(phoneNumber);
  await page.locator('app-input').filter({ hasText: 'Stress Address *' }).locator('#face-value').fill(streetAddress);
  await page.locator('app-input').filter({ hasText: 'City *' }).locator('#face-value').fill(city);
  await page.locator('#pn_id_17 #face-value').click();
  await page.getByLabel(state).click();
  await page.locator('#pn_id_19').getByLabel('dropdown trigger').click();
  await page.getByLabel(country).click();
  await page.locator('app-input').filter({ hasText: 'Zip code' }).locator('#face-value').fill(zipCode);
  await page.locator('app-input').filter({ hasText: 'Work Hours' }).locator('#face-value').fill(workHours);
  await page.locator('app-input').filter({ hasText: 'Pay Rate' }).locator('#face-value').fill(payRate);
  await page.locator('app-input').filter({ hasText: 'Employee Number' }).locator('#face-value').fill(employeeNumber);

  // Select Studios
  await page.locator('div').filter({ hasText: /^Studios$/ }).nth(1).click();
  for (const studio of studios) {
    await page.getByLabel(studio).locator('div').nth(1).click();
  }

  // Select Department (Houston)
  await page.locator('#pn_id_23 #face-value').click();
  await page.locator(`li[role="option"][aria-label="${department}"]`).click();

  // Select Salary and Preferred Language
  await page.locator('#pn_id_21').getByLabel('dropdown trigger').click();
  await page.getByRole('combobox', { name: salary.toLowerCase() }).click();
  await page.locator('#pn_id_25 #face-value').click();
  await page.getByLabel(preferredLanguage, { exact: true }).click();

  // Fill Password and Confirm Password fields
  await page.locator('input[type="password"]').first().fill(password);
  await page.locator('app-input').filter({ hasText: 'Confirm Password' }).locator('#face-value').fill(confirmPassword);
}

// Function to handle username already taken pop-up
async function handleUsernameTaken(page) {
  try {
    console.log('Waiting for the pop-up to appear...');
    await page.waitForSelector('.swal2-popup', { timeout: 10000 });
    console.log('Pop-up appeared.');

    // Check if the error message text is present
    const errorMessage = await page.locator('.swal2-html-container').innerText();
    console.log('Pop-up message:', errorMessage);

    if (errorMessage.includes(`Username '${email}' is already taken`)) {
      console.log('Clicking the Ok button and deleting that user...');
      await page.getByRole('button', { name: 'Ok' }).click();
      console.log('Ok button clicked, pop-up dismissed.');

      await page.getByRole('button', { name: 'Close' }).click()
      console.log('Close button clicked');

      console.log('Deleting the existed staff....');

      // Delete the existing staff member
      await deleteStaffMember(page, email, firstName, lastName, expectedWarningText);

      // Recreate the staff member
      await fillStaffDetails(page);
      await page.getByRole('button', { name: 'Save' }).click();
    } else {
      console.log('Unexpected pop-up message:', errorMessage);
    }
  } catch (error) {
    console.log('No pop-up appeared after saving');
    console.error(error);
  }
}

test('Checking for requirement to be present to create a new staff', async ({page})=>{
  await page.goto('https://admin.manduu.app/app/main/staff/all');
  await page.getByRole('button', { name: 'Create New Staff' }).click();


  await expect(page.getByText('Create new staff', { exact: true })).toBeVisible();


await expect(page.getByLabel('Stress Address')).toBeEmpty();
await expect(page.locator('app-input').filter({ hasText: 'Last Name *' }).locator('#face-value')).toBeEmpty();

await expect(page.locator('app-date-picker #face-value')).toBeEmpty();
await expect(page.locator('input[type="email"]')).toBeEmpty();
await expect(page.locator('app-input').filter({ hasText: 'Phone Number *' }).locator('#face-value')).toBeEmpty();
await expect(page.locator('app-input').filter({ hasText: 'Stress Address *' }).locator('#face-value')).toBeEmpty();
await expect(page.locator('app-input').filter({ hasText: 'Stress Address 2' }).locator('#face-value')).toBeEmpty();
await expect(page.locator('app-input').filter({ hasText: 'City *' }).locator('#face-value')).toBeEmpty();

await expect( page.locator('#pn_id_17 #face-value')).toBeEmpty();
//check the studio availabitly
await studioVisibilty(page)
await expect(page.locator('app-input').filter({ hasText: 'Zip code' }).locator('#face-value')).toBeEmpty();
await expect(page.locator('app-input').filter({ hasText: 'Work Hours' }).locator('#face-value')).toBeEmpty();
await expect(page.locator('app-input').filter({ hasText: 'Pay Rate' }).locator('#face-value')).toBeEmpty();
await expect(page.locator('app-input').filter({ hasText: 'Employee Number' }).locator('#face-value')).toBeEmpty();
await expect(page.locator('app-input').filter({ hasText: 'Double Session Commission' }).locator('#face-value')).toHaveValue('0');
await expect(page.locator('app-input').filter({ hasText: 'Conversion Commission' }).locator('#face-value')).toHaveValue('0');
await expect(page.locator('input[type="password"]').first()).toBeEmpty();

await expect(page.locator('app-input').filter({ hasText: 'Confirm Password' }).locator('#face-value')).toBeEmpty();
await expect(page.locator('div').filter({ hasText: /^Should change password on next login$/ }).getByRole('checkbox')).toBeChecked();
await expect(page.locator('div').filter({ hasText: /^Send activation email$/ }).getByRole('checkbox')).toBeChecked();
await expect(page.locator('div').filter({ hasText: /^Active$/ }).getByRole('checkbox')).toBeChecked();
await expect(page.locator('div').filter({ hasText: /^Two Factor enabled$/ }).getByRole('checkbox')).not.toBeChecked();
await expect(page.locator('div').filter({ hasText: /^Lockout enabled$/ }).getByRole('checkbox')).toBeChecked();

await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();




// //state dropdown

// await page.locator('#pn_id_17 #face-value').click();
// await page.getByLabel(state).click();


// //country

// await page.locator('#pn_id_19').getByLabel('dropdown trigger').click();
//   await page.getByLabel(country).click();

//   //studio
  
await expect(page.getByRole('heading', { name: 'Account settings' })).toBeVisible();
await expect(page.getByRole('heading', { name: 'Personal Information' })).toBeVisible(); 
await expect(page.getByRole('heading', { name: 'Contact Information' })).toBeVisible();
await expect(page.getByRole('heading', { name: 'Staff information' })).toBeVisible();
await expect(page.getByRole('heading', { name: 'Staff Commissions' })).toBeVisible();
})


test('Testing Country Dropdown', async ({ page }) => {
  // Define the expected country options
  const expectedCountry = ['Canada', 'Mexico', 'United States'];

  // Navigate to the staff management page
  await page.goto('https://admin.manduu.app/app/main/staff/all');

  // Click on 'Create New Staff' button
  await page.locator('button:has-text("Create New Staff")').click();

  // Click on country dropdown
  await page.locator('#pn_id_19 [aria-label="dropdown trigger"]').click();

  // Fetch the list of country options from the dropdown in the HTML
  const dropdownItemsCountry = await page.locator('#pn_id_19 li[role="option"]').allTextContents();

  // Extract the country names from the fetched options
  const displayedCountry = dropdownItemsCountry.map(item => item.trim());

  // Logging the comparison result
  console.log('Expected Country Options:', expectedCountry);
  console.log('Displayed Country Options:', displayedCountry);

  // Compare displayed country options with expected country options
  const isEqual = arraysEqual(expectedCountry, displayedCountry);
  console.log('Are the country options equal?', isEqual);

  // Assert that the displayed country options match the expected ones
  expect(displayedCountry).toEqual(expectedCountry);
  
// Function to check equality of arrays
function arraysEqual(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
});



test('Testing Employee Type Dropdown', async ({ page }) => {
  // Define the expected employee types
  const expectedEmployeeTypes = ['Salary', 'Hourly'];

  // Navigate to the staff management page
  await page.goto('https://admin.manduu.app/app/main/staff/all');

  // Click on 'Create New Staff' button
  await page.locator('button:has-text("Create New Staff")').click();

  // Click to show the employee type dropdown
  await page.locator('#pn_id_21 [aria-label="dropdown trigger"]').click();

  // Fetch the list of employee type options from the dropdown in the HTML
  const dropdownItems = await page.locator('#pn_id_21 li[role="option"]').allTextContents();

  // Extract the employee type names from the fetched options
  const displayedEmployeeTypes = dropdownItems.map(item => item.trim());

  // Logging the comparison result
  console.log('Expected Employee Types:', expectedEmployeeTypes);
  console.log('Displayed Employee Types:', displayedEmployeeTypes);

  // Compare displayed employee types with expected employee types
  const isEqual = arraysEqual(expectedEmployeeTypes, displayedEmployeeTypes);
  console.log('Are the employee types equal?', isEqual);

  // Assertion: Use Jest's expect assertion to ensure the arrays are equal
  expect(isEqual).toBe(true);

  // Function to check equality of arrays
  function arraysEqual(arr1: string[], arr2: string[]): boolean {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
});




test('Testing State Type Dropdown', async ({ page }) => {
  // Define the expected state types
  const expectedStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'District Of Columbia', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  // Navigate to the staff management page
  await page.goto('https://admin.manduu.app/app/main/staff/all');

  // Click on 'Create New Staff' button
  await page.locator('button:has-text("Create New Staff")').click();

  // Click to show the state dropdown
  await page.locator('#pn_id_17 #face-value').click();

  // Fetch the list of state options from the dropdown in the HTML
  const dropdownItems = await page.locator('#pn_id_17 li[role="option"]').allTextContents();

  // Extract the state names from the fetched options
  const displayedStates = dropdownItems.map(item => item.trim());

  // Logging the comparison result
  console.log('Expected States:', expectedStates);
  console.log('Displayed States:', displayedStates);

  // Compare displayed states with expected states
  const isEqual = arraysEqual(expectedStates, displayedStates);
  console.log('Are the state options equal?', isEqual);

  // Assert that the displayed state types match the expected state types
  expect(displayedStates). toEqual(expectedStates);

  // Function to check equality of arrays
  function arraysEqual(arr1: string[], arr2: string[]): boolean {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
});



test('Checking for studios availability', async ({ page }) => {

  // Navigate to the staff management page
  await page.goto('https://admin.manduu.app/app/main/staff/all');

  // Click on 'Create New Staff' button
  await page.getByRole('button', { name: 'Create New Staff' }).click();

  // Select Studios
  await page.locator('div').filter({ hasText: /^Studios$/ }).nth(1).click();
  for (const studio of studios) {
    await page.getByLabel(studio).locator('div').nth(1).click();
  }

     await page.locator('#pn_id_23 #face-value').click();

  // Fetch the list of studio options from the dropdown in the HTML
  // const dropdownItems = await page.locator('#pn_id_23 ul.p-dropdown-items li.p-dropdown-item span.ng-star-inserted').allTextContents();
  // const dropdownItems = await page.locator('ul.p-dropdown-items li.p-dropdown-item').allInnerTexts();
  const dropdownItems = await page.locator('#pn_id_23 li[role="option"][aria-label]').allTextContents();

  console.log('dropdown iterm before trim:', dropdownItems);

  // Extract the studio names from the fetched options
  const displayedStudios = dropdownItems.map(item => item.trim());
  console.log('dropdown iterm after trim:', displayedStudios);

  // Compare displayed studios with declared studios
  const isEqual = arraysEqual(studios, displayedStudios);

  // Logging the comparison result
  console.log('Declared Studios:', studios);
  console.log('Displayed Studios:', displayedStudios);
  console.log('Are the studios equal?', isEqual);

  // Assertion: Use Jest's expect assertion to ensure the arrays are equal
  expect(isEqual).toBe(true);

  // Function to check equality of arrays
  function arraysEqual(arr1: string[], arr2: string[]): boolean {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
});



test('test try', async({page})=>{

   // Navigate to the staff management page
   await page.goto('https://admin.manduu.app/app/main/staff/all');

   // Click on 'Create New Staff' button
   await page.getByRole('button', { name: 'Create New Staff' }).click();
 
   await page.locator('div').filter({ hasText: /^Studios$/ }).nth(1).click();

    // Select studios
    await page.getByLabel("Edmond Oklahoma").locator('div').nth(1).click();
   
  const element = page.locator('.p-multiselect-label', { hasText: 'Edmond Oklahoma' });
  await expect(element).toBeVisible();
   
});




  
