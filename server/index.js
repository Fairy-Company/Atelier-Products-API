require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT;
const router = require('./routes.js');

// app.use(morgan('method: :method url: :url status: :status'));

app.use(express.json());

app.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.sendStatus(401);
  }
  next();
})

app.use(router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});