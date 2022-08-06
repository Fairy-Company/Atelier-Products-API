const controllers = require('../../DB/controllers/controllers.js');

const productHandler = (req, res) => {
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
};

module.exports = productHandler;

