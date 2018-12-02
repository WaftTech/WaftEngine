import Dashboard from '@material-ui/icons/Dashboard';
import DashboardPage from '../Homepage';

const dashboardRoutes = [
  {
    path: '/admin/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage,
    exact: true,
  },
  { redirect: true, path: '/admin', to: '/admin/dashboard', navbarName: 'Redirect' },
];

export default dashboardRoutes;
