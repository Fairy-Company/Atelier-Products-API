const pool = require('../index.js');

const getProduct = (productID) => {
  const queryString = `
    SELECT p.product_id AS id, p.campus, p.name, p.slogan, p.description,
    p.category, p.default_price::numeric, p.created_at, p.updated_at,
    ARRAY_AGG (
      json_build_object('feature', f.feature, 'value', f.value)
    ) features
    FROM products p
    JOIN features f
    ON p.product_id = f.product_id
    WHERE p.product_id = ${productID}
    GROUP BY p.product_id;
  `;
  return (
    pool
    .query(queryString)
    .catch((err) => console.log('ERROR in getProduct() query string\n', err))
  )
}

module.exports = getProduct;