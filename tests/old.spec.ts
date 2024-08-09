import { test, expect } from '@playwright/test';
//import { currentsReporter } from '@currents/playwright';
const email = 'manduu.test.old1@gmail.com';
const PhoneNumber = '800-000-0011';

const password = 'TestUser@1'
const fName = 'test';
const lName ='automate'
const selectStu = 'Houston';
const SelectedDate ='11/13/2024'
let selectedTime: string | null = null;
//const CalendarSelectedDate = 17 September, 2024
// Convert selected date to calendar format
let CalendarSelectedDate = convertDate(SelectedDate);
console.log('Selected date',CalendarSelectedDate); // Output: "17 September, 2024"


// Function to convert date format
function convertDate(date: string): string {
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const [month, day, year] = date.split('/').map(part => parseInt(part, 10));
  return `${months[month - 1]} ${day}, ${year}`;
}
 


    test('test', async ({page}) => {
        await page.goto('https://app.manduu.work/account/stafflogin');
      await page.getByPlaceholder('User name or email *').fill(process.env.OLDADUSERNAME!);
      await page.getByPlaceholder('Password *').fill(process.env.OLDADPASSWORD!);
      await page.getByRole('button', { name: 'Log in' }).click();
    //    await page.getByRole('heading', { name: 'Welcome, POSTestStaff' }).click();

    //   await expect(page.getByRole('heading', { name: 'Welcome, POSTestStaff' })).toBeVisible();
      
    //   await page.context().storageState({path: "./LoginAuthCQ.json"})
      });
  
  
  
 