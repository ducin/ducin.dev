#!/usr/bin/env node

const fs = require('fs')
const Feed = require('feed').Feed

const posts = require('../data/posts.json')
const { absoluteUrl } = require('./urls')

const feed = new Feed({
  title: "Tomasz Ducin",
  description: "Tomasz Ducin Blog - Independent Consultant, Architect & Trainer. JavaScript, TypeScript, Angular, React, Redux, RxJS, Architecture, Design Patterns.",
  id: "ducin.dev",
  link: absoluteUrl(),
  image: absoluteUrl("images/tomasz-ducin-logo-zolte-300.png"),
  favicon: absoluteUrl("images/td-logo-zolte-80.png"),
  copyright: "All rights reserved 2017-2024, Tomasz Ducin",
  generator: "feed3r", // optional, default = 'feed3r'
  feedLinks: {
    // json: absoluteUrl("feed.json"),
    atom: absoluteUrl("feed.xml")
  },
  author: {
    name: "Tomasz Ducin",
    email: "tomasz@ducin.dev",
    link: absoluteUrl()
  }
});

posts
.filter(({ status }) => status == "PUBLISHED")
.forEach(post => {
  feed.addItem({
    title: post.title,
    id: post.url,
    link: post.url,
    description: post.description,
    content: post.content,
    author: [
      {
        name: "Tomasz Ducin",
        email: "tomasz@ducin.dev",
        link: absoluteUrl()
      }
    ],
    date: new Date(post.publishedDate),
    image: post.image
  });
});

feed.addCategory("JavaScript");
feed.addCategory("TypeScript");
feed.addCategory("React");
feed.addCategory("Angular");
feed.addCategory("Architecture");

// Output: RSS 2.0
fs.writeFileSync('./feed.xml', feed.rss2())

// Output: Atom 1.0
// fs.writeFileSync('./feed.xml', feed.atom1())
