const Url = require('../Models/url');

module.exports = async function shortUrl(req, res) {
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
}
