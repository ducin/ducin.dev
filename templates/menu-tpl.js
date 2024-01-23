const pages = require('../data/pages.json')

const menuTpl = () => `
<ul>${pages.map(({ name, url }) => `
  <li><a href="${url}">${name}</a></li>`).join('')}
</ul>
`

module.exports = {
  menuTpl
}
