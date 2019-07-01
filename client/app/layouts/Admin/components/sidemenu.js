const menu = [
  { key: '1', name: 'Dashboard', icon: 'dashboard', link: '/admin/dashboard' },
  {
    key: '2',
    name: 'Content Manage',
    icon: 'format_size',
    menu: [
      {
        key: '2.1',
        name: 'Static Content',
        icon: 'format_size',
        link: '/admin/content-manage',
      },
      {
        key: '2.2',
        name: 'FAQ',
        icon: 'question_answer',
        link: '/admin/faq-manage',
      },
      {
        key: '2.3',
        name: 'FAQ Category',
        icon: 'question_answer',
        link: '/admin/faq-cat-manage',
      },
      {
        key: '2.4',
        name: 'Media',
        icon: 'question_answer',
        link: '/admin/media-manage',
      },
      {
        key: '2.5',
        name: 'Slider',
        icon: 'question_answer',
        link: '/admin/slider-manage',
      },
      {
        key: '2.6',
        name: 'Blog',
        icon: 'question_answer',
        link: '/admin/blog-manage',
      },
      {
        key: '2.7',
        name: 'Blog Category',
        icon: 'question_answer',
        link: '/admin/blog-cat-manage',
      },
    ],
  },
  {
    key: '3',
    name: 'Access Manage',
    icon: 'format_size',
    menu: [
      {
        key: '3.1',
        name: 'Users',
        icon: 'account_circle',
        link: '/admin/user-manage',
      },
    ],
  },
];
export default menu;
