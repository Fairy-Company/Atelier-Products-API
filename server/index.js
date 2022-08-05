require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.SERVER_PORT;
const router = require('./routes.js');


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