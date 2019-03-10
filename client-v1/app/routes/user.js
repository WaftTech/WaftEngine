// @material-ui/icons
// import Dashboard from '@material-ui/icons/Dashboard';
// import Person from '@material-ui/icons/Person';
// import LibraryBooks from '@material-ui/icons/LibraryBooks';
// import BubbleChart from '@material-ui/icons/BubbleChart';
// import LocationOn from '@material-ui/icons/LocationOn';
// import Notifications from '@material-ui/icons/Notifications';
// import Unarchive from '@material-ui/icons/Unarchive';
// import Language from '@material-ui/icons/Language';
// core components/views for Admin layout
import HomePage from '../containers/HomePage';
import BlogPage from '../containers/BlogList';

const userRoutes = [
  {
    path: '/user/home',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/user/blogs',
    name: 'BlogsPage',
    component: BlogPage,
  },
];

export default userRoutes;
