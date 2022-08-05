const controllers = require('../../DB/controllers/controllers.js');

const stylesHandler = (req, res) => {
  controllers.getRelated(req.params.product_id)
    .then((result) => res.send(result.rows[0]['array_agg']))
    .catch((err) => {
      console.log('Error in get related products route:\n', err);
      res.sendStatus(501);
    });
}

module.exports = stylesHandler;