//controllers
const getProductStrict = (productID) => {
  const queryString = `
    SELECT product_id AS id, campus, name, slogan, description,
    category, default_price::numeric, created_at, updated_at
    FROM products
    WHERE product_id = 3;
  `;
  return (
    pool
    .query(queryString)
    .catch((err) => console.log('ERROR in getProduct() query string\n', err))
  )
}

const getFeats = (productID) => {
  const queryString = `
    SELECT *
    FROM features
    WHERE product_id = 3;
  `;
  return (
    pool
    .query(queryString)
    .catch((err) => console.log('ERROR in getProduct() query string\n', err))
  )
}

module.exports.getProductStrict = getProductStrict;
module.exports.getFeats = getFeats;

//routes
router.get('/products/:product_id', (req, res) => {
  prodID = req.params.product_id;
  controllers.getProductStrict(prodID)
    .then((prodResult) => {
      if (prodResult.rows.length < 1) {
        res.status(404).send('This product does not exist.')
      } else {
        return prodResult.rows
      }
    })
    .then((prodResult) => {
      controllers.getFeats()
        .then((featResult) => {
          prodResult[0].feats = featResult.rows;
          res.send(prodResult)
        })
    })
    .catch((err) => console.log('Error sending product,:\n', err));
})