import UserProfilePage from '../containers/UserProfilePage';
import UserChangePasswordPage from '../containers/UserChangePasswordPage';

const userRoutes = [
  {
    exact: true,
    path: '/user/profile',
    component: UserProfilePage,
  },
  {
    exact: true,
    path: '/user/change-password',
    component: UserChangePasswordPage,
  },
];

export default userRoutes;
