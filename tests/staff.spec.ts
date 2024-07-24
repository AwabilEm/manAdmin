import { test, expect } from '@playwright/test';
import { logAndVerifyDropdownOptions, selectStudio } from '../utils/dropdownHelper';
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
    await selectStudio(page, 'Edmond Oklahoma');
    await page.waitForTimeout(1000); // Adjust timeout for search results to load

   await expect(page.getByLabel('Edmond Oklahoma')).toBeVisible();

  //  await page.getByLabel('All Studio').click()
  // await selectStudio(page, 'Brentwood/Hill Center');
  // await expect(page.getByLabel('Brentwood/Hill Center')).toBeVisible();

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
