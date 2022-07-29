const { Pool } = require('pg');
const pool = new Pool({
  user: 'ibraheemazam',
  host: 'localhost',
  database: 'atelier',
  password: '',
  port: 5432

});


pool.query('select thumbnail_url from photos where photo_id = 48;', (err, res) => {
  console.log(err, res.rows)
  pool.end()
});

const getProducts = () => {
  //
}