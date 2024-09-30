#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import {slug as githubSlug} from 'github-slugger'
import entries from '../data/pocketbook.json' with { type: "json" };

const slugDict = {}
const slug = (name) => {
  if (!(name in slugDict)) {
    slugDict[name] = githubSlug(name)
  }
  return slugDict[name]
}

/**
 * @param {Entry} entry 
 */
const generateEntry = (entry) => {
  if (!('description' in entry)) {
    throw new Error(`Entry "${entry.name}" is missing a description`)
  }

  const related = [...(entry.tags ?? []), ...(entry.seeAlso ?? [])]

  if (related.length == 0) {
    throw new Error(`Entry "${entry.name}" has missing "see" related entries`)
  }

  return `### ${entry.name}

${entry.description}

See: ${related.map(name => `[${name}](#${slug(name)})`).join(', ')}. 👉 [back to ToC](#table-of-contents)

`
}

const generateMarkdown = (entries) => {
  const resultEntries = entries
    .filter(entry => entry.description)
    .filter(entry => entry.seeAlso || entry.tags)
    .sort((e1, e2) => {
      return e1.name.localeCompare(e2.name)
    })
    .map(generateEntry)

  console.log(chalk.green(`All entries: ${chalk.yellow(entries.length)}, included: ${chalk.yellow(resultEntries.length)}`))

  return resultEntries.join('')
}

const producePocketbookPostFile = () => {
  const staticContent = fs.readFileSync(path.join(__dirname, '../posts/software-architecture-terminology-pocketbook-intro.md'), 'utf8')
  const dynamicContent = generateMarkdown(entries)
  const resultContent = staticContent + '\n' + dynamicContent
  fs.writeFileSync(path.join(__dirname, '../posts/software-architecture-terminology-pocketbook.md'), resultContent)
}

producePocketbookPostFile()

// ### Read Model

// lorem ipsum dolor sit amet

// See: [CQRS](#cqrs), [Write Model](#write-model)

// ### Write Model

// lorem ipsum dolor sit amet

// See: [CQRS](#cqrs), [Read Model](#read-model)
