const {test,expect} = require("@playwright/test");
//test.describe.configure({mode:'parallel'})
test.describe.configure({mode:'serial'})
test("First plywright test",async function(){

})//old method
// new method of testcase
test("Browser context playwright test",async({browser})=>{
    const context = await browser.newContext(); //create context obj
    const page = await context.newPage() //create page obj
    await page.goto("https://www.google.com")
    console.log(await page.title()) //to print title 
    
    await page.goto("https://www.saucedemo.com")
    await page.locator("#user-name").fill("standarduser"); //.fii or .type (.fill is new version than .type)
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();
    //checking for error handling
    console.log(await page.locator(".error-message-container.error").textContent());
    await expect(page.locator(".error-message-container.error")).toHaveText("Epic sadface: Username and password do not match any user in this service") //checking entire error msg
    await expect(page.locator(".error-message-container.error")).toContainText("Epic sadface") //checking contain text
    //clearing wring values and trying with correct value for login
    await page.locator("#user-name").fill("");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#login-button").click();
    
    //const cardtitle = await page.locator(".inventory_item_name").first() //to get first element
    const cardtitle = page.locator(".inventory_item_name");
    console.log(await cardtitle.nth(1).textContent()) //to get 2nd element
    const alltitle = await cardtitle.allTextContents() //to get all element
    console.log(alltitle)
    await page.pause();
})
//6 test means including 3 browser , check in config.js

//next testcase
test("Page context playwright test",async({page})=>{ //test.only -use to execute that test only
    await page.goto("https://www.google.com")
    console.log(await page.title());
    //assertion-conditional statisfy check, using expect() fun
    await expect(page).toHaveTitle("Google");
})

test('UI controls',async({page})=>{
    await page.goto("https://selenium.qabible.in/index.php")
    await page.locator(".nav-link").nth(1).click()
    //Click on 'Checkbox demo' side menu
    await page.locator(".list-group-item").nth(1).click()
    await page.locator("#gridCheck").check()
    //Verifying checkbox selection
    await expect(page.locator("#gridCheck")).toBeChecked() //to be checked
    expect(await page.locator("#gridCheck").isChecked()).toBeTruthy //asserting ischecked is true
    //Verifying the success message of checkbox selection
    await expect(page.locator("#message-one")).toHaveText("Success - Check box is checked")
    //Click on 'Radio buttons demo' side menu
    await page.locator(".list-group-item").nth(2).click()
    await page.locator("#inlineRadio1").check()
    await page.locator("#inlineRadio22").check()
    //Verifying the checkbox selection 
    await expect(page.locator("#inlineRadio22")).toBeChecked()
    expect(await page.locator("#inlineRadio22").isChecked()).toBeTruthy()
    //Click on 'Select Input' side menu
    await page.locator("//a[normalize-space()='Select Input']").click()
    await page.locator("#single-input-field").selectOption("Red")
    //Verifying the dropdown value selection
    await expect(page.locator("#single-input-field")).toHaveValue("Red")
    await expect(page.locator("#message-one")).toHaveText("Selected Color : Red")
    //Click on 'Form submit' side menu
    await page.locator("//a[normalize-space()='Form Submit']").click()
    await page.locator("#validationCustom01").fill("Darsana")
    await page.locator("#validationCustom02").fill("Rajan")
    await page.locator("#validationCustomUsername").fill("Darsana123")
    await page.locator("#validationCustom03").fill("Pathanamthitta")
    await page.locator("#validationCustom04").fill("Kerala")
    await page.locator("#validationCustom05").fill("689549")
    await page.locator("#invalidCheck").check()
    await page.locator(".btn.btn-primary").click()
    //Verifying success message of form submission
    await expect(page.locator("#message-one")).toHaveText("Form has been submitted successfully!")
    //Click on 'Simple form demo' side menu
    await page.locator(".list-group-item").nth(0).click()
    await page.locator("#single-input-field").fill("Hello world")
    await page.locator("#button-one").click()
    //Verifying the entered message
    await expect(page.locator("#message-one")).toHaveText("Your Message : Hello world")
    await page.pause()
})

//child windoww and new tabs handling
test('child window and new tab',async({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://www.google.com")
    //one method to open in new window
    const [childPage] = await Promise.all([
        context.waitForEvent('page'),
        page.evaluate(()=>window.open("https://www.saucedemo.com"))   
    ])
    //Another method to open in new window
    const newTab = await context.newPage()
    await newTab.goto("https://www.github.com")
    console.log("Child window and new tab opened successfully")
    await page.pause()
})
//Special locators
test('Special locators',async({page})=>{
    await page.goto("https://selenium.qabible.in/index.php")
    //await page.locator(".nav-link").nth(1).click()
    await page.getByRole("link",{name:'Input Form'}).click()
    //await page.locator(".list-group-item").nth(1).click()
    await page.getByRole("link",{name:'Checkbox Demo'}).click()
    await page.getByLabel("Click on this check box").check()
    //await page.locator(".list-group-item").nth(2).click()
    await page.getByRole("link",{name:'Radio Buttons Demo'}).click()
    await page.getByLabel("45 to 60").check()
    //await page.locator("//a[normalize-space()='Select Input']").click()
    await page.getByRole("link",{name:'Select Input'}).click()
    await page.getByLabel("Select Color").selectOption("Red")
    //await page.locator("//a[normalize-space()='Form Submit']").click()
    await page.getByRole("link",{name:'Form Submit', exact: true}).click()
    await page.getByPlaceholder("First name").fill("Darsanaa")
    await page.getByPlaceholder("Last name").fill("Rajann")
    await page.getByPlaceholder("Username").fill("Darsana111")
    await page.getByPlaceholder("City").fill("Aranmula")
    await page.getByPlaceholder("State").fill("Keralam")
    await page.getByPlaceholder("Zip").fill("22222")
    await page.getByLabel("Agree to terms and conditions").check()
    await page.getByRole("Button",{name:'Submit form'}).click()
    await page.getByRole("link",{name:'Simple Form Demo'}).click()
    await page.getByPlaceholder("Message").fill("Hello World")
    await page.getByRole("button",{name:'Show Message'}).click()
    await expect(page.getByText("Your Message : Hello World")).toBeVisible()
    await page.pause()
})
//Calendar validations
const date = 12
const month = 11
test('Calendar validation',async({page})=>{
    await page.goto("https://selenium.qabible.in/index.php")
    await page.getByRole("link",{name:'Date Pickers'}).click()
    await page.getByRole("link",{name:'Bootstrap Date Picker'}).click()
    await page.locator("#single-input-field").click()
    await page.locator(".datepicker-days th.datepicker-switch").click()
    await  page.locator(".datepicker-months th.datepicker-switch").click()
    const targetYear = 1997
    while(true){
        const cuurentDecade = await page.locator(".datepicker-years th.datepicker-switch").textContent()
        const startDecade = parseInt(cuurentDecade.split("-")[0])
        if(targetYear>=startDecade && targetYear<=startDecade+9){
            break
        }
        await page.locator(".datepicker-years th.prev").click()
    }
    await page.getByText(targetYear.toString(),{exact:true}).click()
    await page.locator(".month").nth(month-1).click()
    await page.getByText(date.toString(),{exact:true}).click()
    await page.pause()
})