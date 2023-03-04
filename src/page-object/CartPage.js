const { expect } = require('@playwright/test');


exports.CartPage = class CartPage {

    constructor(page){
        this.page = page;
        this.use_coupon = page.getByRole('heading', { name: 'Use Coupon Code ' }).locator('i');
        this.use_coupon_field = page.getByPlaceholder('Enter your coupon here');
        this.apply_coupon_btn = page.getByRole('button', { name: 'Apply Coupon' });
        this.checkout_btn = page.getByRole('link', { name: 'Checkout' });
            

    }
    async useCoupon_click(){
        await this.use_coupon.click();
    }
    async useCouponField_fill(){
        await this.use_coupon_field.click();
        await this.use_coupon_field.fill('50%OFF');
    }
    async applyCouponBtn_click(){
        await this.apply_coupon_btn.click();
    }
    async checkoutButton_click(){
        await this.checkout_btn.click();
    }
    
    
}