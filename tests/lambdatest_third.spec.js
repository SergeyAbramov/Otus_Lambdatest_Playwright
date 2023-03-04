const { test, expect } = require('@playwright/test');
import { LoginPage } from '../src/page-object/LoginPage';


test.describe('Test of the login page', () => {
    test.use({
        viewport: {
            height: 950,
            width: 1920
        }
    });
    test('That the user unable to login with invalid or non existing credentials', async ({page}) => {

        const TestLoginPage = new LoginPage(page);

        await TestLoginPage.goto();
        await TestLoginPage.incorrectEmail_fill();
        await TestLoginPage.incorrectPassword_fill();
        await TestLoginPage.loginButton_click();
        await expect(page.locator('//*[@class="alert alert-danger alert-dismissible"]')).toBeVisible();
        await expect(page.locator('//*[@class="alert alert-danger alert-dismissible"]')).toHaveText('Warning: No match for E-Mail Address and/or Password.');

    })

    test('That user user is able to login into the account with valid credentials', async ({page}) => {

        const TestLoginPage = new LoginPage(page);

        await TestLoginPage.goto();
        await TestLoginPage.emailField_fill();
        await TestLoginPage.passwordField_fill();
        await TestLoginPage.loginButton_click();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveTitle('My Account');
        await expect(page.locator('#column-right > div > a:nth-child(14)')).toHaveText('Logout');
    })

    test('The login/logout flow for future tests', async ({page}) => {

        const TestLoginPage = new LoginPage(page);

        await TestLoginPage.goto();
        await expect(page).toHaveTitle('Account Login');
        //Login >>>
        await TestLoginPage.loginFlow();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveTitle('My Account');
        await page.screenshot({path: 'playwright-report/account_login_ok.png', fullPage: true});
        // Logout >>>
        await page.locator('#column-right > div > a:nth-child(14)').click();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveTitle('Account Logout'); 

    })
    
})