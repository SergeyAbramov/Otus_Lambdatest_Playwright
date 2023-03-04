
const { expect } = require('@playwright/test');


exports.RegisterAccountPage = class RegisterAccountPage {

    constructor(page) {
        this.page = page;
        this.password_field = page.locator('#input-password');
        this.password_confirm_field = page.locator('#input-confirm');
        this.yes_checkbox = page.getByText('Yes');
        this.privacy_checkbox = page.getByText('I have read and agree to the Privacy Policy');
        this.continue_btn = page.locator('//*[@class="btn btn-primary"]');


    }
    async goto() {
        await this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register');
        await expect(this.page).toHaveTitle('Register Account');
    }
    async password_field_fill(password) {
        await this.password_field.click();
        await this.password_field.fill(password);
    }
    async password_confirm_field_fill(password) {
        await this.password_confirm_field.click();
        await this.password_confirm_field.fill(password);
    }
    async privacy_checkbox_click() {
        await this.privacy_checkbox.click();
    }
    async continue_btn_click() {
        await this.continue_btn.click();
    }
    async password_field_clear() {
        await this.password_field.click();
        await this.password_field.clear();
    }
}