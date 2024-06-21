const express = require('express');
const app = express();
const connect = require('./connect');
const bodyParser = require('body-parser');
const urlgenerate = require('./Routes/urlgenerate');
const shortUrl = require('./Routes/shortUrl');

require('dotenv').config();
connect(process.env.MONGODB_URI);

app.set('view engine', 'ejs');
app.set('views', './Views');
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Route handlers
app.post('/urlgenerate', urlgenerate);
app.get('/:shortUrl', shortUrl);

module.exports = app;  // Export the app for Vercel serverless functions
