const pool = require('../index.js');

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

module.exports = getProducts;