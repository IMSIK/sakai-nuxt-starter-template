import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import process from 'process'
import XLSX from 'xlsx'

// emulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// locale config
const LOCALE_KEY = ['Key Name']
const localeMapping = {
  'English': 'en_us',
  'Simplify Chinese': 'zh_cn',
  'Traditional Chinese': 'zh_tw',
  'Portuguese': 'pt_pt',
}
const localeKeys = Object.keys(localeMapping)
const excludedSheets = ['Version Control']

// paths
const distFolder = path.resolve(__dirname, '../../app/locales') // output to /locales
const sourceFolder = process.argv[2]

if (!sourceFolder) {
  console.error('Missing XLSX source folder path.')
  process.exit(1)
}

const locales = {}
Object.values(localeMapping).forEach((lang) => {
  locales[lang] = {}
})

const filenames = fs.readdirSync(sourceFolder)

filenames.forEach((filename) => {
  const filePath = path.join(sourceFolder, filename)
  if (filename.endsWith('.xlsx')) {
    console.log('Parsing file:', filePath)
    const workbook = XLSX.readFile(filePath)
    workbook.SheetNames.forEach((sheetName) => {
      if (!excludedSheets.includes(sheetName)) {
        console.log('- Sheet:', sheetName)
        parseSheet(workbook.Sheets[sheetName])
      }
    })
  }
})

writeLocaleFiles()

function parseSheet(sheet) {
  try {
    const content = XLSX.utils.sheet_to_json(sheet, {
      defaultValue: null,
    })

    content.forEach((row) => {
      const localeKey = row[LOCALE_KEY]
      if (!localeKey) return

      for (const lang of localeKeys) {
        if (row[lang] !== undefined) {
          locales[localeMapping[lang]][localeKey] = row[lang]
        }
      }
    })
  }
  catch (e) {
    console.error('Error parsing sheet:', e)
  }
}

function writeLocaleFiles() {
  for (const lang in locales) {
    const outputPath = path.join(distFolder, `${lang}.json`)
    fs.writeFileSync(outputPath, JSON.stringify(locales[lang], null, 2), 'utf8')
    console.log(`✓ Wrote ${lang}.json`)
  }
}
