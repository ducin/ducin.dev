#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const toc = require('markdown-toc')
const prettier = require("prettier")
const chalk = require('chalk')
const readingTime = require('reading-time')
const { subscribeTpl } = require('../templates/subscribe-tpl')

const { absoluteUrl } = require('./urls')
const { loadPosts } = require('./load-posts')
const { pageTpl } = require('../templates/page-tpl')
const { postContentTopTpl } = require('../templates/post-content-top-tpl')
const { blogFooterTpl } = require('../templates/blog-footer-tpl')
const { commentsTpl } = require('../templates/comments-tpl')

const { marked } = require('marked')
const { gfmHeadingId } = require("marked-gfm-heading-id")
marked.use(gfmHeadingId({}));
const { slug : githubSlug } = require('../lib/github-slugger')

marked.use(gfmHeadingId({}));
const renderer = {
  heading({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    let escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    while (escapedText.endsWith('-')) {
      escapedText = escapedText.slice(0, -1)
    }
    escapedText = githubSlug(escapedText);

    return `
      <h${depth} id="${escapedText}">
        <a href="#${escapedText}">
          <span class="header-link"></span>
          ${text}
        </a>
      </h${depth}>`;
  }
};
marked.use({ renderer });

const TOCPlaceholder = '<% TOC %>'
const SubscribePlaceholder = '<% SUBSCRIBE %>'

const postSourceMarkdownFilepath = (name) => path.join(__dirname, `../posts/${name}.md`)
const postTargetHTMLFilepath = (name) => (`./${name}.html`)

const imageURL = (filepath, { absolute = true } = {}) =>
  absolute ? absoluteUrl(`images/blog/${filepath}`) : `images/blog/${filepath}`

const generatePostHTML = async (post) => {
  console.log(chalk.green(`processing: ${post.sourceFile}...`))
  const { title, keywords, description, publishedDate, coverImage,
    sourceFile, coverImageFilename, githubURL } = post
  const origMD = '' + fs.readFileSync(postSourceMarkdownFilepath(sourceFile))
  const TOCContent = '## Table of Contents\n\n' + toc(origMD, { slugify: githubSlug }).content
  const MDWithTOC = origMD
    .replace(TOCPlaceholder, TOCContent)
    .replace(SubscribePlaceholder, subscribeTpl())
  let output = marked(MDWithTOC)
  const postReadingTime = readingTime(origMD)

  const coverImageFilepath = path.join(__dirname, '..', 'images/blog/min', coverImageFilename);
  console.log({coverImageFilename})
  if (!fs.existsSync(coverImageFilepath)) {
    const message = `File ${coverImageFilepath} does not exist`
    console.error(chalk.red(message))
    throw new Error(message)
  }

  postTop = postContentTopTpl({
    publishedFormattedDate: new Date(publishedDate).toLocaleDateString('en-gb', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    readingTime: postReadingTime.text,
    coverImage,
    githubURL
  })
  output = postTop + output

  output = pageTpl({
    head: {
      title: `${title} - Tomasz Ducin - blog`,
      author: 'Tomasz Ducin',
      keywords: keywords.join(', '),
      description: description,
      thumbnailURL: imageURL(coverImageFilename),
      backgroundImageURL: imageURL(coverImageFilename, { absolute: false }),
      canonicalURL: absoluteUrl(`${sourceFile}`),
      shortcutIconURL: absoluteUrl('images/min/td-logo-zolte-80.png'),
    },
    tags: {
      twitter: {
        'twitter:card': 'summary_large_image',
        'twitter:site': '@tomasz_ducin',
        'twitter:creator': '@tomasz_ducin',
        'twitter:description': description,
        'twitter:image': `${imageURL(coverImageFilename)}`,
      },
      og: {
        'og:type': 'article',
        'og:title': `${title} - Tomasz Ducin - blog`,
        'og:description': description,
        'og:image': `${imageURL(coverImageFilename)}`,
      },
    },
    files: {
      css: [],
      js: [
        "assets/js/page-blog.js",
        "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/typescript.min.js",
      ],
    },
    body: {
      topLink: 'Ducin.dev',
      topTitle: title,
      content: output,
      bottomContent: blogFooterTpl() + commentsTpl()
    }
  })

  output = await prettier.format(output, { parser: "html", printWidth: 400 });

  try {
    const targetFile = postTargetHTMLFilepath(sourceFile)
    fs.writeFileSync(targetFile, output)
    console.log(chalk.green(`...done: ${targetFile}`))
  } catch (e) {
    console.error(chalk.red(e))
    throw e
  }
}

for (const post of loadPosts()){
  generatePostHTML(post)
}
