
const { test, expect } = require('@playwright/test');
const { MainPage } = require('../src/page-object/MainPage');

test.describe('Тест верхнего навигационного меню', async () => {
    test.use({
        viewport: {
            height: 950,
            width: 1920
        }
    });
    test('Test that the top nav menu leads to the correct source and is functional', async ( {page} ) => {

        const testPage = new MainPage(page);
        const list = page.locator('#widget-navbar-217841 > ul');

        await testPage.goto();
        await page.pause();
        await testPage.shop_by_link_click();
        await expect(page.getByRole('heading', { name: 'Top categories close' })).toBeVisible();

        await expect(list.getByRole('listitem')).toHaveCount(16);

        await page.getByRole('heading', { name: 'Top categories close' }).getByRole('link', { name: 'close' }).click();

        await testPage.special_btn_click();

        await testPage.blog_btn_click();

        await testPage.mega_menu_hover();

        await testPage.addons_menu_hover();

        await testPage.my_account_btn_hover();
        await testPage.register_btn_click();
        await expect(page).toHaveTitle('Register Account');

        await testPage.home_btn_click();
        await expect(page).toHaveTitle('Your Store');





    })

})