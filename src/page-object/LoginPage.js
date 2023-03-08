const { expect } = require('@playwright/test');
import { faker } from '@faker-js/faker';
require('dotenv').config()


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
        await this.email_txt_field.fill(TEST_EMAIL);
    }
    async passwordField_fill() {
        await this.password_txt_field.click();
        await this.password_txt_field.fill(TEST_PASSWORD);
    }
    async incorrectEmail_fill() {
        await this.email_txt_field.click();
        await this.email_txt_field.clear();
        await this.email_txt_field.fill(faker.lorem.word(10));
    }
    async incorrectPassword_fill() {
        await this.password_txt_field.click();
        await this.password_txt_field.clear();
        await this.password_txt_field.fill(faker.lorem.word(4));
    }
    async loginButton_click() {
        await this.login_btn.click();
    }
    async loginFlow() {
        await this.email_txt_field.click();
        await this.email_txt_field.fill(TEST_EMAIL);
        await this.password_txt_field.click();
        await this.password_txt_field.fill(TEST_PASSWORD);
        await this.login_btn.click();
    }
}