import { Locator, Page } from "@playwright/test"

export class ShippingDetails{
    page:Page
    firstName:Locator
    lastName:Locator
    pinCode:Locator
    continue:Locator
    constructor(page:Page){
        this.page=page
        this.firstName=page.locator("#first-name")
        this.lastName=page.locator("#last-name")
        this.pinCode=page.locator("#postal-code")
        this.continue=page.locator("#continue")
    }
    async enterShippingDetails(firstName:string,lastName:string,pinCode:string){
        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.pinCode.fill(pinCode)
    }
    async clickContinue(){
        await this.continue.click()
    }
}
//module.exports=ShippingDetails