// https://material.io/tools/icons
import React from 'react';

import { FaChartPie, FaCode } from 'react-icons/fa';

const menu = [
  {
    key: '1',
    name: 'Dashboard',
    icon: <FaChartPie />,
    link: '/admin/dashboard',
  },
  {
    key: '2',
    name: 'Content',
    icon: <FaChartPie />,
    menu: [
      {
        key: '2.1',
        name: 'Section',
        link: '/admin/content-manage',
        icon: <FaChartPie />,
      },
      {
        key: '2.2',
        name: 'Page',
        icon: <FaChartPie />,
        link: '/admin/page-manage',
      },
      {
        key: '2.7',
        name: 'Menu',
        icon: <FaChartPie />,
        link: '/admin/menu-manage',
      },
      {
        key: '2.3',
        name: 'Media',
        icon: <FaChartPie />,
        link: '/admin/media-manage',
      },
      {
        key: '2.4',
        name: 'Slider',
        icon: <FaChartPie />,
        link: '/admin/slider-manage',
      },
      {
        key: '2.5',
        name: 'Blog',
        icon: <FaChartPie />,
        menu: [
          {
            key: '2.5.1',
            name: 'Blog',
            link: '/admin/blog-manage',
            icon: <FaChartPie />,
          },
          {
            key: '2.5.2',
            name: 'Category',
            icon: <FaChartPie />,
            link: '/admin/blog-cat-manage',
          },
        ],
      },
      {
        key: '2.2',
        name: 'FAQ',
        icon: 'question_answer',
        menu: [
          {
            key: '2.2.1',
            name: 'Faq',
            icon: <FaChartPie />,
            link: '/admin/faq-manage',
          },
          {
            key: '2.2.2',
            name: 'Category',
            icon: <FaChartPie />,
            link: '/admin/faq-cat-manage',
          },
        ],
      },
    ],
  },
  {
    key: '3',
    name: 'Access',
    icon: <FaChartPie />,
    menu: [
      {
        key: '3.1',
        name: 'Users',
        icon: <FaChartPie />,
        link: '/admin/user-manage',
      },
      {
        key: '3.2',
        name: 'Roles',
        icon: <FaChartPie />,
        link: '/admin/role-manage',
      },
    ],
  },
  {
    key: '6',
    name: 'Modules',
    icon: <FaChartPie />,
    menu: [
      {
        key: '6.3',
        name: 'Modules',
        icon: <FaChartPie />,
        link: '/admin/module-manage',
      },
      {
        key: '6.4',
        name: 'Module Group',
        icon: <FaChartPie />,
        link: '/admin/sub-modules',
      },
    ],
  },
  {
    key: '4',
    name: 'Settings',
    icon: <FaChartPie />,
    menu: [
      {
        key: '4.1',
        name: 'Email Template',
        icon: <FaChartPie />,
        link: '/admin/template-manage',
      },
      {
        key: '4.2',
        name: 'General Settings',
        icon: <FaChartPie />,
        link: '/admin/settings',
      },
    ],
  },
  {
    key: '5',
    name: 'Reports',
    icon: <FaChartPie />,
    menu: [
      {
        key: '5.1',
        name: 'Contacts',
        icon: <FaChartPie />,
        link: '/admin/contact-manage',
      },
      {
        key: '5.2',
        name: 'Subscribes',
        icon: <FaChartPie />,
        link: '/admin/subscribe-manage',
      },
      {
        key: '5.4',
        name: 'Errors',
        icon: <FaChartPie />,
        link: '/admin/errors',
      },
      {
        key: '5.5',
        name: 'Comment',
        icon: <FaChartPie />,
        link: '/admin/blog-comment-manage',
      },
    ],
  },
];
export default menu;
