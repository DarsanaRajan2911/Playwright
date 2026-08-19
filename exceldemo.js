const ExcelJS = require('exceljs')
async function writeExcelFile(filepath,searchvalue,changevalue,change) {
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(filepath)
    const worksheet = workbook.getWorksheet("Sheet1")
    const output = await readExcelFile(worksheet,searchvalue)
    //const cell = worksheet.getCell(output.row, output.col)
        const cell = worksheet.getCell(output.row, output.col+change)
    cell.value = changevalue
    await workbook.xlsx.writeFile(filepath)
}
async function readExcelFile(worksheet, searchvalue){
    const output = {row:-1,col:-1}
    worksheet.eachRow((row,rownumber)=>{
        row.eachCell((cell,colnumber)=>{
            //console.log(cell.value)
            //if(cell.value==="Airi Satou"){
            if(cell.value===searchvalue){
                output.row=rownumber
                output.col=colnumber
                console.log(rownumber,colnumber)
            }
        })
    })
    return output
}
writeExcelFile("D:/Obsqura Testing.xlsx","Angelica Ramos","Newyork",2)