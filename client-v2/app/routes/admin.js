import Dashboard from '@material-ui/icons/Dashboard';
import DashboardPage from '../containers/Dashboard';
import ContentManagePage from '../containers/ContentListingPage';

const routes = [
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage,
  },
  {
    path: '/admin/content-manage',
    name: 'Content Manage',
    icon: Dashboard,
    component: ContentManagePage,
  },
  // {
  //   path: '/admin/role-manage',
  //   name: 'Role Manage',
  //   icon: Dashboard,
  //   component: RoleManagePage,
  // },
];

export default routes;
