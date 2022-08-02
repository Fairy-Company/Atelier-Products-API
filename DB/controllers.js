const { Pool } = require('pg');
const pool = new Pool({
  user: 'ibraheemazam',
  host: 'localhost',
  database: 'atelier',
  password: '',
  port: 5432

});

// pool
//   .query('select thumbnail_url from photos where photo_id IN (48, 49);')
//   .then((res) => console.log(res.rows))
//   .catch((err) => console.log(err));

const getProducts = (page=1, count=5) => {
  const queryString = `
    SELECT product_id AS id, campus, name, slogan, description,
    category, default_price::numeric, created_at, updated_at
    FROM products
    WHERE product_id > ${count * (page - 1)}
    ORDER BY product_id
    LIMIT ${count};
  `;
  return (
    pool
    .query(queryString)
    .catch((err) => console.log('ERROR in getProducts() query string\n', err))
  )
}

const getProduct = (productID) => {
  const queryString = `
    SELECT p.product_id AS id, p.campus, p.name, p.slogan, p.description,
    p.category, p.default_price::numeric, p.created_at, p.updated_at,
    ARRAY_AGG (
      json_build_object('feature', f.feature, 'value', f.value)
    ) features
    FROM products p
    JOIN features f
    ON p.product_id = f.product_id
    WHERE p.product_id = ${productID}
    GROUP BY p.product_id;
  `;
  return (
    pool
    .query(queryString)
    .catch((err) => console.log('ERROR in getProduct() query string\n', err))
  )
}

const getRelated = (productID) => {
  const queryString = `
    SELECT ARRAY_AGG(related_id)
    FROM related
    WHERE product_id = ${productID}
    GROUP BY product_id;
  `;
  return (
    pool
    .query(queryString)
    .catch((err) => console.log('ERROR in getRelated() query string\n', err))
  )
}

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

// pool
//   .query(`
//     SELECT array_agg(
//       json_build_object(
//         'thumbnail_url', thumbnail_url,
//         'url', url
//       )
//     )
//     FROM photos
//     GROUP BY style_id
//     limit 1;
//   `)
//   .then((res) => console.log(res.rows))
//   .catch((err) => console.log(err));

module.exports.getProducts = getProducts;
module.exports.getProduct = getProduct;
module.exports.getRelated = getRelated;
module.exports.getStyles = getStyles;



// skus
  // SELECT
  // json_build_object( 'skus', json_object_agg(sku_id, json_build_object(
  //     'quantity', quantity,
  //     'size', size
  // )))
  // FROM skus
  // WHERE style_id = 2
  // GROUP BY style_id;


  // working without skus
  // SELECT row_to_json(s1)
  // FROM (
  //   SELECT product_id,
  //   (
  //     SELECT array_to_json(array_agg(row_to_json(s2)))
  //     FROM (
  //       SELECT styles.style_id, array_to_json(array_agg(
  //         json_build_object(
  //           'thumbnail_url', photos.thumbnail_url,
  //           'url', photos.url
  //           )
  //         )) photos
  //       FROM styles
  //       JOIN photos ON styles.style_id = photos.style_id
  //       WHERE styles.product_id = ${productID}
  //       GROUP BY styles.style_id
  //     ) s2
  //   ) results
  //   FROM styles
  //   WHERE product_id = ${productID}
  //   GROUP BY product_id
  // ) as s1