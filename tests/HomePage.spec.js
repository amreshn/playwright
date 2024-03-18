const {test, expect} = require('@playwright/test');
const { url } = require('inspector');

test("Test Scenario 1", async ({browser})=>{
    
    const textMessage = "Welcome to LambdaTest";
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.lambdatest.com/selenium-playground/");
    await expect(page).toHaveTitle("Selenium Grid Online | Run Selenium Test On Cloud");
    await page.locator("[href*='simple-form-demo']").click();
    await expect(page.url()).toContain("simple-form-demo");
    await page.locator("[placeholder='Please enter your Message']").fill(textMessage);
    await page.locator("#showInput").click();
    await expect(page.locator("#message")).toHaveText(textMessage);
});

test.only("Test Scenario 2", async ({page})=>{
    const requiredValue = 95;
    const defaultValue = 15;
    const textMessage = "Welcome to LambdaTest";
    await page.goto("https://www.lambdatest.com/selenium-playground/");
    await expect(page).toHaveTitle("Selenium Grid Online | Run Selenium Test On Cloud");
    await page.locator("[href*='drag-drop-range-sliders-demo']").click();
    expect(page.url()).toContain("drag-drop-range-sliders-demo");
    await page.locator("[value='"+ defaultValue.toString() +"']").click();
    for( let i=0; i<=requiredValue-defaultValue ; i++){
        await page.keyboard.press('ArrowRight');
        if(await page.locator("#rangeSuccess").textContent() === requiredValue.toString()){
            expect(page.locator("#rangeSuccess")).toHaveText(requiredValue.toString());
            break;
        }
    }
});