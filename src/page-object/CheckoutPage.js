
import { faker } from '@faker-js/faker';
const { expect } = require('@playwright/test');


exports.CheckoutPage = class CheckoutPage {

    constructor(page){
        this.page = page;
        this.guest_checkout = page.getByText('Guest Checkout');
        this.first_name = page.getByRole('textbox', { name: 'First Name*' });
        this.last_name = page.getByRole('textbox', { name: 'Last Name*' });
        this.email_field = page.getByRole('textbox', { name: 'E-Mail*' });
        this.telephone_field = page.getByPlaceholder('Telephone');
        this.address_field = page.getByRole('textbox', { name: 'Address 1*' });
        this.city_field = page.getByRole('textbox', { name: 'City*' });
        this.post_code = page.getByRole('textbox', { name: 'Post Code*' });
        this.terms_checkmark = page.getByText('I have read and agree to the Terms & Conditions');
        this.continue_btn = page.getByRole('button', { name: 'Continue ' });

    }
    async guestCheckout(){
        await this.guest_checkout.click();
    }
    async firstNameField_fill(){
        await this.first_name.click();
        await this.first_name.fill(faker.internet.userName());
    }
    async lastNameField_fill(){
        await this.last_name.click();
        await this.last_name.fill(faker.internet.userName('Test'));
    }
    async emailField_fill(){
        let email = faker.internet.email();
        await this.email_field.click();
        await this.email_field.fill(email);
        console.log('Email is:', email);
    }
    async phoneField_fill(){
        await this.telephone_field.click();
        await this.telephone_field.fill(faker.phone.number('+7 916 ### ## ##'));
    }
    async addressField_fill(){
        await this.address_field.click();
        await this.address_field.fill(faker.address.streetAddress());
    }
    async cityField_fill(){
        await this.city_field.click();
        await this.city_field.fill(faker.address.cityName());
    }
    async postCodeField_fill(){
        await this.post_code.click();
        await this.post_code.fill(faker.address.zipCode());
    }
    async termsCheckmark(){
        await this.terms_checkmark.click();
    }
    async continueButton(){
        await this.continue_btn.click();
    }
    async first_name_click(){
        await this.first_name.click();
    }
    async first_name_clear(){
        await this.first_name.click();
        await this.first_name.clear();
    }
    async lastNameField_clear(){
        await this.last_name.click()
        await this.last_name.clear();
    }
    async emailField_clear(){
        await this.email_field.click();
        await this.email_field.clear();
    }
    async phoneField_clear(){
        await this.telephone_field.click();
        await this.telephone_field.clear();
    }

}