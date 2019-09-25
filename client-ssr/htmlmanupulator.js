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
    const path = req._parsedUrl.pathname;
    let description = `mern stack boilerplate open source `;
    let imagepath = defaultImg;
    let title = 'Blogs - WaftEngine (MERN Stack Engine)';
    let url = req._parsedUrl.href;
    switch (path) {
      case '/login-user':
        title = 'Login - WaftEngine (MERN Stack Engine)';
        break;
      case '/signup-user':
        title = 'Sign Up - WaftEngine (MERN Stack Engine)';
        break;
      case '/forgot-password-user':
        title = 'Forgot Password - WaftEngine (MERN Stack Engine)';
        break;
      case '/subscribe':
        title = 'Subscription - WaftEngine (MERN Stack Engine)';
        break;
      case '/contact-us':
        title = 'Contact Us - WaftEngine (MERN Stack Engine)';
        break;
      case '/blog':
        title = 'Blog - WaftEngine (MERN Stack Engine)';
        break;
      case '/faq':
        title = 'Faq - WaftEngine (MERN Stack Engine)';
        break;
      default:
      // code block
    }
    internal.createHtml(
      res,
      {
        imagepath: imagepath,
        description: description,
        title: title,
        url: url,
      },
      next,
    );
  } catch (err) {
    next(err);
  }
};
htmlmanupulator.DynamicPages = async (req, res, next) => {
  try {
    const path = req._parsedUrl.pathname;
    let description = `mern stack boilerplate open source `;
    let imagepath = defaultImg;
    let title = 'Blogs - WaftEngine (MERN Stack Engine)';
    let url = req._parsedUrl.href;

    const slug_url = path;
    if (slug_url === 'favicon.png') {
      return res.send(null);
    }
    const response = await requestThirdPartyApi(req, `${apiBaseUrl}api/contents/key${slug_url}`, '', next, 'GET');
    return internal.createHtml(
      res,
      {
        imagepath: imagepath,
        description: response.data && response.data.description ? response.data.description : description,
        title: response.data && response.data.name ? response.data.name : title,
        url: url,
      },
      next,
    );
  } catch (err) {
    next(err);
  }
};

htmlmanupulator.BlogBySlugUrl = async (req, res, next) => {
  try {
    const slug_url = req.params.slug_url;
    let description = `mern stack boilerplate open source `;
    let imagepath = defaultImg;
    let title = 'Blogs - WaftEngine (MERN Stack Engine)';
    let url = req._parsedUrl.href;
    if (slug_url === 'favicon.png') {
      return res.send(null);
    }
    const response = await requestThirdPartyApi(req, `${apiBaseUrl}api/blog/blog/${slug_url}`, '', next, 'GET');
    return internal.createHtml(
      res,
      {
        imagepath: response.data && response.data.image && response.data.image.path ? '/' + response.data.image.path : imagepath,
        description: response.data && response.data.short_description ? response.data.short_description : description,
        title: response.data && response.data.title ? response.data.title : title,
        url: `/blog/${slug_url}`,
      },
      next,
    );
  } catch (err) {
    return next(err);
  }
};
htmlmanupulator.BlogsByCategoryPages = async (req, res, next) => {
  try {
    const slug_url = req.params.slug_url;
    let description = `mern stack boilerplate open source `;
    let imagepath = defaultImg;
    let title = 'Blogs - WaftEngine (MERN Stack Engine)';
    let url = req._parsedUrl.href;
    if (slug_url === 'favicon.png') {
      return res.send(null);
    }
    const response = await requestThirdPartyApi(req, `${apiBaseUrl}api/blog/blogbycat/${slug_url}`, '', next, 'GET');
    return internal.createHtml(
      res,
      {
        imagepath: response.data && response.data[0] && response.data[0].image && response.data[0].image.path ? '/' + response.data[0].image.path : imagepath,
        description: response.data && response.data[0] && response.data[0].short_description ? response.data[0].short_description : description,
        title: response.data && response.data[0] && response.data[0].title ? response.data[0].title : title,
        url: `/blog/${slug_url}`,
      },
      next,
    );
  } catch (err) {
    return next(err);
  }
};

htmlmanupulator.BlogsByTagPages = async (req, res, next) => {
  try {
    const { tag } = req.params;
    internal.createHtml(
      res,
      {
        imagepath: defaultImg,
        description: `Blog By ${tag}`,
        title: `${tag} - WaftEngine (MERN Stack Engine)`,
        url: `blog/tag/${tag}`,
      },
      next,
    );
  } catch (err) {
    next(err);
  }
};
htmlmanupulator.BlogsByAuthorPages = async (req, res, next) => {
  try {
    const { author } = req.params;
    internal.createHtml(
      res,
      {
        imagepath: defaultImg,
        description: `Blog By Author`,
        title: 'Blog Author - WaftEngine (MERN Stack Engine)',
        url: `blog/author/${author}`,
      },
      next,
    );
  } catch (err) {
    next(err);
  }
};
htmlmanupulator.BlogByDatePages = async (req, res, next) => {
  try {
    const { date } = req.params;
    const d = date.split('-');
    const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    console.log(d);
    const month = months[Number(d[1])];
    internal.createHtml(
      res,
      {
        imagepath: defaultImg,
        description: `Blogs of ${d[0]} ${month}`,
        title: `Blog of ${d[0]} ${month} - WaftEngine (MERN Stack Engine)`,
        url: `blog/date/${date}`,
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
    const html_replacer = `<title>${title}</title><meta property="description" content="${text}" data-react-helmet="true"/><meta name="author" content="Waft Enginenology Pvt Ltd."/><meta property="image" content="${siteUrl}${imagepath}" data-react-helmet="true"/><meta property="og:image" content="${siteUrl}${imagepath}" data-react-helmet="true"/><meta property="og:title" content="${title}" data-react-helmet="true"/><meta property="og:description" content="${text}" data-react-helmet="true"/><meta property="og:image:secure_url" content="${siteUrl}${imagepath}" data-react-helmet="true"/><meta property="og:url" content="${siteUrl}${url}" data-react-helmet="true"/><link href="https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap" rel="stylesheet"><meta name="robots" content="index, follow"><meta property="og:type" content="website" data-react-helmet="true"/><meta property="fb:app_id" content="261077198152655" data-react-helmet="true"/>`;
    const htmlContent = `${head}${html_replacer}${body}`;
    return res.send(htmlContent);
  } catch (err) {
    return next(err);
  }
};

module.exports = htmlmanupulator;
