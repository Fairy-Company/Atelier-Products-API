const controllers = require('../../DB/controllers/controllers.js');

const productsHandler = (req, res) => {
  controllers.getProducts(req.query.page, req.query.count)
  .then((result) => res.send(result.rows))
  .catch((err) => {
    console.log('Error sending products,:\n', err);
    res.sendStatus(501);
  });
}

module.exports = productsHandler;