import DashboardPage from '../containers/Admin/Dashboard/Loadable';
import RolePage from '../containers/Admin/Role/Loadable';
import RoleEditPage from '../containers/Admin/Role/AddEditPage/Loadable';
import ModuleManagePage from '../containers/Admin/Module/Loadable';
import ModuleManageEditPage from '../containers/Admin/Module/AddEditPage/Loadable';
import ModuleAccessManagePage from '../containers/Admin/Module/AccessManagePage/Loadable';
import UserManagePage from '../containers/Admin/User/Loadable';
import UserManageEditPage from '../containers/Admin/User/AddEditPage/Loadable';
import ContentManagePage from '../containers/Admin/Content/Loadable';
import ContentManageAddEdit from '../containers/Admin/Content/AddEditPage/Loadable';
import FaqPage from '../containers/Admin/Faq/Loadable';
import FaqCatManagePage from '../containers/Admin/FaqCategory/Loadable';
import FaqAddEdit from '../containers/Admin/Faq/AddEditPage/Loadable';
import MediaPage from '../containers/Admin/Media/Loadable';
import SliderPage from '../containers/Admin/Slider/Loadable';
import SliderAddEdit from '../containers/Admin/Slider/AddEditPage/Loadable';
import BlogManagePage from '../containers/Admin/Blog/Loadable';
import BlogManageAddEdit from '../containers/Admin/Blog/AddEditPage/Loadable';
import SubscribePage from '../containers/Admin/Subscribe/Loadable';
import SubscribeViewPage from '../containers/Admin/Subscribe/SubscribeView';
import ContactListPage from '../containers/Admin/Contact/Loadable';
import ContactViewPage from '../containers/Admin/Contact/ViewContactList';
import TemplateListingPage from '../containers/Admin/Template/Loadable';
import ErrorManagePage from '../containers/Admin/Error/Loadable';
import FaqCatAddEditPage from '../containers/Admin/FaqCategory';
import BlogCatManagePage from '../containers/Admin/BlogCategory/Loadable';
import BlogCommentManagePage from '../containers/Admin/BlogComment/Loadable';
import BlogCatAddEditPage from '../containers/Admin/BlogCategory/AddEdit/Loadable';
import Report from '../containers/Admin/Report/Loadable';
import Integration from '../containers/Admin/Integration/Loadable';
import UserProfilePage from '../containers/Admin/Profile/index';

const routes = [
  {
    path: '/admin/dashboard',
    component: DashboardPage,
    exact: true,
  },
  {
    path: '/admin/role-manage',
    component: RolePage,
    exact: true,
  },
  {
    path: '/admin/role-manage/edit/:id',
    component: RoleEditPage,
    exact: true,
  },
  {
    path: '/admin/role-manage/add',
    component: RoleEditPage,
    exact: true,
  },
  {
    path: '/admin/content-manage/edit/:id',
    component: ContentManageAddEdit,
    exact: true,
  },
  {
    path: '/admin/content-manage/add',
    component: ContentManageAddEdit,
    exact: true,
  },
  {
    path: '/admin/content-manage',
    component: ContentManagePage,
    exact: true,
  },
  {
    path: '/admin/module-manage',
    component: ModuleManagePage,
    exact: true,
  },
  {
    path: '/admin/module-manage/edit/:id',
    component: ModuleManageEditPage,
    exact: true,
  },
  {
    path: '/admin/module-manage/add',
    component: ModuleManageEditPage,
    exact: true,
  },
  {
    path: '/admin/module-manage/access/:id',
    component: ModuleAccessManagePage,
    exact: true,
  },
  {
    path: '/admin/user-manage',
    component: UserManagePage,
    exact: true,
  },
  {
    path: '/admin/user-manage/edit/:id',
    component: UserManageEditPage,
    exact: true,
  },
  {
    path: '/admin/user-manage/add',
    component: UserManageEditPage,
    exact: true,
  },
  {
    path: '/admin/faq-manage/edit/:id',
    name: 'FAQ Manage',
    component: FaqAddEdit,
    exact: true,
  },
  {
    path: '/admin/faq-manage/add',
    name: 'FAQ Manage',
    component: FaqAddEdit,
    exact: true,
  },
  {
    path: '/admin/faq-manage',
    name: 'FAQ Manage',
    component: FaqPage,
    exact: true,
  },
  {
    path: '/admin/faq-cat-manage/edit/:id',
    component: FaqCatAddEditPage,
    exact: true,
  },
  {
    path: '/admin/faq-cat-manage/add',
    component: FaqCatAddEditPage,
    exact: true,
  },
  {
    path: '/admin/faq-cat-manage',
    component: FaqCatManagePage,
    exact: true,
  },
  {
    path: '/admin/media-manage',
    component: MediaPage,
    exact: true,
  },
  {
    path: '/admin/slider-manage/edit/:id',
    component: SliderAddEdit,
    exact: true,
  },
  {
    path: '/admin/slider-manage/add',
    component: SliderAddEdit,
    exact: true,
  },
  {
    path: '/admin/slider-manage',
    component: SliderPage,
    exact: true,
  },
  {
    path: '/admin/blog-manage/edit/:id',
    component: BlogManageAddEdit,
    exact: true,
  },
  {
    path: '/admin/blog-manage/add',
    component: BlogManageAddEdit,
    exact: true,
  },
  {
    path: '/admin/blog-manage',
    component: BlogManagePage,
    exact: true,
  },

  {
    path: '/admin/blog-cat-manage/edit/:slug',
    component: BlogCatAddEditPage,
    exact: true,
  },
  {
    path: '/admin/blog-cat-manage/add',
    component: BlogCatAddEditPage,
    exact: true,
  },
  {
    path: '/admin/blog-cat-manage',
    component: BlogCatManagePage,
    exact: true,
  },
  {
    path: '/admin/blog-comment-manage',
    component: BlogCommentManagePage,
    exact: true,
  },
  {
    path: '/admin/subscribe-manage/view/:id',
    component: SubscribeViewPage,
    exact: true,
  },
  {
    path: '/admin/subscribe-manage',
    component: SubscribePage,
    exact: true,
  },
  {
    path: '/admin/contact-manage/view/:id',
    component: ContactViewPage,
    exact: true,
  },
  {
    path: '/admin/contact-manage',
    component: ContactListPage,
    exact: true,
  },
  {
    path: '/admin/template-manage',
    component: TemplateListingPage,
    exact: true,
  },
  {
    path: '/admin/errors',
    component: ErrorManagePage,
    exact: true,
  },
  {
    path: '/admin/reports',
    component: Report,
    exact: true,
  },
  {
    path: '/admin/integration',
    component: Integration,
    exact: true,
  },
  {
    exact: false,
    path: '/admin/profile',
    component: UserProfilePage,
  },
];

export default routes;
