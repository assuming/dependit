'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDependency;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _babylon = require('babylon');

var _utils = require('./utils.js');

var _constants = require('./constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDependency(filepath) {
  let sourceCode = _fs2.default.readFileSync(filepath, 'utf8');

  if ((0, _utils.isVueFile)(sourceCode)) {
    sourceCode = (0, _utils.splitVue)(sourceCode);
  }

  let ast = {};
  try {
    ast = (0, _babylon.parse)(sourceCode, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'objectRestSpread']
    });
  } catch (err) {
    throw new Error('AST parse error. Only .js || .ts || .jsx || .vue types are supported');
  }

  const dependencies = ast.program.body.filter(item => item.type === _constants.IMPORT_DECLARATION).map(item => {
    const imported = item.specifiers.map(unit => {
      let type = '';

      switch (unit.type) {
        case _constants.IMPORT_NAMESPACE_SPECIFIER:
          type = _constants.ImportType.namespace;
          break;
        case _constants.IMPORT_DEFAULT_SPECIFIER:
          type = _constants.ImportType.default;
          break;
        case _constants.IMPORT_SPECIFIER:
          type = _constants.ImportType.import;
          break;
        default:
          break;
      }

      return {
        local: unit.local.name,
        type
      };
    });

    return {
      source: item.source.value,
      imported
    };
  });

  const result = {
    path: filepath,
    dependencies
  };

  return result;
}