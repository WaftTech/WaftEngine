import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import Routes from '../client/Routes';

export default (req, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>,
  );

  const helmet = Helmet.renderStatic();

  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="theme-color" content="#ee6e73"/><meta property="og:title" content="ask4trip" />
      <meta name="Description" content="ask4trip">
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.demo3.wafttech.com" />
      <meta property="og:description" content="ask4trip">
      <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
      integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
      crossorigin="anonymous"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:400,600"
      rel="stylesheet"
    />
      <title>ask4trip</title>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      <link rel="manifest" href="/manifest.json">
      <link rel="icon" type="image/x-icon" href="/favicon.ico">
      <link href="/styles.css" rel="stylesheet">
      <script src="https://unpkg.com/ionicons@4.4.7/dist/ionicons.js"></script>
    </head>
    <body>
    <div id="modal"></div>
    <div id="root">${content}</div>
      <script>
        window.INITIAL_STATE = ${serialize(store.getState())}
      </script>
      <script src="bundle.js"></script>
    </body>
  </html>
  `;
};
