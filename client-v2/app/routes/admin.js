import DashboardPage from '../containers/AdminDashboard/Loadable';
import RoleManagePage from '../containers/AdminRoleManage/Loadable';
import RoleManageEditPage from '../containers/AdminRoleManage/AddEditPage';
import ContentManagePage from '../containers/ContentListingPage/Loadable';

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
  {
    path: '/admin/role-manage/add',
    name: 'Role Manage',
    component: RoleManageEditPage,
    exact: true,
  },
  {
    path: '/admin/content-manage',
    name: 'Content Manage',
    component: ContentManagePage,
  },
];

export default routes;
