'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isVueFile = isVueFile;
exports.splitVue = splitVue;

var _vueTemplateCompiler = require('vue-template-compiler');

function isVueFile(text) {
  const templateRegex = /<\s*template\s*>([^]*)<\/\s*template\s*>/;
  return templateRegex.test(text);
}

function splitVue(text) {
  let scriptContent = '';
  const scriptBlock = (0, _vueTemplateCompiler.parseComponent)(text).script;
  if (scriptBlock) {
    scriptContent = scriptBlock.content;
  }

  return scriptContent;
}