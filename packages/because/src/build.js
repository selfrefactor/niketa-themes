const packageBase = require('./packageBase.json')
const { change } = require('rambdax')
const { copySync, outputJsonSync } = require('fs-extra')
const { existsSync } = require('fs')
const { pascalCase, snakeCase } = require('string-fn')
const { resolve } = require('path')

const base = resolve(__dirname, '../../')
const themesFolder = resolve(__dirname, '../themes')
const screensFolder = resolve(__dirname, '../screens')
const packageJsonFile = resolve(__dirname, '../package.json')

const THEMES = [
  'ask',
  'always',
]

function workingMan(label){
  const pascalName = pascalCase(`because.${ label }`)
  const snakeName = snakeCase(`because.${ label }`)

  const themePath = `${ base }/${ snakeName }/theme/${ pascalName }.json`
  const themeOutput = `${ themesFolder }/${ pascalName }.json`

  const screenPath = `${ base }/${ snakeName }/theme/because.${ label }.png`
  const screenOutput = `${ screensFolder }/because.${ label }.png`
  if (!existsSync(themePath)) throw new Error(`themePath - ${ themePath }`)

  copySync(
    themePath,
    themeOutput
  )

  copySync(
    screenPath,
    screenOutput
  )

  return {
    label   : pascalName,
    uiTheme : 'vs-dark',
    path    : `./themes/${ pascalName }.json`,
  }
}

function build(){
  const themes = THEMES.map(workingMan)
  const toSave = change(
    packageBase,
    'contributes.themes',
    themes
  )

  outputJsonSync(packageJsonFile, toSave, { spaces : 2 })
}


exports.build = build
