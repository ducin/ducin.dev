#!/usr/bin/env node

// const imagemin = require('imagemin');
// const imageminAvif = require('imagemin-avif');
import imagemin from 'imagemin';
import imageminAvif from 'imagemin-avif';

const paths = {
  'images/*.{jpg,png}': 'images/min',
  'images/blog/*.{jpg,png}': 'images/blog/min',
}
for (const [source, destination] of Object.entries(paths)){
  (async () => {
    console.log({ source, destination })
    await imagemin([source], {
      destination: destination,
      plugins: [
        imageminAvif({quality: 50})
      ],
    });
  })();
}

