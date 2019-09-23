const htmlToText = require('html-to-text');
const htmlmanupulator = {};
const internal = {};
const siteUrl = process.env.LIVE_URL;
const defaultImg = process.env.DEFAULT_IMG;
const apiBaseUrl = process.env.SERVER_BASE;
const { head, body } = require('./constant');
const { requestThirdPartyApi } = require('./helper');
htmlmanupulator.StaticPages = async (req, res, next) => {
  try {
    internal.createHtml(
      res,
      {
        imagepath: defaultImg,
        description: `WaftTech Blog, Blog by WaftTech Developer, React, Node, MongoDB, Redux, Development, Tools, WaftEngine, MERN Stack, Eccomerce`,
        title: 'Blogs - WaftTech (MERN Stack Engine)',
        url: 'blog-list',
      },
      next,
    );
  } catch (err) {
    next(err);
  }
};
htmlmanupulator.DynamicPages = async (req, res, next) => {
  try {
    internal.createHtml(
      res,
      {
        imagepath: defaultImg,
        description: `WaftTech Blog, Blog by WaftTech Developer, React, Node, MongoDB, Redux, Development, Tools, WaftEngine, MERN Stack, Eccomerce`,
        title: 'Blogs - WaftTech (MERN Stack Engine)',
        url: 'blog-list',
      },
      next,
    );
  } catch (err) {
    next(err);
  }
};
htmlmanupulator.FaqPage = async (req, res, next) => {
  try {
    internal.createHtml(
      res,
      {
        imagepath: defaultImg,
        description: `WaftTech Blog, Blog by WaftTech Developer, React, Node, MongoDB, Redux, Development, Tools, WaftEngine, MERN Stack, Eccomerce`,
        title: 'Blogs - WaftTech (MERN Stack Engine)',
        url: 'blog-list',
      },
      next,
    );
  } catch (err) {
    next(err);
  }
};

htmlmanupulator.BlogBySlugUrl = async (req, res, next) => {
  try {
    const id = req.params.slug_url;
    if (id === 'favicon.png') {
      return res.send(null);
    }
    const response = await requestThirdPartyApi(req, `${apiBaseUrl}/blog/blog/${id}`, '', next, 'GET');
    return internal.createHtml(
      res,
      {
        imagepath: response.data.image.path,
        description: response.data.short_description,
        title: response.data.title,
        url: `blog/${id}`,
      },
      next,
    );
  } catch (err) {
    return next(err);
  }
};
htmlmanupulator.BlogsByCategoryPages = async (req, res, next) => {
  try {
    internal.createHtml(
      res,
      {
        imagepath: defaultImg,
        description: `WaftTech, Blog Categories`,
        title: 'Blog Category - WaftTech (MERN Stack Engine)',
        url: 'blog-category',
      },
      next,
    );
  } catch (err) {
    next(err);
  }
};

htmlmanupulator.BlogsByTagPages = async (req, res, next) => {
  try {
    const { id } = req.params;
    internal.createHtml(
      res,
      {
        imagepath: defaultImg,
        description: `Blog By Category`,
        title: 'Blog Category - WaftTech (MERN Stack Engine)',
        url: `blog-category/${id}`,
      },
      next,
    );
  } catch (err) {
    next(err);
  }
};
htmlmanupulator.BlogsByAuthorPages = async (req, res, next) => {
  try {
    const { id } = req.params;
    internal.createHtml(
      res,
      {
        imagepath: defaultImg,
        description: `Blog By Category`,
        title: 'Blog Category - WaftTech (MERN Stack Engine)',
        url: `blog-category/${id}`,
      },
      next,
    );
  } catch (err) {
    next(err);
  }
};
htmlmanupulator.BlogByDatePages = async (req, res, next) => {
  try {
    const { id } = req.params;
    internal.createHtml(
      res,
      {
        imagepath: defaultImg,
        description: `Blog By Category`,
        title: 'Blog Category - WaftTech (MERN Stack Engine)',
        url: `blog-category/${id}`,
      },
      next,
    );
  } catch (err) {
    next(err);
  }
};

internal.createHtml = (res, data, next) => {
  try {
    const { imagepath, description, title, url } = data;
    const text = htmlToText.fromString(description, {
      wordwrap: 130,
    });
    const html_replacer = `<title>${title}</title><meta property="description" content="${text}" data-react-helmet="true"/><meta name="author" content="Waft Technology Pvt Ltd."/><meta property="image" content="${siteUrl}${imagepath}" data-react-helmet="true"/><meta property="og:image" content="${siteUrl}${imagepath}" data-react-helmet="true"/><meta property="og:title" content="${title}" data-react-helmet="true"/><meta property="og:description" content="${text}" data-react-helmet="true"/><meta property="og:image:secure_url" content="${siteUrl}${imagepath}" data-react-helmet="true"/><meta property="og:url" content="${siteUrl}${url}" data-react-helmet="true"/><link href="https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap" rel="stylesheet"><meta name="robots" content="index, follow"><meta property="og:type" content="website" data-react-helmet="true"/><meta property="fb:app_id" content="261077198152655" data-react-helmet="true"/>`;
    const htmlContent = `${head}${html_replacer}${body}`;
    return res.send(htmlContent);
  } catch (err) {
    return next(err);
  }
};

module.exports = htmlmanupulator;
