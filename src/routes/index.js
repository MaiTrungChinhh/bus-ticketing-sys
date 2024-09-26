import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import OrderPage from '../pages/OrderPage/OrderPage';

export const routes = [
  {
    path: '/home',
    page: HomePage,
    isShowFooter: true,
  },
  {
    path: '/order',
    page: OrderPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: '*',
    page: NotFoundPage,
  },
];
