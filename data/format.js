const venues = require('./venues.json')
const presentations = require('./presentations.json')

const countryName = (countryCode) => {
  switch (countryCode) {
    case "SE": return "Sweden"
    case "UK": return "United Kingdom"
    case "DE": return "Germany"
    case "DK": return "Denmark"
    case "PL": return "Poland"
    case "CZ": return "Czech Republic"
  }
}

const reformat = (event) => ({
  title: event.title,
  description: null,
  eventName: event.event,
  date: event.date.replace(/\./g, '-'),
  ...event.video && { videoUrl: event.video },
  ...event.slides && { slidesUrl: event.slides },
  location: {
    continent: 'Europe',
    country: countryName(venues[event.venueId].countryCode),
    city: venues[event.venueId].city,
  },
})

const result = JSON.stringify(presentations.map(reformat), null, 2)
console.log(result)
