const fs = require('fs')
const path = require('path')
const toc = require('markdown-toc')
const myMarked = require('marked')
const { subscribeTpl } = require('../templates/subscribe-tpl')

const TOCPlaceholder = '<% TOC %>'
const SubscribePlaceholder = '<% SUBSCRIBE %>'

const postSrc = (name) => path.join(__dirname, `../posts/${name}.md`)
const postDest = (name) => (`./posts/${name}.html`)

const generatePostHTML = (name) => {
  const origMD = '' + fs.readFileSync(postSrc(name))
  const TOCContent = '## Table of Contents\n\n' + toc(origMD).content
  const MDWithTOC = origMD.replace(TOCPlaceholder, TOCContent)
  let output = myMarked(MDWithTOC)
  // output = output.replace(SubscribePlaceholder, subscribeTpl())
  fs.writeFileSync(postDest(name), output)
}

module.exports = {
  generatePostHTML
}
