const { listFiles } = require('../scripts/utils')
const { pageTpl } = require('./page-tpl')

listFiles('posts')
  .filter(f => f.match(/.*\.(md)/ig))
  .map(f => f.substr(0, f.length - 3))

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
