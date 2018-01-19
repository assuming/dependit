const fs = require('fs')
const path = require('path')
const getDependency = require('../build/index.js').default

// const filepath = path.resolve(__dirname, './testfiles/a.ts')
// const filepath = path.resolve(__dirname, './testfiles/b.js')
// const filepath = path.resolve(__dirname, './testfiles/c.vue')
const filepath = path.resolve(__dirname, './testfiles/d.jsx')

const result = getDependency(filepath)

fs.writeFileSync(
  path.resolve(__dirname, './test.json'),
  JSON.stringify(result, null, 2)
)
