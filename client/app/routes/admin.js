import DashboardPage from '../containers/Admin/AdminDashboard/Loadable';
import RoleManagePage from '../containers/Admin/AdminRoleManagePage/Loadable';
import RoleManageEditPage from '../containers/Admin/AdminRoleManagePage/AddEditPage/Loadable';
import ModuleManagePage from '../containers/Admin/AdminModuleManagePage/Loadable';
import ModuleManageEditPage from '../containers/Admin/AdminModuleManagePage/AddEditPage/Loadable';
import ModuleAccessManagePage from '../containers/Admin/AdminModuleManagePage/AccessManagePage/Loadable';
import UserManagePage from '../containers/Admin/AdminUserManagePage/Loadable';
import UserManageEditPage from '../containers/Admin/AdminUserManagePage/AddEditPage/Loadable';
import ContentManagePage from '../containers/Admin/AdminContentListingPage/Loadable';
import ContentManageAddEdit from '../containers/Admin/AdminContentListingPage/AddEditPage/Loadable';
import FaqManagePage from '../containers/Admin/AdminFaqManagePage/Loadable';
import FaqCatManagePage from '../containers/Admin/AdminFaqCategoryManagePage/Loadable';
import FaqManageAddEdit from '../containers/Admin/AdminFaqManagePage/AddEditPage/Loadable';
import MediaManagePage from '../containers/Admin/AdminMediaManagePage/Loadable';
import SliderManagePage from '../containers/Admin/AdminSliderManagePage/Loadable';
import SliderManageAddEdit from '../containers/Admin/AdminSliderManagePage/AddEditPage/Loadable';
import BlogManagePage from '../containers/Admin/AdminBlogManagePage/Loadable';
import BlogManageAddEdit from '../containers/Admin/AdminBlogManagePage/AddEditPage/Loadable';
import SubscribePage from '../containers/Admin/AdminSubscribePage/Loadable';
import SubscribeViewPage from '../containers/Admin/AdminSubscribePage/SubscribeView';
import ContactListPage from '../containers/Admin/AdminContactListPage/Loadable';
import ContactViewPage from '../containers/Admin/AdminContactListPage/ViewContactList';
import TemplateListingPage from '../containers/Admin/AdminTemplateListingPage/Loadable';
import ErrorManagePage from '../containers/Admin/AdminErrorManagePage/Loadable';
import FaqCatAddEditPage from '../containers/Admin/AdminFaqCategoryManagePage/AddEdit/Loadable';
import BlogCatManagePage from '../containers/Admin/AdminBlogCategoryManagePage/Loadable';
import BlogCatAddEditPage from '../containers/Admin/AdminBlogCategoryManagePage/AddEdit/Loadable';
import AdminReportPage from '../containers/Admin/AdminReportPage/Loadable';
import AdminIntegrationPage from '../containers/Admin/AdminIntegrationPage/Loadable';

const routes = [
  {
    path: '/admin/dashboard',
    component: DashboardPage,
    exact: true,
  },
  {
    path: '/admin/role-manage',
    component: RoleManagePage,
    exact: true,
  },
  {
    path: '/admin/role-manage/edit/:id',
    component: RoleManageEditPage,
    exact: true,
  },
  {
    path: '/admin/role-manage/add',
    component: RoleManageEditPage,
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
    component: FaqManageAddEdit,
    exact: true,
  },
  {
    path: '/admin/faq-manage/add',
    name: 'FAQ Manage',
    component: FaqManageAddEdit,
    exact: true,
  },
  {
    path: '/admin/faq-manage',
    name: 'FAQ Manage',
    component: FaqManagePage,
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
    component: MediaManagePage,
    exact: true,
  },
  {
    path: '/admin/slider-manage/edit/:id',
    component: SliderManageAddEdit,
    exact: true,
  },
  {
    path: '/admin/slider-manage/add',
    component: SliderManageAddEdit,
    exact: true,
  },
  {
    path: '/admin/slider-manage',
    component: SliderManagePage,
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
    path: '/admin/blog-cat-manage/edit/:id',
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
    component: AdminReportPage,
    exact: true,
  },
  {
    path: '/admin/integration',
    component: AdminIntegrationPage,
    exact: true,
  },
];

export default routes;
