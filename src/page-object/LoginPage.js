const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page;
        this.email_txt_field = page.locator('#input-email');
        this.password_txt_field = page.locator('#input-password');
        this.login_btn = page.getByRole('button', { name: 'Login' })
    }
    async goto() {
        await this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
        await expect(this.page).toHaveTitle('Account Login');
    }
    async emailField_fill() {
        await this.email_txt_field.click();
        await this.email_txt_field.fill('Kennedi46@hotmail.com');
    }
    async passwordField_fill() {
        await this.password_txt_field.click();
        await this.password_txt_field.fill('Qwerty1');
    }
    async incorrectEmail_fill() {
        await this.email_txt_field.click();
        await this.email_txt_field.clear();
        await this.email_txt_field.fill('this is incorrect email');
    }
    async incorrectPassword_fill() {
        await this.password_txt_field.click();
        await this.password_txt_field.clear();
        await this.password_txt_field.fill('this is incorrect password');
    }
    async loginButton_click() {
        await this.login_btn.click();
    }
    async loginFlow() {
        await this.email_txt_field.click();
        await this.email_txt_field.fill('Kennedi46@hotmail.com');
        await this.password_txt_field.click();
        await this.password_txt_field.fill('Qwerty1');
        await this.login_btn.click();
    }
}