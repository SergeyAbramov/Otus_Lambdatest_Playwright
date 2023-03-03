const { test, expect } = require('@playwright/test');
import { CartPage } from '../src/page-object/CartPage';
import { CheckoutPage } from '../src/page-object/CheckoutPage';
const { MainPage } = require('../src/page-object/MainPage');

test.describe('Homework Основные сценарии использования Playwright',
() => {

    test.use({
        viewport: {
            height: 950,
            width: 1920
        }
    });
    
    test('That user is able to go to test site > search for desired product > add it to the card > apply the coupon > go to checkout > place the order', async ({page}) => {

        const TestPage = new MainPage(page);
        const ShopCartPage = new CartPage(page);
        const CheckOutPage = new CheckoutPage(page);
        
        // Go to test site
        await TestPage.goto();
        await TestPage.searchBar();
        // Search for MacBook
        await TestPage.searchBarFill();
        await TestPage.searchButton();
        // Search results page
        await expect(page).toHaveTitle('Search - Mac book pro');
        // Add the first item in the cart
        await expect(page.locator('#mz-product-grid-image-45-212469')).toBeVisible();
        await page.locator('#mz-product-grid-image-45-212469').hover();
        await page.locator('button.btn.btn-cart.cart-45 > i').click();
        // Click view cart
        await expect(page.getByText('Success: You have added MacBook Pro to your shopping cart!')).toBeVisible();
        await page.getByRole('link', { name: 'View Cart ' }).click();

        // CartPage
        await expect(page).toHaveTitle('Shopping Cart');
        // On the cart page try to apply coupon
        await ShopCartPage.useCoupon();
        await ShopCartPage.useCouponField();
        await ShopCartPage.applyCouponBtn();
        // Expect that error is shown
        await expect(page.locator('//*[@class="alert alert-danger alert-dismissible"]')).toHaveText('Warning: Coupon is either invalid, expired or reached its usage limit! ×');
        // Go to checkout
        await ShopCartPage.checkoutButton();
        await expect(page).toHaveTitle('Checkout');
        // Fill all the data > click continue
        await CheckOutPage.guestCheckout();
        await CheckOutPage.firstNameField_fill();
        await CheckOutPage.lastNameField_fill();
        await CheckOutPage.emailField_fill();
        await CheckOutPage.phoneField_fill();
        await CheckOutPage.addressField_fill();
        await CheckOutPage.cityField_fill();
        await CheckOutPage.postCodeField_fill();
        await CheckOutPage.termsCheckmark();
        await CheckOutPage.continueButton();
        // Confirm order screen is shown
        await expect(page).toHaveTitle('Confirm Order');
        // Take a page screenshot
        await page.screenshot({path: 'playwright-report/order_screenshot.png', fullPage: true});

        await page.getByRole('button', { name: 'Confirm Order ' }).click();
        // Order success screen
        await expect(page).toHaveTitle('Your order has been placed!');

        await page.getByRole('link', { name: 'Continue' }).click();
        // Main screen is shown
        await expect(page).toHaveTitle('Your Store');
       

    })
})