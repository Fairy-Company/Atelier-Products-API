const express = require('express');
const router = express.Router();
const controllers = require('../DB/controllers.js');

router.get('/products', (req, res) => {
  controllers.getProducts(req.query.page, req.query.count)
  .then((result) => res.send(result.rows))
  .catch((err) => console.log('Error sending products,:\n', err));
})

router.get('/products/:product_id', (req, res) => {
  controllers.getProduct(req.params.product_id)
    .then((result) => {
      if (result.rows.length < 1) {
        res.status(404).send('This product does not exist.')
      } else {
        res.send(result.rows)
      }
    })
    .catch((err) => console.log('Error sending product,:\n', err));
})

router.get('/products/:product_id/styles', (req, res) => {
  //console.log(req.params.product_id)
  res.send('styles route')
})

router.get('/products/:product_id/related', (req, res) => {
  //console.log(req.params.product_id)
  res.send('related route')
})

module.exports = router;