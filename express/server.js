'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const engine = require('ejs-mate'),





const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.write('<h1>Hello from Express.js!</h1>');
  res.render('ejs/ArtiMotor/angryShark.ejs');

  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));


app.set('views', 'views');
app.engine('ejs', engine);
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));
app.use( bodyParser.json({ limit: 1000000000 }) );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
limit: 1000000000,
  extended: true
}));

module.exports = app;
module.exports.handler = serverless(app);
