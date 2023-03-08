
const { test, expect } = require('@playwright/test');
const { LoginPage } = require ('../src/page-object/LoginPage');
const { MainPage } = require( '../src/page-object/MainPage');
const { MyAccountPage } = require('../src/page-object/MyAccountPage');
test.describe('Тест опции добавить в список желаний', () => {

    test.use({
        viewport: {
            height: 950,
            width: 1920
        }
    });

    test('That user is able to add the desired product to the wishlist', async ({page}) => {

        const TestMainPage = new MainPage(page);
        const TestPage = new LoginPage(page);
        let add_to_wishlist = page.getByRole('button', { name: '' }).first();

        await TestPage.goto();
        await expect(page).toHaveTitle('Account Login');
        //Login >>>
        await TestPage.loginFlow();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveTitle('My Account');
        await page.screenshot({ path: '.playwright-report/account_login_ok' + Date.UTC + '.png', fullPage: true });

        await TestMainPage.goto();
        await TestMainPage.searchBar_fill();
        await TestMainPage.searchButton_click();
        await expect(page).toHaveTitle('Search - Mac book pro');
        await expect(page.locator('#mz-product-grid-image-45-212469')).toBeVisible();
        await page.locator('#mz-product-grid-image-45-212469').hover();
        await expect(add_to_wishlist).toBeVisible({timeout: 1000});
        await page.getByRole('button', { name: '' }).first().click();
        await expect(page.getByText('Success: You have added MacBook Pro to your wish list!')).toBeVisible();

        await page.getByRole('link', { name: 'Wishlist', exact: true }).click();
        await expect(page).toHaveTitle('My Wish List');
        await expect(page.locator('#content > div.table-responsive > table > tbody > tr > td:nth-child(2) > a')).toHaveText('MacBook Pro');
        await page.getByRole('link', { name: 'Continue' }).click();
        await expect(page).toHaveTitle('My Account');
        // Logout >>>
        await page.locator('#column-right > div > a:nth-child(14)').click();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveTitle('Account Logout');
        await page.getByRole('link', { name: 'Continue' }).click();

    })

    test('That the user is able to remove the item from the wishlist', async ({ page }) => {

        const TestMyAccountPage = new MyAccountPage(page);
        const TestPage = new LoginPage(page);

        await TestPage.goto();
        await expect(page).toHaveTitle('Account Login');
        //Login >>>
        await TestPage.loginFlow();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveTitle('My Account');
        await page.screenshot({ path: 'playwright-report/account_login_ok.png', fullPage: true });

        await TestMyAccountPage.goto();
        await TestMyAccountPage.modify_wish_list_btn_click();
        await page.locator('#content > div.table-responsive > table > tbody > tr > td.text-right.text-nowrap > a > i').click();
        await expect(page.locator('//*[@class="alert alert-success alert-dismissible"]')).toHaveText(' Success: You have modified your wish list!\n× ');
        await page.getByRole('link', { name: 'Continue' }).click();
        await expect(page).toHaveTitle('My Account');
        // Logout >>>
        await page.locator('#column-right > div > a:nth-child(14)').click();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveTitle('Account Logout');
        await page.getByRole('link', { name: 'Continue' }).click();

    })
})