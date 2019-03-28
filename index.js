const fs = require('fs')
const babelConfig = JSON.parse(fs.readFileSync('./.babelrc'))
require('babel-register')(babelConfig)

require('./src/tools.js')