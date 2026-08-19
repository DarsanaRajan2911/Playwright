import { Locator, Page } from "@playwright/test"

const { log } = require("node:console")

export class Login{
    page:Page
    username:Locator
    password:Locator
    loginButton:Locator
    constructor(page:Page){
        this.page=page
        this.username= page.locator("#user-name")
        this.password= page.locator("#password")
        this.loginButton=page.locator("#login-button")
    }
    async goto(){
        await this.page.goto("https://www.saucedemo.com")
    }
    async validLogin(username:string,password:string){
        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()
    }
}
//module.exports=Login