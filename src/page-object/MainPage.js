const { expect } = require('@playwright/test');


exports.MainPage = class MainPage {

    constructor(page){
        this.page = page;
        this.search_bar = page.getByRole('textbox', { name: 'Search For Products' });
        this.search_button = page.getByRole('button', { name: 'Search' });
        this.shop_by_link = page.getByRole('button', { name: 'Shop by Category' });
        this.home_btn = page.getByRole('link', { name: 'Home' });
        this.special_btn = page.getByRole('link', { name: 'Special Hot', exact: true });
        this.blog_btn = page.getByRole('link', { name: 'Blog', exact: true });
        this.mega_menu = page.getByRole('button', { name: 'Mega Menu' });
        this.mega_menu_item = page.getByRole('heading', { name: 'Laptops' });
        this.addons_menu = page.getByRole('button', { name: 'AddOns Featured' });
        this.addons_menu_item = page.getByRole('link', { name: 'Designs' });
        this.my_account_btn = page.getByRole('button', { name: ' My account' });
        this.register_btn = page.getByRole('link', { name: 'Register' });
        this.login_btn = page.getByRole('link', { name: 'Login' });
        
    }
    async goto() {
        await this.page.goto('https://ecommerce-playground.lambdatest.io/');
        await expect(this.page).toHaveTitle('Your Store');
    }
    async searchBar_click() {
        await this.search_bar.click();
    }
    async searchButton_click() {
        await this.search_button.click();
    }
    async searchBar_fill() {
        await this.search_bar.click();
        await this.search_bar.fill('Mac book pro');
    }
    async shop_by_link_click() {
        await this.shop_by_link.click();
    }
    async home_btn_click() {
        await this.home_btn.click();
    }
    async special_btn_click() {
        await this.special_btn.click();
        await expect(this.page).toHaveTitle('Special Offers');
    }
    async blog_btn_click() {
        await this.blog_btn.click();
        await expect(this.page).toHaveTitle('Blog - Poco theme');
    }
    async mega_menu_hover() {
        await this.mega_menu.hover();
        await expect(this.mega_menu_item).toBeVisible();
    }
    async addons_menu_hover() {
        await this.addons_menu.hover();
        await expect(this.addons_menu_item).toBeVisible();
    }
    async my_account_btn_hover() {
        await this.my_account_btn.hover();
        await expect(this.register_btn).toBeVisible();
    }
    async register_btn_click() {
        await this.register_btn.click();
    }
    async login_btn_click() {
        await this.login_btn.click();
    }
}
