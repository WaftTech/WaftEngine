import App from './App';
import HomePage from './pages/HomePage';
import GrocersListPage from './pages/GrocersListPage';
import NotFoundPage from './pages/NotFoundPage';

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true,
      },
      {
        ...GrocersListPage,
        path: '/map',
      },
      {
        ...NotFoundPage,
      },
    ],
  },
];
