const htmlToText = require('html-to-text');
const htmlmanupulator = {};
const internal = {};
const { head, body, apiBaseUrl, siteUrl, defaultImg } = require('./constant');
const { requestThirdPartyApi } = require('./helper');

htmlmanupulator.documentation = async (req, res, next) => {
  try {
    internal.createHtml(
      res,
      {
        imagepath: defaultImg,
        description:
          'WaftTech is an open source platform for developers to create enterprise level web application in MERN stack. ',
        title: 'Documentation - WaftTech (MERN Stack Engine)',
        url: 'documentation',
      },
      next,
    );
  } catch (err) {
    next(err);
  }
};

htmlmanupulator.documentationBySlug = async (req, res, next) => {
  try {
    const id = req.params.slug;
    if (id === 'favicon.png') {
      return res.send(null);
    }
    const response = await requestThirdPartyApi(
      req,
      `${apiBaseUrl}/documentation/${id}`,
      '',
      next,
      'GET',
    );
    return internal.createHtml(
      res,
      {
        imagepath:
          (response.data.image && response.data.image.path) || defaultImg,
        description: response.data.detail,
        title: response.data.title,
        url: `documentation/${id}`,
      },
      next,
    );
  } catch (err) {
    return next(err);
  }
};
htmlmanupulator.products = async (req, res, next) => {
  try {
    internal.createHtml(
      res,
      {
        imagepath: defaultImg,
        description:
          'Our Products :- we are desparate to build amazing products Mobile Bookkeeping:- accounting app based on double entry bookkeeping system, WaftEngine(MERN Stack Engine) Open Source Content Management System built on MERN stack framework., Nepal Offers:- List of all offers and deals applicable in Nepal, Mobile Expense Manager :- manage expenses and transactions',
        title:
          'Products :- Mobile Bookkeeping, WaftEngine(MERN Stack Engine), Nepal Offers, Mobile Expense Manager - WaftTech ',
        url: 'products',
      },
      next,
    );
  } catch (err) {
    next(err);
  }
};
htmlmanupulator.services = async (req, res, next) => {
  try {
    internal.createHtml(
      res,
      {
        imagepath: defaultImg,
        description: `Your Ideas. Our Execution with One Stop Execution, Web Application, Mobile Application, UI/UX Design, IT Consultant Services, Blockchain, Digital Marketin, Built By WaftTech :- TASK24, ASKTOMARINA`,
        title: 'Services - WaftTech',
        url: 'services',
      },
      next,
    );
  } catch (err) {
    next(err);
  }
};
htmlmanupulator.approach = async (req, res, next) => {
  try {
    internal.createHtml(
      res,
      {
        imagepath: defaultImg,
        description: `Execution Process:- our process facilitated the transparent and on-time delivery for clients ranging from small startups to multinational corporations If you can dream it, we can build it. Steps:- 1. Research & Strategy , 2. Design & Develop, 3. Testing & Deliver`,
        title:
          'Approach Execution Process, If you can dream it, we can build it. - WaftTech',
        url: 'features',
      },
      next,
    );
  } catch (err) {
    next(err);
  }
};
htmlmanupulator.blogList = async (req, res, next) => {
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

htmlmanupulator.blogBySlugUrl = async (req, res, next) => {
  try {
    const id = req.params.slug_url;
    if (id === 'favicon.png') {
      return res.send(null);
    }
    const response = await requestThirdPartyApi(
      req,
      `${apiBaseUrl}/blog/blog/${id}`,
      '',
      next,
      'GET',
    );
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
htmlmanupulator.team = async (req, res, next) => {
  try {
    internal.createHtml(
      res,
      {
        imagepath: defaultImg,
        description: `We are multilingual:- Javascript Node
        Jquery, React, Redux, Angular, Socket.io, php, Redis, SQL, Mongodb, Blockchain, Graph API, R, Python, C#, ASP.NET, Java, Swift, GIT, Docker, NGINX, PM2, Google Tagmanager, Bash Executive Team Jivan Shrestha - Design Team Lead - Interface Design | Prototypes | CSS, Manoj Mahato - Project Lead - Nodejs | MongoDB | jQuery | C# | SQL, Rajan Jaiswal - Mobile Team Lead - Swift | Objective C | React Native | Android, Sailesh Kasaju - Web Team Lead - React | Angular | Javascript | React Native`,
        title: 'Our Team, Our Strength - WaftTech ',
        url: 'team',
      },
      next,
    );
  } catch (err) {
    next(err);
  }
};
htmlmanupulator.siteMap = async (req, res, next) => {
  try {
    internal.createHtml(
      res,
      {
        imagepath: defaultImg,
        description: `Site Maps`,
        title: 'Site Map- WaftTech (MERN Stack Engine)',
        url: 'site-map',
      },
      next,
    );
  } catch (err) {
    next(err);
  }
};
htmlmanupulator.contactUs = async (req, res, next) => {
  try {
    internal.createHtml(
      res,
      {
        imagepath: defaultImg,
        description: `WaftTech, a technology driven software company, has its primary focus on problem solving. We believe in possibilities for technical enhancement in current processes (or nature of work), which will be solved using currently trending technical developments. We are product and service based company and we believe in best practices, and sharing.`,
        title: 'Contact - WaftTech',
        url: 'contact',
      },
      next,
    );
  } catch (err) {
    next(err);
  }
};
htmlmanupulator.blogCategory = async (req, res, next) => {
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

htmlmanupulator.BlogCategoryByID = async (req, res, next) => {
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
