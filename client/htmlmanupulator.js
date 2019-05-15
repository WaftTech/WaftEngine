const http = require('http');
const htmlmanupulator = {};
const internal = {};
const { head, body, normal, apiBaseUrl, siteUrl } = require('./constant');
const { requestThirdPartyApi } = require('./helper');

htmlmanupulator.sendForHome = async (req, res, next) => {
  try {
    const response = await requestThirdPartyApi(
      req,
      `${apiBaseUrl}/meta/route/HomePage`,
      '',
      next,
      'GET',
    );
    if (response.data) {
      internal.createHtml(
        res,
        {
          imagepath: response.data.meta_image.path,
          description: response.data.meta_description,
          title: response.data.title,
          url: ``,
        },
        next,
      );
    } else {
      internal.createHtml(
        res,
        {
          imagepath: '/favicon.ico',
          description: 'open source MERN engine ',
          title: 'Waft Engine',
          url: ``,
        },
        next,
      );
    }
  } catch (err) {
    next(err);
  }
};

htmlmanupulator.sendWithRoute = async (req, res, next) => {
  try {
    const route = req.params[0];
    const response = await requestThirdPartyApi(
      req,
      `${apiBaseUrl}/meta/route/${route}`,
      '',
      next,
      'GET',
    );

    if (response.data) {
      internal.createHtml(
        res,
        {
          imagepath: response.data.meta_image.path,
          description: response.data.meta_description,
          title: response.data.title,
          url: `${route}`,
        },
        next,
      );
    } else {
      internal.createHtml(
        res,
        {
          imagepath: '/favicon.ico',
          description: 'open source MERN engine ',
          title: 'Waft Engine',
          url: `${route}`,
        },
        next,
      );
    }
  } catch (err) {
    next(err);
  }
};

internal.createHtml = (res, data, next) => {
  try {
    const { imagepath, description, title, url } = data;
    const html_replacer = `<title>${title}</title><meta property="og:image" content="${siteUrl}${imagepath}" data-react-helmet="true"/><meta property="image" content="${siteUrl}${imagepath}" data-react-helmet="true"/><meta property="og:image:secure_url" content="${siteUrl}${imagepath}" data-react-helmet="true"/><meta property="og:description" content="${description}" data-react-helmet="true"/><meta property="description" content="${description}" data-react-helmet="true"/><meta property="og:description" content="${description}" data-react-helmet="true"/><meta property="og:title" content="${title}" data-react-helmet="true"/><meta property="og:url" content="${siteUrl}${url}" data-react-helmet="true"/><meta property="og:type" content="website" data-react-helmet="true"/><meta property="fb:app_id" content="261077198152655" data-react-helmet="true"/></head>`;
    const htmlContent = `${head}${html_replacer}${body}`;
    return res.send(htmlContent);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = htmlmanupulator;
