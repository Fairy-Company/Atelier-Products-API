const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'atelier',
  password: '',
  port: 5432
});

// pool
//   .query('select thumbnail_url from photos where photo_id IN (48, 49);')
//   .then((res) => console.log(res.rows))
//   .catch((err) => console.log(err));

module.exports = pool;