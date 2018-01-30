import { parseComponent } from 'vue-template-compiler'

export function isVueFile(filepath) {
  return filepath.match(/.*vue$/)
}

export function splitVue(text) {
  let scriptContent = ''
  const scriptBlock = parseComponent(text).script
  if (scriptBlock) {
    scriptContent = scriptBlock.content
  }

  return scriptContent
}