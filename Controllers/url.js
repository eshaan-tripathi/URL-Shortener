const shortid = require('shortid');
const Url = require('../Models/url'); // Ensure the path to Url model is correct

async function urlConverter(originalUrl) {
    try {
        const shortUrl = shortid.generate();
        const newUrl = new Url({ originalUrl, shortUrl });
        await newUrl.save();
        return newUrl;
    } catch (error) {
        console.error('Error creating short URL:', error);
        return null;
    }
}

module.exports = urlConverter;
