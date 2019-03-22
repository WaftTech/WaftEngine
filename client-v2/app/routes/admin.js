import DashboardPage from '../containers/AdminDashboard/Loadable';
import RoleManagePage from '../containers/AdminRoleManagePage/Loadable';
import RoleManageEditPage from '../containers/AdminRoleManagePage/AddEditPage';
import ModuleManagePage from '../containers/AdminModuleManagePage/Loadable';
import ModuleManageEditPage from '../containers/AdminModuleManagePage/AddEditPage';
import ContentManagePage from '../containers/ContentListingPage/Loadable';
import ContentManageAddEdit from '../containers/ContentListingPage/AddEditPage';

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
    path: '/admin/content-manage/edit/:id',
    name: 'Content Manage',
    component: ContentManageAddEdit,
    exact: true,
  },
  {
    path: '/admin/content-manage/add',
    name: 'Content Manage',
    component: ContentManageAddEdit,
    exact: true,
  },
  {
    path: '/admin/module-manage',
    name: 'Module Manage',
    component: ModuleManagePage,
    exact: true,
  },
  {
    path: '/admin/module-manage/edit/:id',
    name: 'Module Manage',
    component: ModuleManageEditPage,
    exact: true,
  },
  {
    path: '/admin/module-manage/add',
    name: 'Module Manage',
    component: ModuleManageEditPage,
    exact: true,
  },
  {
    path: '/admin/content-manage/edit/:id',
    name: 'Content Manage',
    component: ContentManageAddEdit,
  },
  {
    path: '/admin/content-manage',
    name: 'Content Manage',
    component: ContentManagePage,
    exact: true,
  },
];

export default routes;
