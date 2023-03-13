# Otus_Lambdatest_Playwright

// This is my project created in the Qtus QA JS automation course

// I've created a few tests of the e-shop https://ecommerce-playground.lambdatest.io/index.php?route=common/home

// Added the Allure reporter 

// Added .env file to store all environment variables

// Added the GitHub Actions workflow by pull requests and cron om every monday

// Added the Telegram notification about the new commit

// To start the tests run >>> npx playwright test // in cli >>> it will run all the tests from the tests dir >>> in all the browsers in headless mode

// To generate the allure report run >>> allure generate -c // in cli

// To open the allure reporter run >>> allure open // in cli

// To run a selected test run >>> npx playwright test lambdatest_first.spec.js --headed --project=chrome // in cli >>> it will run selected test in selected browser

