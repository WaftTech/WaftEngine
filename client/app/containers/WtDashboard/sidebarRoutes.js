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
import BlogManagePage from '../BlogManagePage';
import FAQManagePage from '../FAQManagePage';
import BlogManageAddEditPage from '../BlogManagePage/AddEditPage';
import CategoryManagePage from '../CategoryManagePage';
import CategoryManageAddEditPage from '../CategoryManagePage/AddEditPage';
import MediaManagePage from '../MediaManagePage';
import MediaManageAddEditPage from '../MediaManagePage/AddEditPage';
import ErrorPage from '../ErrorPage';
import SliderManagePage from '../SliderManagePage';
import SliderManageAddEditPage from '../SliderManagePage/AddEditPage';

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
    sidebarName: <FormattedMessage {...messages.userManage} />,
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
    sidebarName: <FormattedMessage {...messages.contentManage} />,
    navbarName: <FormattedMessage {...messages.contentManage} />,
    icon: TextFormat,
    component: ContentsListingAddEditPage,
    hide: true,
  },
  {
    path: '/wt/content-manage/edit/:id',
    sidebarName: <FormattedMessage {...messages.contentManage} />,
    navbarName: <FormattedMessage {...messages.contentManage} />,
    icon: TextFormat,
    component: ContentsListingAddEditPage,
    hide: true,
  },
  {
    path: '/wt/content-manage',
    sidebarName: <FormattedMessage {...messages.contentManage} />,
    navbarName: <FormattedMessage {...messages.contentManage} />,
    icon: TextFormat,
    component: ContentsListingPage,
  },

  {
    path: '/wt/blog-manage/add',
    sidebarName: <FormattedMessage {...messages.blogManage} />,
    navbarName: <FormattedMessage {...messages.blogManage} />,
    icon: TextFormat,
    component: BlogManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/blog-manage/edit/:id',
    sidebarName: <FormattedMessage {...messages.blogManage} />,
    navbarName: <FormattedMessage {...messages.blogManage} />,
    icon: TextFormat,
    component: BlogManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/blog-manage',
    sidebarName: <FormattedMessage {...messages.blogManage} />,
    navbarName: <FormattedMessage {...messages.blogManage} />,
    icon: TextFormat,
    component: BlogManagePage,
  },
  {
    path: '/wt/faq-manage',
    sidebarName: <FormattedMessage {...messages.faqManage} />,
    navbarName: <FormattedMessage {...messages.faqManage} />,
    icon: TextFormat,
    component: FAQManagePage,
  },
  {
    path: '/wt/category-manage/add',
    sidebarName: <FormattedMessage {...messages.categoryManage} />,
    navbarName: <FormattedMessage {...messages.categoryManage} />,
    icon: TextFormat,
    component: CategoryManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/category-manage/edit/:id',
    sidebarName: <FormattedMessage {...messages.categoryManage} />,
    navbarName: <FormattedMessage {...messages.categoryManage} />,
    icon: TextFormat,
    component: CategoryManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/category-manage',
    sidebarName: <FormattedMessage {...messages.categoryManage} />,
    navbarName: <FormattedMessage {...messages.categoryManage} />,
    icon: TextFormat,
    component: CategoryManagePage,
  },
  {
    path: '/wt/media-manage/add',
    sidebarName: <FormattedMessage {...messages.mediaManage} />,
    navbarName: <FormattedMessage {...messages.mediaManage} />,
    icon: TextFormat,
    component: MediaManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/media-manage/edit/:id',
    sidebarName: <FormattedMessage {...messages.mediaManage} />,
    navbarName: <FormattedMessage {...messages.mediaManage} />,
    icon: TextFormat,
    component: MediaManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/media-manage',
    sidebarName: <FormattedMessage {...messages.mediaManage} />,
    navbarName: <FormattedMessage {...messages.mediaManage} />,
    icon: TextFormat,
    component: MediaManagePage,
  },
  {
    path: '/wt/error-manage/add',
    sidebarName: <FormattedMessage {...messages.errorManage} />,
    navbarName: <FormattedMessage {...messages.errorManage} />,
    icon: TextFormat,
    component: ErrorPage,
    hide: true,
  },
  {
    path: '/wt/error-manage/edit/:id',
    sidebarName: <FormattedMessage {...messages.errorManage} />,
    navbarName: <FormattedMessage {...messages.errorManage} />,
    icon: TextFormat,
    component: ErrorPage,
    hide: true,
  },
  {
    path: '/wt/error-manage',
    sidebarName: <FormattedMessage {...messages.errorManage} />,
    navbarName: <FormattedMessage {...messages.errorManage} />,
    icon: TextFormat,
    component: ErrorPage,
  },
  {
    path: '/wt/slider-manage/add',
    sidebarName: <FormattedMessage {...messages.sliderManage} />,
    navbarName: <FormattedMessage {...messages.sliderManage} />,
    icon: TextFormat,
    component: SliderManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/slider-manage/edit/:id',
    sidebarName: <FormattedMessage {...messages.sliderManage} />,
    navbarName: <FormattedMessage {...messages.sliderManage} />,
    icon: TextFormat,
    component: SliderManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/slider-manage',
    sidebarName: <FormattedMessage {...messages.sliderManage} />,
    navbarName: <FormattedMessage {...messages.sliderManage} />,
    icon: TextFormat,
    component: SliderManagePage,
  },
  { redirect: true, path: '/wt', to: '/wt/dashboard', navbarName: 'Redirect' },
];

export default dashboardRoutes;
