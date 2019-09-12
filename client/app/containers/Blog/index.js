import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  BlogDetail,
  BlogList,
  BlogsByAuthor,
  BlogsByTag,
  BlogDate,
  CategoryDetail,
} from './Pages/Loadable';

import reducer from './reducer';
import saga from './saga';

const key = 'blogPage';

const Blog = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <Switch>
      <Route exact path="/blog" component={BlogList} />
      <Route exact path="/blog/:slug_url" component={BlogDetail} />
      <Route exact path="/blog/category/:slug_url" component={CategoryDetail} />
      <Route exact path="/blog/tag/:tag" component={BlogsByTag} />
      <Route exact path="/blog/author/:author" component={BlogsByAuthor} />
      <Route exact path="/blog/date/:date" component={BlogDate} />
    </Switch>
  );
};

export default Blog;
