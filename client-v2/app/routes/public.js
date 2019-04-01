import HomePage from '../containers/HomePage';
import LoginAdminPage from '../containers/LoginAdminPage/Loadable';
import LoginUserPage from '../containers/LoginUserPage/Loadable';
import ForgotPasswordUserPage from '../containers/ForgotPasswordUserPage/Loadable';
import SignupUserPage from '../containers/SignupUserPage/Loadable';
import FaqPage from '../containers/FAQPage/Loadable';
import BlogListPage from '../containers/BlogList/Loadable';
import CategoryListingPage from '../containers/CategoryListingPage/Loadable';
import CategoryDetailPage from '../containers/CategoryDetailPage/Loadable';
import ContactPage from '../containers/ContactPage/index';
import SubscribePage from '../containers/SubscribePage/index';

const publicRoutes = [
  {
    exact: true,
    path: '/',
    component: HomePage,
  },
  {
    exact: true,
    path: '/login-admin',
    component: LoginAdminPage,
  },
  {
    exact: true,
    path: '/login-user',
    component: LoginUserPage,
  },
  {
    exact: true,
    path: '/signup-user',
    component: SignupUserPage,
  },
  {
    exact: true,
    path: '/forgot-password-user',
    component: ForgotPasswordUserPage,
  },
  {
    exact: true,
    path: '/faq',
    component: FaqPage,
  },
  {
    exact: true,
    path: '/blog-list',
    component: BlogListPage,
  },
  {
    exact: true,
    path: '/blog-category',
    component: CategoryListingPage,
  },
  {
    exact: true,
    path: '/blog-category/:id',
    component: CategoryDetailPage,
  },
  {
    exact: true,
    path: '/contact',
    component: ContactPage,
  },
  {
    exact: true,
    path: '/subscribe',
    component: SubscribePage,
  },
  // {
  //   exact: true,
  //   path: '/about-us',
  //   component: AboutUs,
  // },
  // {
  //   exact: true,
  //   path: '/videos',
  //   component: Videos,
  // },
  // {
  //   exact: true,
  //   path: '/video/:id',
  //   component: VideosPage,
  // },
  // {
  //   exact: true,
  //   path: '/video/link/:id',
  //   component: VideoDetailPage,
  // },
];

export default publicRoutes;
