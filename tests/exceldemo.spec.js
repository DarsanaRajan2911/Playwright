const { test,expect } = require("@playwright/test");
const ExcelJS = require('exceljs')
const filePath = "D:/Obsqura Testing.xlsx"

test("Download excel file",async({page})=>{
    await page.goto("https://selenium.qabible.in/index.php")
    //Click on 'Table' menu
    await page.locator(".nav-link").nth(3).click()
    //Click on 'Table Data Download' sub-menu
    await page.getByRole('link',{name:'Table Data Download'}).click()
    //Click on 'Excel' button
    await page.getByRole('button',{name:'Excel'}).click()
    //Wait for download
    const downloadPromise = page.waitForEvent('download')
    const download = await downloadPromise
    await download.saveAs(filePath);
    console.log(filePath);
})

test("Read and write excel", async () => {
    const workbook = new ExcelJS.Workbook();
    writeExcelFile("D:/Obsqura Testing.xlsx","Darsana Rajan","India",2)
    //Update excel file
    async function writeExcelFile(filepath,searchvalue,changevalue,change) {
        const workbook = new ExcelJS.Workbook()
        await workbook.xlsx.readFile(filepath)
        const worksheet = workbook.getWorksheet("Sheet1")
        const output = await readExcelFile(worksheet,searchvalue)
        const cell = worksheet.getCell(output.row, output.col+change)
        cell.value = changevalue
        await workbook.xlsx.writeFile(filepath)
        console.log("Excel updated successfully.");
    }

    //Read excel file
    async function readExcelFile(worksheet, searchvalue){
    const output = {row:-1,col:-1}
    worksheet.eachRow((row,rownumber)=>{
        row.eachCell((cell,colnumber)=>{
            if(cell.value===searchvalue){
                output.row=rownumber
                output.col=colnumber
                console.log(rownumber,colnumber)
            }
        })
        })
        return output
    }
});

test("Upload updated excel file",async({page})=>{
    await page.goto("https://tiiny.host/")
    // Wait for the file chooser to open
    const fileChooserPromise = page.waitForEvent('filechooser');
    // Click Upload file button
    await page.getByRole('button', { name: 'Upload file' }).first().click();
    // Select the file
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
    // Wait for upload to complete
    await page.waitForTimeout(5000);
    // Verify the uploaded file
    await expect(page.getByText("Obsqura Testing.xlsx")).toBeVisible();
    await page.getByPlaceholder("Email").fill("darsanarajan11@gmail.com")
    await page.getByRole('button',{name:'Continue'}).click()
    // Wait for to get success pop-up
    await page.waitForTimeout(5000);
    // Verify Success message
    await expect(page.locator('.success-box')).toBeVisible();
    await expect(page.getByText('Success')).toBeVisible();
    //await page.pause()
})
//go to selenium qa
//table
//download, read and write excel from exceldemo.js
//upload-tiinyhost-upload file-gmail-success(assert)