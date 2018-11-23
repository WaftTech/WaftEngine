// Startup point for the client side application
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import Routes from './Routes';
import reducers from './reducers';

const API_URL = 'http://18.144.51.229';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

const store = createStore(
  reducers,
  window.INITIAL_STATE,
  compose(
    applyMiddleware(thunk.withExtraArgument(axiosInstance)),
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    typeof window.devToolsExtention === 'undefined'
      ? window.devToolsExtension()
      : f => f,
  ),
);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root'),
);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
