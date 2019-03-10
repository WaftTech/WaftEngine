import HomePage from '../containers/HomePage';
import BlogPage from '../containers/BlogList';

const publicRoutes = [
  {
    exact: true,
    path: '/',
    component: HomePage,
  },
  {
    exact: true,
    path: '/blog-list',
    component: BlogPage,
  },
];

export default publicRoutes;
