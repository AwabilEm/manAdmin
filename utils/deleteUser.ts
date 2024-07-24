// staffHelpers.ts
import { Page } from '@playwright/test';

export async function deleteStaffMember(page: Page, email: string, firstName :string, lastName: string, expectedWarningText: string) {
    // Fill in the search field with the staff email
    await page.fill('input[placeholder="Search..."]', email);

    // Wait for the search results to update (adjust timeout as needed)
    await page.waitForTimeout(2000); // Adjust timeout for search results to load

    // Find all table rows that match the criteria
    const rows = await page.$$('tbody.p-element.p-datatable-tbody tr');
    let rowToClick: any = null; // Declare rowToClick as any type initially

    for (const row of rows) {
        const rowText = await row.innerText();

        // Check if the row contains all specified text values
        if (
            rowText.includes(firstName) &&
            rowText.includes(lastName) &&

            rowText.includes(email)
        ) {
            rowToClick = row;
            break; // Stop after finding the matching row
        }
    }

    // Ensure a matching row was found
    if (!rowToClick) {
        throw new Error('No row matching the specified conditions found.');
    }

    // Click on the action button within the found row to delete the staff member
    const actionButton = await rowToClick.$('button.bg-primary-green.text-white.px-2.py-1.rounded-md.btn-sm.min-w-max');
    if (!actionButton) {
        throw new Error('Action button not found in the row.');
    }

    await actionButton.click();

    // Click on the "Delete" link from the dropdown
    const deleteLink = await page.getByRole('menuitem', { name: 'Delete' });
    await deleteLink.click();

    // Get the warning message text directly
    const warningMessage = await page.$('div.modal-body p.text-xl');
    if (!warningMessage) {
        throw new Error('Warning message element not found.');
    }

    const warningText = await warningMessage.innerText();

    // Compare the warning message with the expected text
    if (!warningText.includes(expectedWarningText)) {
        throw new Error('Warning message does not match the expected text.');
    }

    // Click on the "Yes" button to confirm deletion
    const confirmButton = await page.getByRole('button', { name: 'Yes' });
    if (!confirmButton) {
        throw new Error('Confirm button element not found.');
    }

    await confirmButton.click();
    console.log('Clicked on the delete action button and confirmed deletion.');
}
