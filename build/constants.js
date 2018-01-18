'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const IMPORT_DECLARATION = exports.IMPORT_DECLARATION = 'ImportDeclaration';
const IMPORT_SPECIFIER = exports.IMPORT_SPECIFIER = 'ImportSpecifier';
const IMPORT_DEFAULT_SPECIFIER = exports.IMPORT_DEFAULT_SPECIFIER = 'ImportDefaultSpecifier';
const IMPORT_NAMESPACE_SPECIFIER = exports.IMPORT_NAMESPACE_SPECIFIER = 'ImportNamespaceSpecifier';

const ImportType = exports.ImportType = {
  default: 'ImportDefault',
  import: 'Import',
  namespace: 'ImportNamespace'
};