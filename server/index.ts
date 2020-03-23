// const compression = require('compression');
const path = require('path');
const express = require('express');
// import * as express from 'express';
// import express = require('express');

import { router } from './routes';

export const app = express();

// Allow any method from any host and log requests
app.use((req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }
});

// Handle POST requests that come in formatted as JSON
app.use(express.json());

// Gzip compression middleware
// app.use(compression);

// Choose what fronten framework to serve the dist from
const distDir = '../dist/';
// For any request not on api, serve the frontend
app.use(express.static(path.join(__dirname, distDir)));
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, distDir + '/index.html'));
});
// For api request, serve the server
app.use('/api/', router);

// start our server on port 4201
app.listen(8080, '127.0.0.1', function() {
  console.log('Server now listening on 8080');
});
