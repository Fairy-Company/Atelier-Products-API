const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
  res.send('products route')
})

router.get('/products/:product_id', (req, res) => {
  //console.log(req.params.product_id)
  res.send('products id route')
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
