const http = require('http');
const htmlmanupulator = {};
const internal = {};
const { head, body, normal, apiBaseUrl, siteUrl } = require('./constant');
const { requestThirdPartyApi } = require('./helper');

// htmlmanupulator.sendForCompany = async (req, res, next) => {
//   try {
//     internal.createHtml(
//       res,
//       {
//         imagepath: 'icon_512x512.0d07052f9928a577e5a3e76e9d64dbf1.png',
//         description: 'Company listed in nepal offers ',
//         title: 'Nepal Offer - Companies',
//         url: 'company',
//       },
//       next,
//     );
//   } catch (err) {
//     next(err);
//   }
// };
// htmlmanupulator.sendForCompanyDetail = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (id === 'favicon.png') {
//       return res.send(null);
//     }
//     const response = await requestThirdPartyApi(
//       req,
//       `${apiBaseUrl}/about-us`,
//       '',
//       next,
//       'GET',
//     );
//     return internal.createHtml(
//       res,
//       {
//         imagepath: response.data.meta_image.path,
//         description: response.data.meta_description,
//         title: response.data.title,
//         url: `company/${id}`,
//       },
//       next,
//     );
//   } catch (err) {
//     next(err);
//   }
// };
// htmlmanupulator.sendForOfferDetail = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     if (slug === 'favicon.png') {
//       return res.send(null);
//     }
//     const response = await requestThirdPartyApi(
//       req,
//       `${apiBaseUrl}/offer/slug/${slug}`,
//       '',
//       next,
//       'GET',
//     );
//     internal.createHtml(
//       res,
//       {
//         imagepath: response.data.Image.path,
//         description: response.data.Description,
//         title: response.data.Offer_In,
//         url: `offer/${slug}`,
//       },
//       next,
//     );
//   } catch (err) {
//     next(err);
//   }
// };
// htmlmanupulator.sendForBlogDetail = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     if (slug === 'favicon.png') {
//       return res.send(null);
//     }
//     const response = await requestThirdPartyApi(
//       req,
//       `${apiBaseUrl}/blog/blog/${slug}`,
//       '',
//       next,
//       'GET',
//     );
//     internal.createHtml(
//       res,
//       {
//         imagepath: response.data.Image[0].path,
//         description: response.data.Description.replace(
//           /<\/?[^>]+(>|$)/g,
//           '',
//         ).trim(),
//         title: response.data.Title,
//         url: `blog/${slug}`,
//       },
//       next,
//     );
//   } catch (err) {
//     next(err);
//   }
// };
// htmlmanupulator.sendForAboutUS = async (req, res, next) => {
//   try {
//     const response = await requestThirdPartyApi(
//       req,
//       `${apiBaseUrl}/company/${id}`,
//       '',
//       next,
//       'GET',
//     );
//     internal.createHtml(
//       res,
//       {
//         imagepath: 'icon_512x512.0d07052f9928a577e5a3e76e9d64dbf1.png',
//         description:
//           'This website aims to list all offers and deals applicable in Nepal. This product is brought to you by WaftTech.',
//         title: 'nepaloffers-about-us',
//         url: `about-us`,
//       },
//       next,
//     );
//   } catch (err) {
//     next(err);
//   }
// };

htmlmanupulator.sendWithRoute = async (req, res, next) => {
  try {
    console.log('inside html manipullator: sendWithRoute');
    const { route } = req.params || 'blog';
    console.log(route);
    if (route) {
      const response = await requestThirdPartyApi(
        req,
        `${apiBaseUrl}/meta/route/${route}`,
        '',
        next,
        'GET',
      );

      if (response.data && response.data[0]) {
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

internal.createHtml = (res, data, next) => {
  try {
    const { imagepath, description, title, url } = data;
    const html_replacer = `<title>${title}</title><meta property="og:image" content="${siteUrl}${imagepath}" data-react-helmet="true"/><meta property="image" content="${siteUrl}${imagepath}" data-react-helmet="true"/><meta property="og:image:secure_url" content="${siteUrl}${imagepath}" data-react-helmet="true"/><meta property="og:description" content="${description}" data-react-helmet="true"/><meta property="description" content="${description}" data-react-helmet="true"/><meta property="og:description" content="${description}" data-react-helmet="true"/><meta property="og:title" content="${title}" data-react-helmet="true"/><meta property="og:url" content="${siteUrl}${url}" data-react-helmet="true"/><meta property="og:type" content="website" data-react-helmet="true"/><meta property="fb:app_id" content="261077198152655" data-react-helmet="true"/></head>`;
    const htmlContent = `${head}${html_replacer},${body}`;
    return res.send(htmlContent);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = htmlmanupulator;
