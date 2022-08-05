const express = require('express');
const router = express.Router();
const controllers = require('../DB/controllers/controllers.js');
const handlers = require('./routehandlers/handlers.js')

router.get('/loaderio-16c0dcbe1fe23c8766d06c7ca6c010e2', (req, res) => {
	res.sendFile("/home/ubuntu/atelierAPI/loaderIOToken/loaderio-16c0dcbe1fe23c8766d06c7ca6c010e2.txt", null, (err) => {
		if (err) {
			next(err);
		} else {
			console.log("File sent:");
		}
	});
});

router.get('/products', handlers.products)

router.get('/products/:product_id', handlers.product);

router.get('/products/:product_id/styles', handlers.related);

router.get('/products/:product_id/related', handlers.styles);

module.exports = router;
