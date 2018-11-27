// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
// import Person from '@material-ui/icons/Person';
// import LibraryBooks from '@material-ui/icons/LibraryBooks';
// import BubbleChart from '@material-ui/icons/BubbleChart';
// import LocationOn from '@material-ui/icons/LocationOn';
// import Notifications from '@material-ui/icons/Notifications';
// import Unarchive from '@material-ui/icons/Unarchive';
// core components/views
import DashboardPage from '../Dashboard';
import AdsListingPage from '../AdsListingPage';
import AdsListingAddEditPage from '../AdsListingPage/AddEditPage';
import ArticleListPage from '../ArticleListPage';
import ArticleListAddEditPage from '../ArticleListPage/AddEditPage';
import CategoryManagePage from '../CategoryManagePage';
import CategoryManageAddEditPage from '../CategoryManagePage/AddEditPage';
import NewsListPage from '../NewsListPage';
import NewsListAddEditPage from '../NewsListPage/AddEditPage';
import OrganizationInfoPage from '../OrganizationInfoPage';
import OrganizationInfoAddEditPage from '../OrganizationInfoPage/AddEditPage';
import RashifalListPage from '../RashifalListPage';
import RashifalListAddEditPage from '../RashifalListPage/AddEditPage';
import RoleManagePage from '../RoleManagePage';
import RoleManageAddEditPage from '../RoleManagePage/AddEditPage';
import ModuleManagePage from '../ModuleManagePage';
import ModuleManageAddEditPage from '../ModuleManagePage/AddEditPage';
import UserManagePage from '../UserManagePage';
import UserManageAddEditPage from '../UserManagePage/AddEditPage';
// import VideoLinkPage from '../VideoLinkPage';
// import VideoLinkAddEditPage from '../VideoLinkPage/AddEditPage';

const dashboardRoutes = [
  {
    path: '/wt/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage,
    exact: true,
  },
  {
    path: '/wt/role-manage/add',
    sidebarName: 'role Manage',
    navbarName: 'Add role',
    icon: Dashboard,
    component: RoleManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/role-manage/edit/:id',
    sidebarName: 'role Manage',
    navbarName: 'role Manage',
    icon: Dashboard,
    component: RoleManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/role-manage',
    sidebarName: 'Role Manage',
    navbarName: 'Role Manage',
    icon: Dashboard,
    component: RoleManagePage,
  },
  {
    path: '/wt/module-manage/add',
    sidebarName: 'Module Manage',
    navbarName: 'Add Module',
    icon: Dashboard,
    component: ModuleManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/module-manage/edit/:id',
    sidebarName: 'Module Manage',
    navbarName: 'Module Manage',
    icon: Dashboard,
    component: ModuleManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/module-manage',
    sidebarName: 'Module Manage',
    navbarName: 'Module Manage',
    icon: Dashboard,
    component: ModuleManagePage,
  },
  // {
  //   path: '/wt/organization-info/add',
  //   sidebarName: 'Organization Info',
  //   navbarName: 'Add Organization Info',
  //   icon: Dashboard,
  //   component: OrganizationInfoAddEditPage,
  //   hide: true,
  // },
  // {
  //   path: '/wt/organization-info/edit/:id',
  //   sidebarName: 'Organization Info',
  //   navbarName: 'Organization Info',
  //   icon: Dashboard,
  //   component: OrganizationInfoAddEditPage,
  //   hide: true,
  // },
  // {
  //   path: '/wt/organization-info',
  //   sidebarName: 'Organization Info',
  //   navbarName: 'Organization Info',
  //   icon: Dashboard,
  //   component: OrganizationInfoPage,
  // },
  // {
  //   group: 'Link',
  //   path: '/wt/link-manage/add',
  //   sidebarName: 'Video Link Manage',
  //   navbarName: 'Add Video Link',
  //   icon: Dashboard,
  //   component: VideoLinkAddEditPage,
  //   hide: true,
  // },
  // {
  //   group: 'Link',
  //   path: '/wt/link-manage/edit/:id',
  //   sidebarName: 'Video Link Manage',
  //   navbarName: 'Video Link Manage',
  //   icon: Dashboard,
  //   component: VideoLinkAddEditPage,
  //   hide: true,
  // },
  // {
  //   group: 'Link',
  //   path: '/wt/link-manage',
  //   sidebarName: 'Video Link Manage',
  //   navbarName: 'Video Link Manage',
  //   icon: Dashboard,
  //   component: VideoLinkPage,
  // },
  // {
  //   path: '/wt/ads-manage/add',
  //   sidebarName: 'Ads Manage',
  //   navbarName: 'Add Ads Manage',
  //   icon: Dashboard,
  //   component: AdsListingAddEditPage,
  //   hide: true,
  // },
  // {
  //   path: '/wt/ads-manage/edit/:id',
  //   sidebarName: 'Ads Manage',
  //   navbarName: 'Ads Manage',
  //   icon: Dashboard,
  //   component: AdsListingAddEditPage,
  //   hide: true,
  // },
  // {
  //   path: '/wt/ads-manage',
  //   sidebarName: 'Ads Manage',
  //   navbarName: 'Ads Manage',
  //   icon: Dashboard,
  //   component: AdsListingPage,
  // },
  // {
  //   path: '/wt/articles-manage/add',
  //   sidebarName: 'Articles Manage',
  //   navbarName: 'Add Article',
  //   icon: Dashboard,
  //   component: ArticleListAddEditPage,
  //   hide: true,
  // },
  // {
  //   path: '/wt/articles-manage/edit/:id',
  //   sidebarName: 'Articles Manage',
  //   navbarName: 'Articles Manage',
  //   icon: Dashboard,
  //   component: ArticleListAddEditPage,
  //   hide: true,
  // },
  // {
  //   path: '/wt/articles-manage',
  //   sidebarName: 'Articles Manage',
  //   navbarName: 'Articles Manage',
  //   icon: Dashboard,
  //   component: ArticleListPage,
  // },
  // {
  //   path: '/wt/rashifal-manage/add',
  //   sidebarName: 'Rashifal Manage',
  //   navbarName: 'Add Rashifal',
  //   icon: Dashboard,
  //   component: RashifalListAddEditPage,
  //   hide: true,
  // },
  // {
  //   path: '/wt/rashifal-manage/edit/:id',
  //   sidebarName: 'Rashifal Manage',
  //   navbarName: 'Rashifal Manage',
  //   icon: Dashboard,
  //   component: RashifalListAddEditPage,
  //   hide: true,
  // },
  // {
  //   path: '/wt/rashifal-manage',
  //   sidebarName: 'Rashifal Manage',
  //   navbarName: 'Rashifal Manage',
  //   icon: Dashboard,
  //   component: RashifalListPage,
  // },
  {
    path: '/wt/user-manage/add',
    sidebarName: 'User Manage',
    navbarName: 'Add user',
    icon: Dashboard,
    component: UserManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/user-manage/edit/:id',
    sidebarName: 'User Manage',
    navbarName: 'User Manage',
    icon: Dashboard,
    component: UserManageAddEditPage,
    hide: true,
  },
  {
    path: '/wt/user-manage',
    sidebarName: 'User Manage',
    navbarName: 'User Manage',
    icon: Dashboard,
    component: UserManagePage,
  },
  // {
  //   path: '/wt/category-manage/add',
  //   sidebarName: 'Category Manage',
  //   navbarName: 'Add Category',
  //   icon: Dashboard,
  //   component: CategoryManageAddEditPage,
  //   hide: true,
  // },
  // {
  //   path: '/wt/category-manage/edit/:id',
  //   sidebarName: 'Category Manage',
  //   navbarName: 'Category Manage',
  //   icon: Dashboard,
  //   component: CategoryManageAddEditPage,
  //   hide: true,
  // },
  // {
  //   path: '/wt/category-manage',
  //   sidebarName: 'Category Manage',
  //   navbarName: 'Category Manage',
  //   icon: Dashboard,
  //   component: CategoryManagePage,
  // },
  // {
  //   path: '/wt/news-manage/add',
  //   sidebarName: 'News Manage',
  //   navbarName: 'Add News',
  //   icon: Dashboard,
  //   component: NewsListAddEditPage,
  //   hide: true,
  // },
  // {
  //   path: '/wt/news-manage/edit/:id',
  //   sidebarName: 'News Manage',
  //   navbarName: 'News Manage',
  //   icon: Dashboard,
  //   component: NewsListAddEditPage,
  //   hide: true,
  // },
  // {
  //   path: '/wt/news-manage',
  //   sidebarName: 'News',
  //   navbarName: 'News',
  //   icon: Dashboard,
  //   component: NewsListPage,
  // },
  { redirect: true, path: '/wt', to: '/wt/dashboard', navbarName: 'Redirect' },
];

export default dashboardRoutes;
