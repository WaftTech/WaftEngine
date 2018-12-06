import React from 'react';
// @material-ui/icons
import People from '@material-ui/icons/People';
import InsertChart from '@material-ui/icons/InsertChart';
import Widgets from '@material-ui/icons/Widgets';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import VPNKEY from '@material-ui/icons/VpnKey';
import TextFormat from '@material-ui/icons/TextFormat';

import { FormattedMessage } from 'react-intl';

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
import messages from './messages';

const dashboardRoutes = [
  {
    path: '/wt/dashboard',
    sidebarName: <FormattedMessage {...messages.dashboard} />,
    navbarName: <FormattedMessage {...messages.dashboard} />,
    icon: InsertChart,
    component: DashboardPage,
    exact: true,
  },
  {
    path: '/wt/role-manage/add',
    sidebarName: <FormattedMessage {...messages.roleManage} />,
    navbarName: <FormattedMessage {...messages.roleManage} />,
    icon: PermContactCalendar,
    component: RoleManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/role-manage/edit/:id',
    sidebarName: <FormattedMessage {...messages.roleManage} />,
    navbarName: <FormattedMessage {...messages.roleManage} />,
    icon: PermContactCalendar,
    component: RoleManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/role-manage',
    sidebarName: <FormattedMessage {...messages.roleManage} />,
    navbarName: <FormattedMessage {...messages.roleManage} />,
    icon: PermContactCalendar,
    component: RoleManagePage,
  },
  {
    path: '/wt/module-manage/add',
    sidebarName: <FormattedMessage {...messages.moduleManage} />,
    navbarName: <FormattedMessage {...messages.moduleManage} />,
    icon: Widgets,
    component: ModuleManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/module-manage/edit/:id',
    sidebarName: <FormattedMessage {...messages.moduleManage} />,
    navbarName: <FormattedMessage {...messages.moduleManage} />,
    icon: Widgets,
    component: ModuleManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/module-manage/access/:id',
    sidebarName: <FormattedMessage {...messages.moduleManage} />,
    navbarName: <FormattedMessage {...messages.moduleManage} />,
    icon: Widgets,
    component: ModuleManageAccessManagePage,
    hide: true,
  },
  {
    path: '/wt/module-manage',
    sidebarName: <FormattedMessage {...messages.moduleManage} />,
    navbarName: <FormattedMessage {...messages.moduleManage} />,
    icon: Widgets,
    component: ModuleManagePage,
  },
  {
    path: '/wt/user-manage/add',
    sidebarName:  <FormattedMessage {...messages.userManage} />,
    navbarName: <FormattedMessage {...messages.userManage} />,
    icon: People,
    component: UserManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/user-manage/edit/:id',
    sidebarName: <FormattedMessage {...messages.userManage} />,
    navbarName: <FormattedMessage {...messages.userManage} />,
    icon: People,
    component: UserManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/user-manage',
    sidebarName: <FormattedMessage {...messages.userManage} />,
    navbarName: <FormattedMessage {...messages.userManage} />,
    icon: People,
    component: UserManagePage,
  },
  {
    path: '/wt/content-manage/add',
    sidebarName:  <FormattedMessage {...messages.contentManage} />,
    navbarName: <FormattedMessage {...messages.contentManage} />,
    icon: TextFormat,
    component: ContentsListingAddEditPage,
    hide: true,
  },
  {
    path: '/wt/content-manage/edit/:id',
    sidebarName:  <FormattedMessage {...messages.contentManage} />,
    navbarName: <FormattedMessage {...messages.contentManage} />,
    icon: TextFormat,
    component: ContentsListingAddEditPage,
    hide: true,
  },
  {
    path: '/wt/content-manage',
    sidebarName:  <FormattedMessage {...messages.contentManage} />,
    navbarName: <FormattedMessage {...messages.contentManage} />,
    icon: TextFormat,
    component: ContentsListingPage,
  },
  { redirect: true, path: '/wt', to: '/wt/dashboard', navbarName: 'Redirect' },
];

export default dashboardRoutes;
