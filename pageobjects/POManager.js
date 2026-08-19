const Cart = require("./Cart")
const Dashboard = require("./Dashboard")
const Login = require("./Login")
const ShippingDetails = require("./ShippingDetails")
const Summary = require("./Summary")

class POManager{
    constructor(page){
        this.page = page
        this.cart = new Cart(page)
        this.dashboard = new Dashboard(page)
        this.login = new Login(page)
        this.shippingDetails =  new ShippingDetails(page)
        this.summary = new Summary(page)
    }
    getCart(){
        return this.cart
    }
    getDashboard(){
        return this.dashboard
    }
    getLogin(){
        return this.login
    }
    getShippingDetails(){
        return this.shippingDetails
    }
    getSummary(){
        return this.summary
    }
}
module.exports = POManager