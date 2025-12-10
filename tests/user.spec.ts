import { test, expect } from '@playwright/test';

test('create and delete user', async ({ browser }) => {
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();
  const baseUrl = process.env.BASE_URL || 'https://zdj-dev.local';
  await page.goto(baseUrl);

  // Expect a title to be "Harbor"
  await expect(page).toHaveTitle('Harbor');

  // Login with admin user
  await page.getByPlaceholder('Username').fill('admin');
  await page.getByPlaceholder('Password').fill('Harbor12345');

  await page.getByRole('button', { name: 'LOG IN' }).click();

  // After login it should redirect to projects page
  await expect(page).toHaveURL(baseUrl+'/harbor/projects');

  // default project should be present
  await expect(page.getByRole('link', { name: 'library' })).toBeVisible();

  // go to check Users page
  await page.getByRole('link', { name: 'Users' }).click();

  // Expect Users page to be opened
  await expect(page).toHaveURL(baseUrl+'/harbor/users');

  // Create a new user
  await page.getByRole('button', { name: 'NEW USER' }).click();

  await page.locator("input[name='username']").fill('mike01');
  await page.locator("input[name='email']").fill('mike01@example.com');
  await page.locator("input[name='realname']").fill('mike01');
  await page.locator("input[name='newPassword']").fill('Harbor12345');
  await page.locator("input[name='confirmPassword']").fill('Harbor12345');
  await page.getByRole('button', { name: 'OK' }).click();

  // Expect the new user to be present in the users list
  await expect(page.getByRole('gridcell', { name: 'mike01', exact: true})).toBeVisible();

  // delete the created user
  await page.getByRole('row', { name: 'Select Select mike01 No' }).locator('label').click();
  // click action
  await page.getByText('Actions').click();
  // click delete
  await page.getByRole('button', { name: 'Delete' }).click();

  // confirm delete
  await page.getByRole('button', { name: 'Delete' }).click();

  // Expect the user to be deleted from the users list
  await expect(page.getByRole('gridcell', { name: 'mike01', exact: true})).not.toBeVisible();

});

