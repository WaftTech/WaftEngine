const http = require('http');
const htmlmanupulator = {};
const internal = {};
const { head, body, normal, apiBaseUrl, siteUrl } = require('./constant');
const { requestThirdPartyApi } = require('./helper');

htmlmanupulator.sendForCompany = async (req, res, next) => {
  try {
    internal.createHtml(res, { imagepath: 'icon_512x512.0d07052f9928a577e5a3e76e9d64dbf1.png', description: 'Company listed in nepal offers ', title: 'Nepal Offer - Companies' });
  } catch (err) {
    next(err);
  }
};
htmlmanupulator.sendForCompanyDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (id === 'favicon.png') {
      return res.send(null);
    }
    const response = await requestThirdPartyApi(req, `${apiBaseUrl}/company/${id}`, '', next, 'GET');
    return internal.createHtml(res, { imagepath: response.data.Image.path, description: response.data.Name, title: response.data.Name });
  } catch (err) {
    next(err);
  }
};
htmlmanupulator.sendForOfferDetail = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    if (slug === 'favicon.png') {
      return res.send(null);
    }
    const response = await requestThirdPartyApi(req, `${apiBaseUrl}/offer/slug/${slug}`, '', next, 'GET');
    internal.createHtml(res, { imagepath: response.data.Image.path, description: response.data.Description, title: response.data.Offer_In });
  } catch (err) {
    next(err);
  }
};
htmlmanupulator.sendForAboutUS = async (req, res, next) => {
  try {
    internal.createHtml(res, { imagepath: 'icon_512x512.0d07052f9928a577e5a3e76e9d64dbf1.png', description: 'This website aims to list all offers and deals applicable in Nepal. This product is brought to you by WaftTech.', title: 'nepaloffers-about-us' });
  } catch (err) {
    next(err);
  }
};

internal.createHtml = (res, data) => {
  try {
    let { imagepath, description, title } = data;
    let html_replacer = `<title>${title}</title><meta property="og:image" content="${siteUrl}${imagepath}" data-react-helmet="true"><meta property="image" content="${siteUrl}${imagepath}" data-react-helmet="true"><meta property="og:image:secure_url" content="${siteUrl}${imagepath}" data-react-helmet="true"><meta property="og:description" content="${description}" data-react-helmet="true"/><meta property="description" content="${description}" data-react-helmet="true"/><meta property="og:title" content="${title}" data-react-helmet="true"></head>`;
    const htmlContent = `${head}${html_replacer},${body}`;
    return res.send(htmlContent);
  } catch (err) {
    next(err);
  }
};

module.exports = htmlmanupulator;
