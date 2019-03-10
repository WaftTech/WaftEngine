import LoginPage from '../containers/LoginPage/Loadable';
import AdminLoginPage from '../containers/AdminLoginPage/Loadable';

const routes = [
  {
    path: '/auth/login',
    component: LoginPage,
    exact: true,
  },
  {
    path: '/auth/admin-login',
    component: AdminLoginPage,
    exact: true,
  },
];

export default routes;
