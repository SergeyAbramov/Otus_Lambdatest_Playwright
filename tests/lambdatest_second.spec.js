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
        // Заполняем first last name c помощю faker
        await checkoutPage.firstNameField_fill();
        await checkoutPage.lastNameField_fill();
        // Заполняем email phone с помощю faker
        await checkoutPage.emailField_fill();
        await checkoutPage.phoneField_fill();
        // Заполняем first last name c помощю .env файла
        await registerAccountPage.password_field_fill(process.env.TEST_PASSWORD);
        await registerAccountPage.password_confirm_field_fill(process.env.TEST_PASSWORD);
        // Ставим чекмарку YES и privacy >>> кликаем continue
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

        await registerAccountPage.goto(); //Страница регистрации

        await checkoutPage.firstNameField_fill(); // Заполняем все поля с помощью faker
        await checkoutPage.lastNameField_fill();
        await checkoutPage.emailField_fill();
        await checkoutPage.phoneField_fill();

        await registerAccountPage.password_field_fill(process.env.TEST_PASSWORD);
        await registerAccountPage.password_confirm_field_fill(process.env.TEST_PASSWORD);

        await registerAccountPage.continue_btn_click(); // Кликаем на continue btn >>> warning is shown
        await expect(page.locator('//*[@class="alert alert-danger alert-dismissible"]')).toHaveText('Warning: You must agree to the Privacy Policy!'); // Warning

        await checkoutPage.first_name_clear(); // Очищаем поле ввода >>> Кликаем на continue btn
        await registerAccountPage.continue_btn_click();
        await expect(page.locator('#account > div:nth-child(3) > div > div')).toHaveText('First Name must be between 1 and 32 characters!'); // Warning

        await checkoutPage.firstNameField_fill(); // Заполняем снова поле с помощью faker
        await checkoutPage.lastNameField_clear(); // Очищаем предидущее поле ввода >>> Кликаем на continue btn
        await registerAccountPage.continue_btn_click();
        await expect(page.locator('#account > div:nth-child(4) > div > div')).toHaveText('Last Name must be between 1 and 32 characters!'); // Warning

        await checkoutPage.lastNameField_fill(); // Заполняем снова поле с помощью faker
        await checkoutPage.emailField_clear(); // Очищаем предидущее поле ввода >>> Кликаем на continue btn
        await registerAccountPage.continue_btn_click();
        await expect(page.locator('//*[@class="text-danger"]')).toHaveText('E-Mail Address does not appear to be valid!'); // Warning

        await checkoutPage.emailField_fill(); // Заполняем снова поле с помощью faker
        await checkoutPage.phoneField_clear(); // Очищаем предидущее поле ввода >>> Кликаем на continue btn
        await registerAccountPage.continue_btn_click();  
        await expect(page.locator('//*[@class="text-danger"]')).toHaveText('Telephone must be between 3 and 32 characters!'); // Warning

        await checkoutPage.phoneField_fill(); // Заполняем снова поле с помощью faker
        await registerAccountPage.password_field_clear(); // Очищаем предидущее поле ввода >>> Кликаем на continue btn
        await registerAccountPage.continue_btn_click();
        await expect(page.locator('#content > form > fieldset:nth-child(2) > div:nth-child(2) > div > div')).toHaveText('Password must be between 4 and 20 characters!'); // Warning
        await expect(page.locator('#content > form > fieldset:nth-child(2) > div:nth-child(3) > div > div')).toHaveText('Password confirmation does not match password!'); // Warning
        await registerAccountPage.password_field_fill(process.env.TEST_PASSWORD);

        await registerAccountPage.continue_btn_click();

        await expect(page.locator('//*[@class="alert alert-danger alert-dismissible"]')).toBeVisible();
        await expect(page.locator('//*[@class="alert alert-danger alert-dismissible"]')).toHaveText('Warning: You must agree to the Privacy Policy!');

    })
})