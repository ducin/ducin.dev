#!/usr/bin/env node

const fs = require('fs')
const { loadPosts } = require('./load-posts')

const { absoluteUrl } = require('./urls')
const pages = loadPosts()
const posts = require('../data/posts.json')

const sitemapItem = (data) => `<url>\n${Object.entries(data)
  .map(([key, value]) => `  <${key}>${value}</${key}>`)
  .join('\n')}\n</url>`

const sitemapItems = (items) => items.map(sitemapItem).join('\n')

const genSitemap = (items) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${sitemapItems(items)}
</urlset>
`

const priority = (name) => {
  return name === 'Home' ? '1.00' : '0.80'
}

const pageItems = Object.entries(pages)
  .map(([url, name]) => ({
    loc: absoluteUrl(url),
    changefreq: 'weekly',
    priority: priority(name)
  }))

const postItems = posts.map(({ url }) => ({
  loc: url,
  changefreq: 'daily',
  priority: '0.80'
}))

fs.writeFileSync('./sitemap.xml', genSitemap([...pageItems, ...postItems]))
