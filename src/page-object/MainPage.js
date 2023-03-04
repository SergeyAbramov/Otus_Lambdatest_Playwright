const { expect } = require('@playwright/test');


exports.MainPage = class MainPage {

    constructor(page){
        this.page = page;
        this.search_bar = page.getByRole('textbox', { name: 'Search For Products' });
        this.search_button = page.getByRole('button', { name: 'Search' });

        
    }
    async goto(){
    await this.page.goto('https://ecommerce-playground.lambdatest.io/');
    await expect(this.page).toHaveTitle('Your Store');
    }
    async searchBar_click(){
            await this.search_bar.click();
    }
    async searchButton_click(){
        await this.search_button.click();
    }
    async searchBar_fill(){
        await this.search_bar.fill('Mac book pro');
    }
    
    
}
