// full jsfiddle demo: http://jsfiddle.net/ug4trmy1/

const $map = document.getElementById('map-canvas');
const latlng = (lat, lng) => new google.maps.LatLng(lat, lng);

const presentations = require('../data/presentations.json');
const venues = require('../data/venues.json');

const venueAggregator = presentations.reduce((aggr, event) => {
  if (!aggr[event.venueId]){
    aggr[event.venueId] = {
      venue: venues[event.venueId],
      presentations: []
    };
  }
  let item = Object.assign({}, event);
  delete item.venueId;
  aggr[event.venueId].presentations.push(item);
  return aggr;
}, {});

const venuePresentations = [];
for (venueId in venueAggregator) {
  if (venueAggregator.hasOwnProperty(venueId)){
    venuePresentations.push(venueAggregator[venueId]);
  }
}

const videoTpl = item => item.video ? ` <a class="video" href="${item.video}" title="see video">📹</a>` : '';
const slideTpl = item => item.slides ? ` <a class="slides" href="${item.slides}" title="see slides">💻</a>` : '';
const eventTpl = item => item.link ? ` <a href="${item.link}">${item.event}</a>` : ` ${item.event}`;

const markerTpl = item => `<div class="marker">
<h3>${item.venue.name}</h3>
<h4>${item.venue.city}, ${item.venue.countryCode}</h4>
<div>
  <ul>${item.presentations.map(p =>
    `<li><i>${p.title}</i> at ${eventTpl(p)}, ${p.date} ${videoTpl(p)} ${slideTpl(p)}</li>`
  ).join('')}</ul>
</div>
</div>`;

const initMap = () => {
  const map = new google.maps.Map($map, {
    zoom: 4,
    center: latlng(52, 10),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  let theOnlyWindow = null;

  function addMarker(item, timeout) {
    setTimeout(() => {
      const marker = new google.maps.Marker({
        position: latlng(item.venue.latitude, item.venue.longitude),
        map: map,
        title: item.title,
        animation: google.maps.Animation.DROP
      });

      if (item.venue.latitude && item.venue.longitude) {
        const infoWindow = new google.maps.InfoWindow({
          content: markerTpl(item)
        });

        marker.addListener('mouseover', function() {
          if (theOnlyWindow) {
            theOnlyWindow.close();
          }
          infoWindow.open(map, marker);
          theOnlyWindow = infoWindow;
        });
      }
    }, timeout);
  };

  venuePresentations.forEach((v, idx) => addMarker(v, 500 + idx*150));
}

initMap();
