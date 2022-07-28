const csv = require('csv-parse');
const fs = require('fs');

const results = [];

fs.createReadStream('../data/photos.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log('done');
  })

console.log('hello');