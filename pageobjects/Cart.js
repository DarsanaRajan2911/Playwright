class Cart{
    constructor(page){
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
module.exports=Cart