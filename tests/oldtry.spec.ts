import {test, expect, Page} from '@playwright/test'

test('Onboarding with the old app', async ({page}) => {
    await page.goto('https://client.manduu.work/signup');
    await page.getByLabel('First Name *').fill('test');
    await page.locator('#lastname').fill('old');

await page.locator('#email').fill('manduu.test.old7@gmail.com');

await page.locator('#phonenumber').fill('0100000007');
await page.getByRole('combobox').first().selectOption('1');
await page.getByRole('combobox').nth(1).selectOption('13');
await page.getByRole('combobox').nth(2).selectOption('1993');
await page.locator('#password').fill('123456');
await page.locator('#confirmPassword').fill('123456');
// await page.click('text=Houston', { force: true });

await page.locator('#studio').selectOption('7');

// Select the Houston studio by its visible text
//await page.selectOption('select[formcontrolname="studio"]', { label: 'Houston' }).click();
//wait page.click('option:has-text("Houston")');
// await page.click('label:has-text("Houston")');

//await page.click('text=Houston'); // Try this first

await page.click('select[formcontrolname="studio"]');

await page.getByLabel('Scheduled Date*').fill('01/21/2025');
await page.locator('div').filter({ hasText: /^Next$/ }).click();
await page.getByRole('button', { name: 'Next' }).click();

await page.getByRole('button', { name: 'No, I do not have any of' }).click();
await page.locator('#exampleModalCenter').getByRole('button', { name: 'Next' }).click();
await page.getByRole('button', { name: 'OK' }).click();
await page.locator('#gender').selectOption('Male');
await page.locator('#heightFeet').selectOption('5');
await page.locator('#heightInches').selectOption('7');
await page.locator('#street').fill('acc');
await page.locator('#street2').fill('acc2');
await page.locator('#city').fill('acc');
await page.locator('#state').selectOption('Tennessee');
await page.locator('#zipcode').fill('1234');
await page.locator('#country').selectOption('United States');
await page.getByLabel('First Name *').fill('test');
await page.locator('#ecLastname').fill('emergncy');
await page.locator('#ecPhonenumber').fill('0000000000');
await page.locator('label').filter({ hasText: 'TV' }).locator('span').click();
await page.getByRole('button', { name: 'Update' }).click();

await page.getByRole('button', { name: ' Sign Contract Waiver' }).click();
await page.getByRole('row', { name: 'Carcardiac pacemaker,' }).getByLabel('').nth(1).check();
await page.getByRole('row', { name: 'CarCardiac stent, less than 6' }).getByLabel('').nth(1).check();
await page.getByRole('row', { name: 'Current Pregnancy *' }).getByLabel('').nth(1).check();
await page.getByRole('row', { name: 'Epilepsy/Seizure Disorder *' }).getByLabel('').nth(1).check();
await page.locator('canvas').click({
    position: {
      x: 127,
      y: 167
    }
  });
await page.locator('canvas').click({
    position: {
      x: 94,
      y: 94
    }
  });
await page.getByRole('row', { name: 'Kidney disease *' }).getByLabel('').nth(1).check();
await page.getByRole('row', { name: 'Atherosclerosis / blood' }).getByLabel('').nth(1).check();
await page.getByRole('row', { name: 'Hypertension *' }).getByLabel('').nth(1).check();
await page.getByRole('row', { name: 'Thrombosis / thrombophlebitis' }).getByLabel('').nth(1).check();
await page.getByRole('row', { name: 'Parkinson’s Disease *' }).getByLabel('').nth(1).check();
await page.getByRole('row', { name: 'Arrhythmia *' }).getByLabel('').nth(1).check();
await page.getByRole('row', { name: 'Abdominal / inguinal hernia *' }).getByLabel('').nth(1).check();
await page.getByRole('row', { name: 'Progressive muscular' }).getByLabel('').nth(1).check();
await page.getByRole('button', { name: 'Click here to sign' }).first().click();

await page.getByRole('row', { name: 'CarRecent Surgery *' }).getByLabel('').nth(1).check();
await page.getByRole('row', { name: 'Active Skin Infection/Curren' }).getByLabel('').nth(1).check();
await page.getByRole('row', { name: 'Serious Active Disease Or' }).getByLabel('').nth(1).check();
await page.getByRole('button', { name: 'Click here to sign' }).click();
await page.getByRole('button', { name: ' Sign' }).click();
await page.getByRole('button', { name: 'Next ' }).click();

})
test('Execute', async ({page})=>{


})