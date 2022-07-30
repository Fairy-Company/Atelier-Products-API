const { Pool } = require('pg');
const pool = new Pool({
  user: 'ibraheemazam',
  host: 'localhost',
  database: 'atelier',
  password: '',
  port: 5432

});

// pool
//   .query('select thumbnail_url from photos where photo_id IN (48, 49);')
//   .then((res) => console.log(res.rows))
//   .catch((err) => console.log(err));

const getProducts = (page=1, count=5) => {
  const queryString = `
    SELECT product_id AS id, campus, name, slogan, description,
    category, default_price::numeric, created_at, updated_at
    FROM products
    WHERE product_id > ${count * (page - 1)}
    ORDER BY product_id
    LIMIT ${count};
  `;
  return (
    pool
    .query(queryString)
    .catch((err) => console.log('ERROR in getProducts() query string\n', err))
  )
}

const getProduct = (productID) => {
  const queryString = `
    SELECT product_id AS id, campus, name, slogan, description,
    category, default_price::numeric, created_at, updated_at
    FROM products
    WHERE product_id = ${productID};
  `;
  return (
    pool
    .query(queryString)
    .catch((err) => console.log('ERROR in getProduct() query string\n', err))
  )
}

module.exports.getProducts = getProducts;
module.exports.getProduct = getProduct;