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
import ContactUs from '../containers/ContactUs';
import AboutUs from '../containers/AboutUs';
import Videos from '../containers/VideoLibraryListingPage';
import FaqPage from '../containers/FAQPage';

const userRoutes = [
  {
    path: '/user/home',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/user/blog-list',
    name: 'BlogsPage',
    component: BlogPage,
  },

  {
    path: '/user/contact-us',
    name: 'ContactUsPage',
    component: ContactUs,
  },
  {
    path: '/user/about-us',
    name: 'AboutUsPage',
    component: AboutUs,
  },
  {
    path: '/user/videos',
    name: 'videoPage',
    component: Videos,
  },
  {
    path: '/user/faq',
    name: 'faqPage',
    component: FaqPage,
  },
];

export default userRoutes;
