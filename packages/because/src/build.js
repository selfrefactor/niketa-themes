const { pascalCase, snakeCase } = require('string-fn')
const { copySync } = require('fs-extra')
const packageBase = require('./packageBase.json')
const { existsSync } = require('fs')
const { resolve } = require('path')

const base = resolve(__dirname, '../../')
const themesFolder = resolve(__dirname, '../themes')
const screensFolder = resolve(__dirname, '../screens')

const THEMES = [
  'ask',
  'always',
]

function workingMan(label){
  const pascalName = pascalCase(`because.${label}`)
  const snakeName = snakeCase(`because.${label}`)

  const themePath = `${base}/${snakeName}/theme/${pascalName}.json`
  const themeOutput = `${themesFolder}/${pascalName}.json`
  
  const screenPath = `${base}/${snakeName}/theme/because.${label}.png`
  const screenOutput = `${screensFolder}/because.${label}.png`
  if(!existsSync(themePath)) throw new Error(`themePath - ${themePath}`)

  copySync(
    themePath,
    themeOutput
  )

  copySync(
    screenPath,
    screenOutput
  )

}

function build(){
  const result = THEMES.map(workingMan)
  return result
}

exports.build = build
