/* eslint no-console: 0 */
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');
const port = process.env.PORT || 3000;
const domain = (process.argv[2] === '-domain') ? process.argv[3] : 'localhost';
require('./server/app');

const app = express();

app.use('/public', express.static('public'));
app.use('/static', express.static('static'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, domain, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at ${domain}:${port}`);
});
