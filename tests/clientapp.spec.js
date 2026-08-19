const {test, expect } = require("@playwright/test");

test('@web client app login',async({page})=>{
    await page.goto("https://www.saucedemo.com")
    await page.locator("#user-name").fill("standard_user")
    await page.locator("#password").fill("secret_sauce")
    await page.locator("#login-button").click()
    //for wait
    await page.waitForLoadState('networkidle')
    await page.locator(".inventory_item_name").first().waitFor()
    const titles = await page.locator(".inventory_item_name").allTextContents()
    console.log(titles)
    const product = page.locator(".inventory_item")
    const productName = 'Sauce Labs Backpack'
    const count = await product.count()
    console.log(count)
    for(let i=0;i<count;i++){
        if(await product.nth(i).locator(".inventory_item_name ").textContent()===productName){
            await product.nth(i).locator("text=Add to cart").click()
            break
        }            
    }
    await page.locator("#shopping_cart_container").click()
    await page.locator(".inventory_item_name").waitFor()
    //Verifying added product is visible in the cart
    expect(await page.locator(".inventory_item_name").isVisible()).toBeTruthy()
    await page.locator("#checkout").click()
    await page.locator("#first-name").fill("Darsana")
    await page.locator("#last-name").fill("Rajan")
    await page.locator("#postal-code").fill("689549")
    await page.locator("#continue").click()
    await page.locator(".summary_info").waitFor()
    await expect(page.locator(".summary_subtotal_label")).toHaveText("Item total: $29.99")
    await page.locator("#finish").click()
    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!")
    await page.pause()
})
//more than one file-run-mention file name