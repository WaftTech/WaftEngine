import InsertChart from '@material-ui/icons/InsertChart';
// core components/views
import DashboardPage from '../Dashboard';

const sidebarRoutes = [
  {
    path: '/wt',
    sidebarName: 'Dashboard',
    navbarName: 'Dashboard',
    icon: InsertChart,
    component: DashboardPage,
    exact: true,
  },
];

export default sidebarRoutes;
