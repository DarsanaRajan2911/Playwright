import { Locator, Page } from "@playwright/test"

export class Dashboard{
    page:Page
    item:Locator
    product:Locator
    cart:Locator
    constructor(page:Page){
        this.page=page
        this.item=page.locator(".inventory_item_name")
        this.product=page.locator(".inventory_item")
        this.cart=page.locator("#shopping_cart_container")
    }
    async selectProduct(productName:string){
        await this.page.waitForLoadState('networkidle')
        //await this.item.first().waitFor()
        const titles = await this.item.allTextContents()
        console.log(titles)
        //const product = page.locator(".inventory_item")
        //const productName = 'Sauce Labs Backpack'
        const count = await this.product.count()
        console.log(count)
        for(let i=0;i<count;i++){
            if(await this.product.nth(i).locator(".inventory_item_name ").textContent()===productName){
                await this.product.nth(i).locator("text=Add to cart").click()
                break
            }            
        }
    }
    async moveToCart(){
        await this.cart.click()
    }
}
//module.exports=Dashboard