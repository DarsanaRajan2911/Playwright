import {test as basetest} from "@playwright/test"
interface Testdatafororder{
    username:string;
    password:string;
    product:string;
}
//extend subcls of test
export const customtest = basetest.extend<{testdatafororder:Testdatafororder}>({
    testdatafororder:{
        username:"standard_user",
        password:"secret_sauce",
        product:"Sauce Labs Backpack"
    }
})