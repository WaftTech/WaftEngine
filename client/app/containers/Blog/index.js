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
  BlogDetailMobile,
} from './Pages/Loadable';

import reducer from './reducer';
import saga from './saga';
import style from './blogLayout.css';

const key = 'blogPage';

const Blog = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <div className="bg-white">
      <Switch>
        <Route exact path="/news" component={BlogList} />
        <Route
          exact
          path="/news/mobile/:slug_url"
          component={BlogDetailMobile}
        />
        <Route path="/news/:yy/:mm/:dd/:slug_url" component={BlogDetail} />
        <Route exact path="/news/:slug_url" component={BlogDetail} />

        <Route
          exact
          path="/news/category/:slug_url"
          component={CategoryDetail}
        />
        <Route exact path="/news/tag/:tag" component={BlogsByTag} />
        <Route exact path="/news/author/:author" component={BlogsByAuthor} />
        <Route exact path="/news/date/:date" component={BlogDate} />
        <Route exact path="/blog" component={BlogList} />
        {/* <Route exact path="/news/:slug_url" component={BlogDetail} /> */}
        <Route
          exact
          path="/news/category/:slug_url"
          component={CategoryDetail}
        />
        <Route exact path="/news/tag/:tag" component={BlogsByTag} />
        <Route exact path="/news/author/:author" component={BlogsByAuthor} />
        <Route exact path="/news/date/:date" component={BlogDate} />
      </Switch>
    </div>
  );
};

export default Blog;
