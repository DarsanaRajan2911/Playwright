const base = require("@playwright/test")
//extend subcls of test
exports.customtest = base.test.extend({
    testDataForOrder:{
        username:"standard_user",
        password:"secret_sauce",
        product:"Sauce Labs Backpack"
    }
})