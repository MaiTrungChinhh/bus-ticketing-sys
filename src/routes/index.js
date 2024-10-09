import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import OrderPage from '../pages/OrderPage/OrderPage';
import BuyTicketPage from '../pages/BuyTicketPage/BuyTicketPage';

export const routes = [
  {
    path: '/home',
    page: HomePage,
  },
  {
    path: '/order',
    page: OrderPage,
  },
  {
    path: '/buyticket',
    page: BuyTicketPage,
  },
  {
    path: '*',
    page: NotFoundPage,
  },
];
