const router = require('./routes.js');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const app = express();

const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/www'));
app.use('/search', router);


const server = app.listen(process.env.PORT || 8080, '127.0.0.1', function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Google Map Practice app listening at http://${host}:${port}`);
})

