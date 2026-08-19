import { devices } from "@playwright/test";
const { report } = require("node:process");

const config = ({
  testDir:'./tests',
  retries:1, //to retry the execution , and it shows as not like pass, shows flaky=1
  workers:2,
  timeout:40*1000,
  expect:{
    timeout:40*1000,
  },
  reporter:'html',
  projects:[ //projects using for more than one configurations
    {
      name:'safari',
  use:{
    browserName:'webkit',
    headless:true, // to open browser
    screenshot:'on',
    trace:'on'
  },
},
{
  name:'chrome',
  use:{
    browserName:'chromium',
    headless:false, // to open browser
    screenshot:'off',
    trace:'on',
    //... devices['iPhone 11'],
    //viewport:{width:500,height:500} // to customise browser size
    IgnoreHttpsErrors:true, // to accept and ingore https errors
    Permissions:['geolocation'], //this allows the site to know our location
    //video:'retain-on-failure'
    video:'on' //exceution recordings
  }
}
]
})
module.exports = config // to launch browser
//command to run this - npx playwright test clientappobject.spec.js --config playwright.config1.js --project=chrome