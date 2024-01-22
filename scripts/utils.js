const fs = require('fs')
const path = require('path')

const listFiles = (...subDirs) =>
  fs.readdirSync(path.join(__dirname, '..', ...subDirs))

module.exports = {
  listFiles
}
