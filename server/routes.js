const express = require('express');
const router = express.Router();
const controllers = require('../DB/controllers.js');

router.get('/products', (req, res) => {
  controllers.getProducts(req.query.page, req.query.count)
  .then((result) => res.send(result.rows))
  .catch((err) => {
    console.log('Error sending products,:\n', err);
    res.sendStatus(501);
  });
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
    .catch((err) => {
      console.log('Error sending product,:\n', err);
      res.sendStatus(501);
    });
});

router.get('/products/:product_id/styles', (req, res) => {
  controllers.getStyles(req.params.product_id)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).send('This product does not have associated styles')
      } else {
        res.send(result.rows)
      }
    })
    .catch((err) => {
      console.log('error in get styles route:\n', err);
      res.sendStatus(501);
    });
});

router.get('/products/:product_id/related', (req, res) => {
  controllers.getRelated(req.params.product_id)
    .then((result) => res.send(result.rows[0]['array_agg']))
    .catch((err) => {
      console.log('Error in get related products route:\n', err);
      res.sendStatus(501);
    });
});

module.exports = router;