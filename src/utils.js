import { parseComponent } from 'vue-template-compiler'

export function isVueFile(text) {
  const templateRegex = /<\s*template\s*>([^]*)<\/\s*template\s*>/
  return templateRegex.test(text)
}

export function splitVue(text) {
  let scriptContent = ''
  const scriptBlock = parseComponent(text).script
  if (scriptBlock) {
    scriptContent = scriptBlock.content
  }

  return scriptContent
}