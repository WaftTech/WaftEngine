import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import expressip from 'express-ip';

import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

const port = process.env.PORT || 5004;

export const API_URL = 'https://demo3.wafttech.com';

app.use(expressip().getIpInfoMiddleware);

app.use(
  '/api',
  proxy(API_URL, {
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:3000'; // eslint-disable-line no-param-reassign
      return opts;
    },
  }),
);
app.use(express.static('public'));
app.get('*', (req, res) => {
  res.set('Cache-Control', 'public, max-age=60');
  const store = createStore(req);
  if (req.ipInfo.ll && req.ipInfo.ll.length === 2) {
    store.dispatch({ type: 'SET_LATITUDE', payload: req.ipInfo.ll[0] });
    store.dispatch({ type: 'SET_LONGITUDE', payload: req.ipInfo.ll[1] });
  }

  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => (route.loadData ? route.loadData(store) : null))
    .map(promise => {
      if (promise) {
        return new Promise(resolve => {
          promise.then(resolve).catch(resolve);
        });
      }
      return null;
    });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    if (context.url) {
      return res.redirect(301, context.url);
    }
    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
    return null;
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`); // eslint-disable-line no-console
});
