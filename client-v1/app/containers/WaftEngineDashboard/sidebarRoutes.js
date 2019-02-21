import InsertChart from '@material-ui/icons/InsertChart';
// core components/views
import DashboardPage from '../Dashboard';

const sidebarRoutes = [
  {
    path: '/admin/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Dashboard',
    icon: InsertChart,
    component: DashboardPage,
    exact: true,
  },
  { redirect: true, path: '/admin', to: '/admin/dashboard', navbarName: 'Redirect' },
];

export default sidebarRoutes;
