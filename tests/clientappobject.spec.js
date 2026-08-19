const {  test,expect } = require("@playwright/test");
const Login = require("../pageobjects/Login");
const Dashboard = require("../pageobjects/Dashboard");
const Cart = require("../pageobjects/Cart");
const ShippingDetails = require("../pageobjects/ShippingDetails");
const Summary = require("../pageobjects/Summary");
const POManager = require("../pageobjects/POManager");
const { customtest } = require("../util/testbase");
const testData = JSON.parse(JSON.stringify(require('../util/placeOrderTestData.json')))
test("Automation of shopping cart app using page object model", async({page})=>{
    let poManager = new POManager(page)
    //let login=new Login(page)
    let login = poManager.getLogin()
    await login.goto()
    await login.validLogin(testData.username, testData.password)
    //let dashboard=new Dashboard(page)
    let dashboard = poManager.getDashboard()
    await dashboard.selectProduct(testData.product)
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
})  
//Here retriving the testdata from js file
//new testcase writing by uusing subcls of test-custom test
//testDataForOrder - is called as fixtures
customtest("Customised testcase",async({page,testDataForOrder})=>{
      let poManager = new POManager(page)
    //let login=new Login(page)
    let login = poManager.getLogin()
    await login.goto()
    await login.validLogin(testDataForOrder.username, testDataForOrder.password)
    //let dashboard=new Dashboard(page)
    let dashboard = poManager.getDashboard()
    await dashboard.selectProduct(testDataForOrder.product)
    await dashboard.moveToCart()
    //let cart=new Cart(page)
    let cart = poManager.getCart()
    await cart.validateItem()
    await cart.clickCheckout()
})