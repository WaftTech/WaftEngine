import DashboardPage from '../containers/AdminDashboard/Loadable';
import RoleManagePage from '../containers/AdminRoleManage/Loadable';
import RoleManageEditPage from '../containers/AdminRoleManage/AddEditPage';

const routes = [
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
  },
  {
    path: '/admin/role-manage',
    name: 'Role Manage',
    component: RoleManagePage,
    exact: true,
  },
  {
    path: '/admin/role-manage/edit/:id',
    name: 'Role Manage',
    component: RoleManageEditPage,
    exact: true,
  },
];

export default routes;
