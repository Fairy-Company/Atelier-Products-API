const pool = require('../index.js');

const getRelated = (productID) => {
  const queryString = `
    SELECT ARRAY_AGG(related_id)
    FROM related
    WHERE product_id = ${productID}
    GROUP BY product_id;
  `;
  return (
    pool
    .query(queryString)
    .catch((err) => console.log('ERROR in getRelated() query string\n', err))
  )
}

module.exports = getRelated;