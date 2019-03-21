// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import People from '@material-ui/icons/People';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import DashboardPage from '../containers/Dashboard';
import RoleManagePage from '../containers/RoleManagePage';
import BlogManagePage from '../containers/BlogManagePage';
// Complete login flow
// Module manage
// Role Manage
// UserManage
// Home Page
// Blog Manage
// Banner Manage
// Faq Manage
// Side Menu on Dashboard  Manage

const routes = [
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage,
  },
  {
    path: '/admin/role-manage',
    name: 'Role Manage',
    icon: Dashboard,
    component: RoleManagePage,
  },
  {
    path: '/admin/blog-manage',
    name: 'Blog Manage',
    icon: People,
    component: BlogManagePage,
  },
];

export default routes;
