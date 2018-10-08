// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
import LocationOn from '@material-ui/icons/LocationOn';
import Notifications from '@material-ui/icons/Notifications';
import Unarchive from '@material-ui/icons/Unarchive';
// core components/views
import DashboardPage from '../Dashboard';
import AdsListingPage from '../AdsListingPage';
import ArticleListPage from '../ArticleListPage';
import CategoryManagePage from '../CategoryManagePage';
import NewsListPage from '../NewsListPage';
import OrganizationInfoPage from '../OrganizationInfoPage';
import RashifalListPage from '../RashifalListPage';
import RoleManagePage from '../RoleManagePage';
import UserManagePage from '../UserManagePage';
import VideoLinkPage from '../VideoLinkPage';

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
    path: '/wt/organization-info',
    sidebarName: 'Organization Info',
    navbarName: 'Organization Info',
    icon: Dashboard,
    component: OrganizationInfoPage,
  },
  {
    path: '/wt/link-manage',
    sidebarName: 'Video Link Manage',
    navbarName: 'Video Link Manage',
    icon: Dashboard,
    component: VideoLinkPage,
  },
  {
    path: '/wt/ads-manage',
    sidebarName: 'Ads Manage',
    navbarName: 'Ads Manage',
    icon: Dashboard,
    component: AdsListingPage,
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
