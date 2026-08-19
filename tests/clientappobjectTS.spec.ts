import { POManager } from "../pageobjectsTS/POManager";

import {  test,expect } from "@playwright/test";
import { customtest } from "../utilTS/testbase";
/*const Login = require("../pageobjects/Login");
const Dashboard = require("../pageobjects/Dashboard");
const Cart = require("../pageobjects/Cart");
const ShippingDetails = require("../pageobjects/ShippingDetails");
const Summary = require("../pageobjects/Summary");*/
//const POManager = require("../pageobjects/POManager");
//const { customtest } = require("../util/testbase");
const testData = JSON.parse(JSON.stringify(require('../utilTS/placeOrderTestData.json')))
for(const data of testData){
test(`Automation of shopping cart app using page object model for purchase of ${data.product}`, async({page})=>{
    let poManager = new POManager(page)
    //let login=new Login(page)
    let login = poManager.getLogin()
    await login.goto()
    await login.validLogin(data.username, data.password)
    //let dashboard=new Dashboard(page)
    let dashboard = poManager.getDashboard()
    await dashboard.selectProduct(data.product)
    await dashboard.moveToCart()
    //let cart=new Cart(page)
    let cart = poManager.getCart()
    await cart.validateItem()
    await cart.clickCheckout()
    //let shippingDetails=new ShippingDetails(page)
    let shippingDetails = poManager.getShippingDetails()
    await shippingDetails.enterShippingDetails("Darsana","Rajan","12345")
    await shippingDetails.clickContinue()
    //let summary= new Summary(page)
    let summary = poManager.getSummary()
    await summary.validateSummary()
    await summary.clickOnFinish()
    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!")
    await page.pause()
})  
}
//Here retriving the testdata from js file
//new testcase writing by uusing subcls of test-custom test
//testDataForOrder - is called as fixtures
customtest("Customised testcase",async({page,testdatafororder})=>{
      let poManager = new POManager(page)
    //let login=new Login(page)
    let login = poManager.getLogin()
    await login.goto()
    await login.validLogin(testdatafororder.username, testdatafororder.password)
    //let dashboard=new Dashboard(page)
    let dashboard = poManager.getDashboard()
    await dashboard.selectProduct(testdatafororder.product)
    await dashboard.moveToCart()
    //let cart=new Cart(page)
    let cart = poManager.getCart()
    await cart.validateItem()
    await cart.clickCheckout()
})
