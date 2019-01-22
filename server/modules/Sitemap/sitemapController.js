const HttpStatus = require('http-status');
const companySch = require('../company/company');
const offerSch = require('../offer/offer');
const xml = require('xml');

const staticController = {};

staticController.GetSiteMap = async (req, res, next) => {
  const companyids = await companySch.find({ IsActive: true }).select({ _id: 1, Added_at: 1 });
  const offerids = await offerSch.find({ IsActive: true }).select({ SlugURL: 1, Added_at: 1 });
  let response = {
    sitemapindex: [
      { _attr: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9', 'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance', 'xsi:schemaLocation': 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd' } },
      { url: [{ loc: 'https://nepaloffers.com' }] },
      { url: [{ loc: 'https://nepaloffers.com/company' }] },
      { url: [{ loc: 'https://nepaloffers.com/about-us' }] },
      { url: [{ loc: 'https://nepaloffers.com/contact-us' }] },
    ],
  };
  companyids.forEach(companyid => {
    response.sitemapindex.push({ url: [{ loc: `https://nepaloffers.com/company/${companyid._id}` }, { lastmod: companyid.Added_at.toString() }] });
  });
  offerids.forEach(offerid => {
    response.sitemapindex.push({ url: [{ loc: `https://nepaloffers.com/offer/${offerid.SlugURL}` }, { lastmod: offerid.Added_at.toString() }] });
  });
  res
    .type('application/xml')
    .status(HttpStatus.OK)
    .set('Content-Type', 'text/xml')
    .send(`<?xml version="1.0" encoding="UTF-8"?> ${xml(response)}`);
};

module.exports = staticController;
