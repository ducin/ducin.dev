const fs = require('fs')
const path = require('path')
const { pageTpl } = require('../templates/page-tpl')

fs.writeFileSync('./videos.htm', pageTpl({
  head: {
    title: 'Tomasz Ducin - videos',
    author: 'Tomasz Ducin',
    keywords: 'Tomasz Ducin, Software Consultant, Interface Architect, Trainer, JavaScript, Trainings, Commercial Trainings, Presentations, Community, Professional',
    description: 'Independent Software Consultant / Interface Architect / Trainer working in Warsaw, Poland. IT Community Activist',
    thumbnail: '/images/banner-s.jpg',
  },
  body: {
    topLink: 'ducin.dev',
    topTitle: 'Conference Videos',
    content: fs.readFileSync(path.join(__dirname, 'videos-content.html')) + '',
  }
}))
