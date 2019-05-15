import UserProfilePage from '../containers/ProfilePage/Loadable';
// import UserWishListsPage from '../containers/UserWishListsPage';
// import UserParticipatedTendersPage from '../containers/UserParticipatedTendersPage';
// import UserAwardedTendersPage from '../containers/UserAwardedTendersPage';
// import UserMyNotesPage from '../containers/UserMyNotesPage';
// import UserBillPaymentPage from '../containers/UserBillPaymentPage';
// import UserLoginLogsPage from '../containers/UserLoginLogsPage';
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
