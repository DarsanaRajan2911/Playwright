const { report } = require("node:process");

const config = ({
  testDir:'./tests',
  timeout:40*1000,
  expect:{
    timeout:40*1000,
  },
  reporter:'html',
  use:{
    browserName:'chromium',
    headless:false, // to open browser
    screenshot:'on',
    trace:'on'
  }
})
module.exports = config // to launch browser