const pool = require('../index.js');

const getStyles = (productID) => {
  queryString = `
    SELECT row_to_json(s1)
    FROM (
      SELECT product_id,
      (
        SELECT array_to_json(array_agg(row_to_json(s2)))
        FROM (
          SELECT styles.style_id, array_to_json(array_agg(
            json_build_object(
              'thumbnail_url', photos.thumbnail_url,
              'url', photos.url
              )
            )) photos
          FROM styles
          JOIN photos ON styles.style_id = photos.style_id
          WHERE styles.product_id = ${productID}
          GROUP BY styles.style_id
        ) s2
      ) results
      FROM styles
      WHERE product_id = ${productID}
      GROUP BY product_id
    ) as s1
  `;
  return (
    pool
      .query(queryString)
      .catch((err) => console.log('ERROR in getStyles() query string\n', err))
  )
}

module.exports = getStyles;