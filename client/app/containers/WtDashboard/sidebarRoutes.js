// @material-ui/icons
import People from '@material-ui/icons/People';
import InsertChart from '@material-ui/icons/InsertChart';
import Widgets from '@material-ui/icons/Widgets';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import VPNKEY from '@material-ui/icons/VpnKey';
import TextFormat from '@material-ui/icons/TextFormat';
// core components/views
import DashboardPage from '../Dashboard';
import RoleManagePage from '../RoleManagePage';
import RoleManageAddEditPage from '../RoleManagePage/AddEditPage';
import ModuleManagePage from '../ModuleManagePage';
import ModuleManageAddEditPage from '../ModuleManagePage/AddEditPage';
import ModuleManageAccessManagePage from '../ModuleManagePage/AccessManagePage';
import UserManagePage from '../UserManagePage';
import UserManageAddEditPage from '../UserManagePage/AddEditPage';
import ContentsListingPage from '../ContentListingPage';
import ContentsListingAddEditPage from '../ContentListingPage/AddEditPage';
import Uchiha from '../Uchiha';

const dashboardRoutes = [
  {
    path: '/wt/uch',
    sidebarName: 'Uchiha',
    navbarName: 'Dashboard',
    icon: InsertChart,
    component: Uchiha,
    exact: true,
  },
  {
    path: '/wt/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Dashboard',
    icon: InsertChart,
    component: DashboardPage,
    exact: true,
  },
  {
    path: '/wt/role-manage/add',
    sidebarName: 'role Manage',
    navbarName: 'Add role',
    icon: PermContactCalendar,
    component: RoleManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/role-manage/edit/:id',
    sidebarName: 'role Manage',
    navbarName: 'role Manage',
    icon: PermContactCalendar,
    component: RoleManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/role-manage',
    sidebarName: 'Role Manage',
    navbarName: 'Role Manage',
    icon: PermContactCalendar,
    component: RoleManagePage,
  },
  {
    path: '/wt/module-manage/add',
    sidebarName: 'Module Manage',
    navbarName: 'Add Module',
    icon: Widgets,
    component: ModuleManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/module-manage/edit/:id',
    sidebarName: 'Module Manage',
    navbarName: 'Module Manage',
    icon: Widgets,
    component: ModuleManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/module-manage/access/:id',
    sidebarName: 'Module Manage',
    navbarName: 'Module Manage',
    icon: Widgets,
    component: ModuleManageAccessManagePage,
    hide: true,
  },
  {
    path: '/wt/module-manage',
    sidebarName: 'Module Manage',
    navbarName: 'Module Manage',
    icon: Widgets,
    component: ModuleManagePage,
  },
  {
    path: '/wt/user-manage/add',
    sidebarName: 'User Manage',
    navbarName: 'Add user',
    icon: People,
    component: UserManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/user-manage/edit/:id',
    sidebarName: 'User Manage',
    navbarName: 'User Manage',
    icon: People,
    component: UserManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/user-manage',
    sidebarName: 'User Manage',
    navbarName: 'User Manage',
    icon: People,
    component: UserManagePage,
  },
  {
    path: '/wt/content-manage/add',
    sidebarName: 'Content Manage',
    navbarName: 'Add Contents Manage',
    icon: TextFormat,
    component: ContentsListingAddEditPage,
    hide: true,
  },
  {
    path: '/wt/content-manage/edit/:id',
    sidebarName: 'Content Manage',
    navbarName: 'Content Manage',
    icon: TextFormat,
    component: ContentsListingAddEditPage,
    hide: true,
  },
  {
    path: '/wt/content-manage',
    sidebarName: 'Content Manage',
    navbarName: 'Content Manage',
    icon: TextFormat,
    component: ContentsListingPage,
  },
  { redirect: true, path: '/wt', to: '/wt/dashboard', navbarName: 'Redirect' },
];

export default dashboardRoutes;
