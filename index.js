const express = require('express');
const app = express();
const connect = require('./connect');
const urlConverter = require('./Controllers/url');
const ejs = require('ejs');
const Url = require('./Models/url'); // Ensure the path to Url model is correct
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file

connect(process.env.MONGODB_URI); // Use MongoDB URI from environment variables

app.set('view engine', 'ejs');
app.set('views', './Views');
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/urlgenerate', async (req, res) => {
    const input = req.body.link;
   
    const resp = await urlConverter(input);

    if (resp) {
        res.render('result', { shortUrl: resp.shortUrl });
    } else {
        res.render('error', { message: 'Failed to generate short URL.' });
    }
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = req.params.shortUrl;
    try {
        const urlDoc = await Url.findOne({ shortUrl });

        if (urlDoc) {
            res.redirect(urlDoc.originalUrl);
        } else {
            res.status(404).render('error', { message: 'URL not found' });
        }
    } catch (error) {
        console.error('Error finding short URL:', error);
        res.status(500).send('Internal server error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}`);
});
