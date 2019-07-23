(thirdPartyApiRequesterHelper => {
  'use strict';

  const request = require('request-promise');
  const rp = require('request-promise');

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
      // console.log("options",options);
      const response = await request(options);
      // console.log("response",response);
      return response;
    } catch (err) {
      return next(err);
    }
  };
  thirdPartyApiRequesterHelper.requestThirdPartyApi1 = (request_url, headers, body, request_method) => {
    try {
      const options = headers
        ? {
            method: request_method && request_method === 'POST' ? 'POST' : 'GET',
            uri: request_url,
            body: body,
            json: true, // Automatically stringifies the body to JSON
            headers: headers,
          }
        : {
            method: request_method && request_method === 'POST' ? 'POST' : 'GET',
            uri: request_url,
            body: body,
            json: true, // Automatically stringifies the body to JSON
          };
      return new Promise((resolve, reject) => {
        rp(options)
          .then(response => {
            console.log('++++++', response);
            resolve(response);
          })
          .catch(err => {
            resolve({});
          });
      });
    } catch (err) {
      return console.log(err);
    }
  };
})(module.exports);
