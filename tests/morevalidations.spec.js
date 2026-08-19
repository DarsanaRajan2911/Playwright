const {test,expect } = require("@playwright/test");

//Pop-up validations
test("Popup validations",async({page})=>{
    //Navigate to saucedemo
    await page.goto("https://www.saucedemo.com")
    await expect(page.locator(".error-message-container.error")).toBeHidden()
    await page.locator("#login-button").click()
    await expect(page.locator(".error-message-container.error")).toBeVisible()

    //Navigate to Selenium qabible
    await page.goto("https://selenium.qabible.in/index.php")
    await page.getByRole("link",{name:'Alerts and Modals'}).click()
    await page.getByRole("link",{name:'Javascript Alert'}).click()
    //if not given await, it can goes to another step for execution before executing thos
    //Dialog box button click code should be written before writing the code of button click to get dialog box
    page.on('dialog',async dialog=>{
        await page.waitForTimeout(3000)
        await dialog.accept()
        //await dialog.dismiss()
    })
    await page.locator(".btn.btn-warning").click()

    await expect(page.locator("#confirm-demo")).toHaveText("You pressed OK!")
    //Click on 'Others' menu
    await page.getByRole("link",{name:'Others'}).hover()
    //frames
    await page.goto("https://demoqa.com/frames")
    const framePage = page.frameLocator("#frame1")
    console.log(await framePage.locator("#sampleHeading").textContent())
    await expect(framePage.locator("#sampleHeading")).toHaveText("This is a sample page")
    //await page.pause()
})

//Visual comparision
test('Visual comparision',async({page})=>{
    await page.goto("https://www.saucedemo.com")
    expect(await page.screenshot()).toMatchSnapshot('saucedemo.png')

})

//Screenshot
test('Screenshot',async({page})=>{
    await page.goto("https://www.saucedemo.com")
    await expect(page.locator(".error-message-container.error")).toBeHidden()
    await page.locator("#login-button").click()
    await expect(page.locator(".error-message-container.error")).toBeVisible()
    await page.locator('.error-message-container.error').screenshot({path:'error.png'})
    await page.screenshot({path:'error1.png'})
    //await page.pause()
})