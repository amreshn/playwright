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
    const actualMessage = await page.locator("#message").textContent();
    expect(actualMessage).toBe(textMessage);
});

test("Test Scenario 2", async ({page})=>{
    const requiredValue = 95;
    const defaultValue = 15;
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

test("Test Scenario 3", async ({page})=>{
    await page.goto("https://www.lambdatest.com/selenium-playground/");
    await expect(page).toHaveTitle("Selenium Grid Online | Run Selenium Test On Cloud");
    await page.locator("[href*='input-form-demo']").click();
    expect(page.url()).toContain("input-form-demo");
    const nameField = page.locator("#name");
    const email = page.locator("#inputEmail4");
    const password = page.locator("#inputPassword4");
    const company = page.locator("#company");
    const website = page.locator("#websitename");
    const city = page.locator("#inputCity");
    const address1 = page.locator("#inputAddress1");
    const address2 = page.locator("#inputAddress2");
    const state = page.locator("#inputState");
    const zipCOde = page.locator("#inputZip");
    const country = page.locator("[name='country']");
    const submitButton = page.locator("text='Submit'");


    await submitButton.click();
    
    const validationMessage = await nameField.evaluate((element) => {
        const input = element;
        return input.validationMessage;
    });
    expect(validationMessage).toBe("Please fill out this field.");

    await nameField.fill("Sachin");
    await email.fill("abc@gmail.com");
    await password.fill("sachinSaga@#");
    await company.fill("Arjun and Co.");
    await website.fill("www.srtarj.com");
    await country.selectOption("India");
    await city.fill("Mumbai");
    await address1.fill("Wankhade");
    await address2.fill("Navi Mumbai");
    await state.fill("Maharashtra");
    await zipCOde.fill("6000145");
    await submitButton.click();

    await page.waitForSelector("text='Input form validations'");
    const successMessage = await page.locator("[class*='success-msg']").textContent();
    expect(successMessage).toBe("Thanks for contacting us, we will get back to you shortly.");
});