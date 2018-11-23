import React from 'react';

// eslint-disable-next-line react/prop-types
const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true; // eslint-disable-line no-param-reassign
  return <h1>Ooops, route not found.</h1>;
};

export default {
  component: NotFoundPage,
};
