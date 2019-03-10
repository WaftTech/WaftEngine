// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
// import Person from '@material-ui/icons/Person';
// import LibraryBooks from '@material-ui/icons/LibraryBooks';
// import BubbleChart from '@material-ui/icons/BubbleChart';
// import LocationOn from '@material-ui/icons/LocationOn';
// import Notifications from '@material-ui/icons/Notifications';
// import Unarchive from '@material-ui/icons/Unarchive';
// import Language from '@material-ui/icons/Language';
// core components/views for Admin layout
import DashboardPage from '../containers/Dashboard';
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
    component: DashboardPage,
  },
];

export default routes;
