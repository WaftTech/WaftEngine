import Dashboard from '@material-ui/icons/Dashboard';
import ContentManagePage from '../containers/ContentListingPage';
import DashboardPage from '../containers/AdminDashboard';

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
