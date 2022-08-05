const express = require('express');
const router = express.Router();
const controllers = require('../DB/controllers/controllers.js');
const handlers = require('./routehandlers/handlers.js')

router.get('/products', handlers.products)

router.get('/products/:product_id', handlers.product);

router.get('/products/:product_id/styles', handlers.related);

router.get('/products/:product_id/related', handlers.styles);

module.exports = router;