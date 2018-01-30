import fs from 'fs'
import path from 'path'
import { parse } from 'babylon'
import { isVueFile, splitVue } from './utils.js'
import { 
  IMPORT_SPECIFIER,
  IMPORT_DEFAULT_SPECIFIER,
  IMPORT_NAMESPACE_SPECIFIER,
  IMPORT_DECLARATION,
  ImportType
} from './constants.js'


export default function getDependency(filepath) {
  let sourceCode = fs.readFileSync(filepath, 'utf8')

  if (isVueFile(sourceCode)) {
    sourceCode = splitVue(sourceCode)
  }

  const ast = parse(sourceCode, {
    sourceType: 'module',
    plugins: [
      'jsx',
      'typescript',
      'classProperties',
      'objectRestSpread',
      'decorators2',
      'exportDefaultFrom',
      'exportNamespaceFrom',
      'asyncGenerators',
      'dynamicImport',
      'optionalChaining'
    ]
  })

  const dependencies = ast.program.body
    .filter(item => item.type === IMPORT_DECLARATION)
    .map(item => {
      const imported = item.specifiers.map(unit => {
        let type = ''

        switch (unit.type) {
          case IMPORT_NAMESPACE_SPECIFIER:
            type = ImportType.namespace
            break
          case IMPORT_DEFAULT_SPECIFIER:
            type = ImportType.default
            break
          case IMPORT_SPECIFIER:
            type = ImportType.import
            break
          default:
            break
        }

        return {
          local: unit.local.name,
          type,
        }
      })

      return {
        source: item.source.value,
        imported,
      }
    })

  const result = {
    path: filepath,
    dependencies,
  }

  return result
}