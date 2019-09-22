// import UserProfilePage from '../containers/UserProfilePage';
import ProfileRoute from '../containers/Profile/index';

const userRoutes = [
  {
    exact: false,
    path: '/user/profile',
    component: ProfileRoute,
  },
];

export default userRoutes;
