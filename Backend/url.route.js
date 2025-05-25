const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const urlMap = require('./url.model');


function urlToShortWord(url, length = 12) {
  // Clean the URL (optional)
  url = url.replace(/^https?:\/\//, '').replace(/^www\./, '');

  // Create SHA-256 hash
  const hash = crypto.createHash('sha256').update(url).digest();

  // Encode to base64 and make it URL-safe
  const base64 = hash.toString('base64')
    .replace(/\+/g, '-')  // '+' → '-'
    .replace(/\//g, '_')  // '/' → '_'
    .replace(/=+$/, '');  // Remove trailing '=' padding

  // Return fixed length substring
  return base64.substring(0, length);
}

router.post('/', async (req,res) => {
  const long_url = req.body.long_url;

  let keyDoc = await urlMap.findOne({long_url: long_url});
  if(!keyDoc){
      const shortKey = urlToShortWord(long_url,6);
      const urlShortened = new urlMap({
          long_url: long_url,
          key: shortKey
      });
      keyDoc = await urlShortened.save();
  }

  res.json({
      'key': keyDoc.key,
      'long_url': keyDoc.long_url,
      'short_url': `http://localhost:5000/url/${keyDoc.key}`
  });
});

router.get('/:key', async (req, res) => {
    const keySent = req.params.key;
    const urlEntry = await urlMap.findOne({ key: keySent });

    if (!urlEntry) {
        return res.status(404).json({ message: 'No such URL available' });
    }

    // Redirect to the original URL instead of sending JSON
    res.redirect(urlEntry.long_url);
});


module.exports = router;


