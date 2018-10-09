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
import NewsListPage from '../NewsListPage';
import OrganizationInfoPage from '../OrganizationInfoPage';
import OrganizationInfoAddEditPage from '../OrganizationInfoPage/AddEditPage';
import RashifalListPage from '../RashifalListPage';
import RoleManagePage from '../RoleManagePage';
import UserManagePage from '../UserManagePage';
import VideoLinkPage from '../VideoLinkPage';
import VideoLinkAddEditPage from '../VideoLinkPage/AddEditPage';

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
    path: '/wt/organization-info/add',
    sidebarName: 'Organization Info',
    navbarName: 'Add Organization Info',
    icon: Dashboard,
    component: OrganizationInfoAddEditPage,
    hide: true,
  },
  {
    path: '/wt/organization-info/edit/:id',
    sidebarName: 'Organization Info',
    navbarName: 'Organization Info',
    icon: Dashboard,
    component: OrganizationInfoAddEditPage,
    hide: true,
  },
  {
    path: '/wt/organization-info',
    sidebarName: 'Organization Info',
    navbarName: 'Organization Info',
    icon: Dashboard,
    component: OrganizationInfoPage,
  },
  {
    path: '/wt/link-manage/add',
    sidebarName: 'Video Link Manage',
    navbarName: 'Add Video Link',
    icon: Dashboard,
    component: VideoLinkAddEditPage,
    hide: true,
  },
  {
    path: '/wt/link-manage/edit/:id',
    sidebarName: 'Video Link Manage',
    navbarName: 'Video Link Manage',
    icon: Dashboard,
    component: VideoLinkAddEditPage,
    hide: true,
  },
  {
    path: '/wt/link-manage',
    sidebarName: 'Video Link Manage',
    navbarName: 'Video Link Manage',
    icon: Dashboard,
    component: VideoLinkPage,
  },
  {
    path: '/wt/ads-manage/add',
    sidebarName: 'Ads Manage',
    navbarName: 'Add Ads Manage',
    icon: Dashboard,
    component: AdsListingAddEditPage,
    hide: true,
  },
  {
    path: '/wt/ads-manage/edit/:id',
    sidebarName: 'Ads Manage',
    navbarName: 'Ads Manage',
    icon: Dashboard,
    component: AdsListingAddEditPage,
    hide: true,
  },
  {
    path: '/wt/ads-manage',
    sidebarName: 'Ads Manage',
    navbarName: 'Ads Manage',
    icon: Dashboard,
    component: AdsListingPage,
  },
  {
    path: '/wt/articles-manage/add',
    sidebarName: 'Articles Manage',
    navbarName: 'Add Article',
    icon: Dashboard,
    component: ArticleListAddEditPage,
    hide: true,
  },
  {
    path: '/wt/articles-manage/edit/:id',
    sidebarName: 'Articles Manage',
    navbarName: 'Articles Manage',
    icon: Dashboard,
    component: ArticleListAddEditPage,
    hide: true,
  },
  {
    path: '/wt/articles-manage',
    sidebarName: 'Articles Manage',
    navbarName: 'Articles Manage',
    icon: Dashboard,
    component: ArticleListPage,
  },
  {
    path: '/wt/rashifal-manage',
    sidebarName: 'Rashifal Manage',
    navbarName: 'Rashifal Manage',
    icon: Dashboard,
    component: RashifalListPage,
  },
  {
    path: '/wt/user-manage',
    sidebarName: 'User Manage',
    navbarName: 'User Manage',
    icon: Dashboard,
    component: UserManagePage,
  },
  {
    path: '/wt/category-manage',
    sidebarName: 'Category Manage',
    navbarName: 'Category Manage',
    icon: Dashboard,
    component: CategoryManagePage,
  },
  {
    path: '/wt/role-manage',
    sidebarName: 'Role Manage',
    navbarName: 'Role Manage',
    icon: Dashboard,
    component: RoleManagePage,
  },
  {
    path: '/wt/news-manage',
    sidebarName: 'News',
    navbarName: 'News',
    icon: Dashboard,
    component: NewsListPage,
  },
  { redirect: true, path: '/wt', to: '/wt/dashboard', navbarName: 'Redirect' },
];

export default dashboardRoutes;
