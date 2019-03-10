import LoginPage from '../containers/LoginPage/Loadable';
import AdminLoginPage from '../containers/AdminLoginPage/Loadable';
import SignupPage from '../containers/SignupPage';
import ForgotPasswordPage from '../containers/ForgotPasswordPage';
import CodeVerifyPage from '../containers/CodeVerifyPage';

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
  {
    path: '/auth/signup',
    component: SignupPage,
    exact: true,
  },
  {
    path: '/auth/reset-password',
    component: ForgotPasswordPage,
    exact: true,
  },
  {
    path: '/auth/reset-password/code-verify',
    component: CodeVerifyPage,
    exact: true,
  },
];

export default routes;
