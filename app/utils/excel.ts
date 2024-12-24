export const onExcelDownload = (data: any[] | undefined, fileName: string) => {
  if (!data) {
    return
  }

  import('xlsx').then((xlsx) => {
    const flattenedData = data.map(item => flattenObject(item, '', ' '))
    const worksheet = xlsx.utils.json_to_sheet(flattenedData)
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] }
    const excelBuffer = xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    })

    saveAsExcelFile(excelBuffer, fileName)
  })
}

const flattenObject = (obj: any, parentKey: string = '', separator: string = ' ') => {
  const result: any = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = parentKey ? `${parentKey}${separator}${key}` : key
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        Object.assign(result, flattenObject(obj[key], newKey, separator))
      }
      else {
        result[newKey] = obj[key]
      }
    }
  }
  return result
}

const saveAsExcelFile = (buffer: any, fileName: string) => {
  import('file-saver').then((module) => {
    if (module && module.default) {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
      const EXCEL_EXTENSION = '.xlsx'
      const data = new Blob([buffer], { type: EXCEL_TYPE })

      module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION)
    }
  })
}
