const { expect } = require('@playwright/test');

exports.MyAccountPage = class MyAccountPage {

    constructor(page){
        this.page = page;
        this.modify_wish_list_btn = page.getByRole('link', { name: ' Wish List' });
    }

    async goto(){
        await this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/account');
        await expect(this.page).toHaveTitle('My Account');
    }
    async modify_wish_list_btn_click() {
        await this.modify_wish_list_btn.click();
        await expect(this.page).toHaveTitle('My Wish List');
    }
    
}