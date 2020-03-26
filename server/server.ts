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
app.use(/^((?!(api)).)*/, (req: any, res: any) => {
  res.sendFile(path.join(__dirname, distDir + '/index.html'));
});
// For api request, serve the server
app.use('/api/', router);

// To allow each test file to start a server on their own we make him listen
// elsewhere (in this case the index.ts file)
