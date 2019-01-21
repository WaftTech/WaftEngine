const path = require('path');
const express = require('express');
const compression = require('compression');
const fs = require('fs');
const fetch = require('node-fetch');

module.exports = function addProdMiddlewares(app, options) {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.use(publicPath, express.static(outputPath));

  app.get('/offer/:slug', async (req, res) => {
    if (req.params.slug !== 'favicon.png') {
      let html = await fs.readFileSync(path.resolve(outputPath, 'index.html'), 'utf-8');
      return fetch(`https://nepaloffers.com/api/offer/slug/${req.params.slug}`)
        .then(resp => resp.json())
        .then(json => {
          const { data } = json;
          html = html.replace('<meta name="description" content="Offer coupon code nepal deals kathmandu online shooping big brands offers mobile cloths goods telecomunnication "/>', `<meta name="description" content="${data.Description}"/>`);
          return res.send(html);
        })
        .catch(err => {
          return res.send(html);
        });
    }
  });
  app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
};
