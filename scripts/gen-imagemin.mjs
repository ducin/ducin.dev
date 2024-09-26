#!/usr/bin/env node

// const imagemin = require('imagemin');
// const imageminAvif = require('imagemin-avif');
import imagemin from 'imagemin';
import imageminAvif from 'imagemin-avif';

console.log('Put the original image (*-orig.png) and the re-scaled (*.png) in the images/[blog/] directory')
console.log('This script will generate the AVIF images in the images/[blog/]min directory')

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

