'use strict';

const request = require('request-promise');
// const rp = require('request-promise');
const thirdPartyApiRequesterHelper = {};

thirdPartyApiRequesterHelper.requestThirdPartyApi = async (req, request_url, headers, next, request_method) => {
  try {
    const options = headers
      ? {
          method: request_method && request_method === 'POST' ? 'POST' : 'GET',
          uri: request_url,
          json: true, // Automatically stringifies the body to JSON
          headers: headers,
        }
      : {
          method: request_method && request_method === 'POST' ? 'POST' : 'GET',
          uri: request_url,
          json: true, // Automatically stringifies the body to JSON
        };
    const response = await request(options);
    return response;
  } catch (err) {
    return next(err);
  }
};
// thirdPartyApiRequesterHelper.requestThirdPartyApi1 = (req, request_url, headers, next, request_method) => {
//   try {
//     const options = headers
//       ? {
//           method: request_method && request_method === 'POST' ? 'POST' : 'GET',
//           uri: request_url,
//           json: true, // Automatically stringifies the body to JSON
//           headers: headers,
//         }
//       : {
//           method: request_method && request_method === 'POST' ? 'POST' : 'GET',
//           uri: request_url,
//           json: true, // Automatically stringifies the body to JSON
//         };
//     return new Promise((resolve, reject) => {
//       rp(options)
//         .then(response => {
//           resolve(response);
//         })
//         .catch(err => {
//           resolve({});
//         });
//     });
//   } catch (err) {
//     return next(err);
//   }
// };
module.exports = thirdPartyApiRequesterHelper;
