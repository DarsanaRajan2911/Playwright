import { Locator, Page } from "@playwright/test"

export class Cart{
    page:Page
    item:Locator
    checkout:Locator
    constructor(page:Page){
        this.page=page
        this.item=page.locator(".inventory_item_name")
        this.checkout=page.locator("#checkout")
    }
    async validateItem(){
        await this.item.waitFor()
        console.log(await this.item.textContent())
    }
    async clickCheckout(){
         await this.checkout.click()
    }
}
//module.exports=Cart //not required for TS