const urlConverter = require('../Controllers/url');

module.exports = async function urlgenerate(req, res) {
    const input = req.body.link;
   
    const resp = await urlConverter(input);

    if (resp) {
        res.render('result.ejs', { shortUrl: resp.shortUrl });
    } else {
        res.render('error.ejs', { message: 'Failed to generate short URL.' });
    }
}
