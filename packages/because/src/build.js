const packageBase = require('./packageBase.json')
const { change, pluck } = require('rambdax')
const { copySync, outputJsonSync, outputFileSync } = require('fs-extra')
const { existsSync } = require('fs')
const { pascalCase, snakeCase, titleCase } = require('string-fn')
const { resolve } = require('path')

const base = resolve(__dirname, '../../')
const themesFolder = resolve(__dirname, '../themes')
const screensFolder = resolve(__dirname, '../screens')
const packageJsonFile = resolve(__dirname, '../package.json')
const readmeFile = resolve(__dirname, '../README.md')

const THEMES = [
  'ask',
  'always',
]

function workingMan(labelRaw){
  const label = `because.${ labelRaw }`
  const pascalName = pascalCase(label)
  const snakeName = snakeCase(label)
  const titleName = titleCase(label)

  const themePath = `${ base }/${ snakeName }/theme/${ pascalName }.json`
  const themeOutput = `${ themesFolder }/${ pascalName }.json`

  const screenPath = `${ base }/${ snakeName }/theme/${ label }.png`
  const screenOutput = `${ screensFolder }/${ label }.png`
  if (!existsSync(themePath)) throw new Error(`themePath - ${ themePath }`)

  copySync(
    themePath,
    themeOutput
  )

  copySync(
    screenPath,
    screenOutput
  )

  const readmePartial = `
  ### ${ titleName }

![${ label }](https://github.com/selfrefactor/niketa-themes/blob/master/packages/${ snakeName }/screens/${ label }.png?raw=true)
`.trim()

  return {
    data : {
      label   : pascalName,
      uiTheme : 'vs-dark',
      path    : `./themes/${ pascalName }.json`,
    },
    readmePartial,
  }
}

function build(themesInput = THEMES){
  const readmeBase = `
# Because

${ themesInput.length } Dark VSCode Themes

## Screens
`.trim()

  const workingManResult = themesInput.map(workingMan)

  const themes = pluck('data', workingManResult)
  const readmePartials = pluck('readmePartial', workingManResult).join('\n\n')

  const toSave = change(
    packageBase,
    'contributes.themes',
    themes
  )

  const readme = `${ readmeBase }\n\n${ readmePartials }`

  outputJsonSync(packageJsonFile, toSave, { spaces : 2 })
  outputFileSync(readmeFile, readme)
}

exports.build = build