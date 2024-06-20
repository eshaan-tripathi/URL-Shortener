const express = require('express');
const app = express();
const connect = require('./connect');
const urlConverter = require('./Controllers/url');
const ejs = require('ejs');
const Url = require('./Models/url'); // Ensure the path to Url model is correct
const bodyParser = require('body-parser');

connect('mongodb://localhost:27017'); // Ensure MongoDB is running and accessible

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


app.listen(3000, () => {
    console.log('Server Started at port 3000');
});
