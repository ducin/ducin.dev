const regex = require('./regex')

function slug (value, maintainCase) {
  if (typeof value !== 'string') return ''
  if (!maintainCase) value = value.toLowerCase()
  return value.replace(regex, '').replace(/ /g, '-')
}

module.exports = { slug }