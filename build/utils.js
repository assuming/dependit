'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isVueFile = isVueFile;
exports.splitVue = splitVue;

var _vueTemplateCompiler = require('vue-template-compiler');

function isVueFile(filepath) {
  return filepath.match(/.*vue$/);
}

function splitVue(text) {
  let scriptContent = '';
  const scriptBlock = (0, _vueTemplateCompiler.parseComponent)(text).script;
  if (scriptBlock) {
    scriptContent = scriptBlock.content;
  }

  return scriptContent;
}