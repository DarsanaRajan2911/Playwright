import { Locator, Page } from "@playwright/test"

export class Summary{
    page:Page
    summary:Locator
    subTotal:Locator
    finish:Locator
    constructor(page:Page){
        this.page=page
        this.summary=page.locator(".summary_info")
        this.subTotal=page.locator(".summary_subtotal_label")
        this.finish=page.locator("#finish")
    }
    async validateSummary(){
        await this.summary.waitFor()
        console.log(await this.subTotal.textContent())
    }
    async clickOnFinish(){
        await this.finish.click()
    }
}
//module.exports=Summary