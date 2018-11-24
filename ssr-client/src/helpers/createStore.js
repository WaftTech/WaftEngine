import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'apisauce';
import reducers from '../client/reducers';
import { API_URL } from '../index';

export default req => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: { cookie: req.get('cookie') || '' },
  });

  const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)));

  return store;
};
