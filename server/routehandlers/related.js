const controllers = require('../../DB/controllers/controllers.js');

const relatedHandler = (req, res) => {
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
}

module.exports = relatedHandler;