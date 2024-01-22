const items = require('../data/pages.json')

const menuTpl = () => `
<ul>${Object.entries(items).map(([href, label]) => `
  <li><a href="${href}">${label}</a></li>`).join('')}
</ul>
`

module.exports = {
  menuTpl
}
