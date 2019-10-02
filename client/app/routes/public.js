import React from 'react';
import HomePage from '../containers/HomePage';
import LoginAdminPage from '../containers/LoginAdminPage/Loadable';
import LoginUserPage from '../containers/LoginUserPage/Loadable';
import ForgotPasswordUserPage from '../containers/ForgotPasswordUserPage/Loadable';
import SignupUserPage from '../containers/SignupUserPage/Loadable';
import FaqPage from '../containers/FAQPage/Loadable';
import ContactUsPage from '../containers/ContactUs/Loadable';
import SubscribePage from '../containers/SubscriberPage/Loadable';
import StaticPage from '../containers/StaticPages/Loadable';
import EditorFileSelectPage from '../containers/EditorFileSelect';

import BlogPages from '../containers/Blog';

const publicRoutes = [
  {
    exact: true,
    path: '/',
    component: HomePage,
  },
  {
    exact: true,
    path: '/editor-file-select',
    component: EditorFileSelectPage,
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
    exact: false,
    path: '/blog',
    component: BlogPages,
  },
  {
    exact: true,
    path: '/subscribe',
    component: SubscribePage,
  },
  {
    exact: true,
    path: '/contact-us',
    component: ContactUsPage,
  },
  {
    exact: true,
    path: '/about-us',
    render: props => (
      <StaticPage contentKey="about-us" title="About Us" {...props} />
    ),
  },
  {
    exact: true,
    path: '/term-and-condition',
    render: props => (
      <StaticPage contentKey="term-and-condition" title="About Us" {...props} />
    ),
  },
  {
    exact: true,
    path: '/data-policy',
    render: props => (
      <StaticPage contentKey="data-policy" title="About Us" {...props} />
    ),
  },
  {
    exact: true,
    path: '/cookies-policy',
    render: props => (
      <StaticPage contentKey="cookies-policy" title="About Us" {...props} />
    ),
  },
];

export default publicRoutes;
