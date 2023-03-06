const { test, expect } = require('@playwright/test');
import { CheckoutPage } from '../src/page-object/CheckoutPage';
const { RegisterAccountPage } = require('../src/page-object/RegisterAccountPage');

test.describe('Тест формы регистрации нового пользователя', () => {
    
    test.use({
        viewport: {
            height: 950,
            width: 1920
        }
    });

    test('That the user is able to successfully register the new account if all the correct data is filled', async ({page}) => {

        const checkoutPage = new CheckoutPage(page); 
        const registerAccountPage = new RegisterAccountPage(page);

        await registerAccountPage.goto();
        // Заполняем first last name
        await checkoutPage.firstNameField_fill();
        await checkoutPage.lastNameField_fill();
        // Заполняем email phone
        await checkoutPage.emailField_fill();
        await checkoutPage.phoneField_fill();

        await registerAccountPage.password_field_fill('Qwerty1');
        await registerAccountPage.password_confirm_field_fill('Qwerty1');
        await registerAccountPage.yes_checkbox.click();
        await registerAccountPage.privacy_checkbox_click();
        await registerAccountPage.continue_btn_click();

        await expect(page).toHaveTitle('Your Account Has Been Created!');
        await page.getByRole('link', { name: 'Continue' }).click();
        await expect(page).toHaveTitle('My Account');

    })
    test('The form validation fields > expect that the correct warnings are shown > unable to register with the invalid data', async ({page}) => {

        const checkoutPage = new CheckoutPage(page); 
        const registerAccountPage = new RegisterAccountPage(page);

        await registerAccountPage.goto();

        await checkoutPage.firstNameField_fill();
        await checkoutPage.lastNameField_fill();
        await checkoutPage.emailField_fill();
        await checkoutPage.phoneField_fill();

        await registerAccountPage.password_field_fill('Qwerty1');
        await registerAccountPage.password_confirm_field_fill('Qwerty1');

        await registerAccountPage.continue_btn_click();
        await expect(page.locator('//*[@class="alert alert-danger alert-dismissible"]')).toHaveText('Warning: You must agree to the Privacy Policy!');

        await checkoutPage.first_name_clear();
        await registerAccountPage.continue_btn_click();
        await expect(page.locator('#account > div:nth-child(3) > div > div')).toHaveText('First Name must be between 1 and 32 characters!');

        await checkoutPage.firstNameField_fill();
        await checkoutPage.lastNameField_clear();
        await registerAccountPage.continue_btn_click();
        await expect(page.locator('#account > div:nth-child(4) > div > div')).toHaveText('Last Name must be between 1 and 32 characters!');

        await checkoutPage.lastNameField_fill();
        await checkoutPage.emailField_clear();
        await registerAccountPage.continue_btn_click();
        await expect(page.locator('//*[@class="text-danger"]')).toHaveText('E-Mail Address does not appear to be valid!');

        await checkoutPage.emailField_fill();
        await checkoutPage.phoneField_clear();
        await registerAccountPage.continue_btn_click();  
        await expect(page.locator('//*[@class="text-danger"]')).toHaveText('Telephone must be between 3 and 32 characters!');

        await checkoutPage.phoneField_fill();
        await registerAccountPage.password_field_clear();
        await registerAccountPage.continue_btn_click();
        await expect(page.locator('#content > form > fieldset:nth-child(2) > div:nth-child(2) > div > div')).toHaveText('Password must be between 4 and 20 characters!');
        await expect(page.locator('#content > form > fieldset:nth-child(2) > div:nth-child(3) > div > div')).toHaveText('Password confirmation does not match password!');
        await registerAccountPage.password_field_fill('Qwerty1');

        await registerAccountPage.continue_btn_click();

        await expect(page.locator('//*[@class="alert alert-danger alert-dismissible"]')).toBeVisible();
        await expect(page.locator('//*[@class="alert alert-danger alert-dismissible"]')).toHaveText('Warning: You must agree to the Privacy Policy!');

    })
})