import AdminPage from '../pages/AdminPage/AdminPage';
import FooterPage from '../pages/FooterPage/FooterPage';
import HomePage from '../pages/HomePage/HomePage';
import QuyDinhChungPage from '../pages/LinksFooter/QuyDinhChungPage';
import LoginPage from '../pages/LoginLogout/LoginPage';
import RegisterPage from '../pages/LoginLogout/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import OrderPage from '../pages/OrderPage/OrderPage';
import BuyTicketPage from '../pages/BuyTicketPage/BuyTicketPage';
import BuyTicketDetailPage from '../pages/BuyTicketPage/BuyTicketDetailPage';
import PaymentPage from '../pages/BuyTicketPage/PaymentPage';
import Dashboard from '../pages/AdminPage/DashboardPage';
import ListUser from '../pages/AdminPage/ListUserPage';
import ListTrip from '../pages/AdminPage/TripPage';
import AddTrip from '../pages/AdminPage/Add/AddTripPage';
import ListVehicle from '../pages/AdminPage/VehiclePage';

export const routes = [
  {
    path: '/',
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
    path: '/footer',
    page: FooterPage,
  },
  {
    path: '/quydinhchung',
    page: QuyDinhChungPage,
  },
  {
    path: '/admin',
    page: AdminPage,
  },
  {
    path: '/dashboard',
    page: Dashboard,
  },
  {
    path: '/dashboard/users/list',
    page: ListUser,
  },
  {
    path: '/dashboard/trip/list',
    page: ListTrip,
  },
  {
    path: '/dashboard/trip/add',
    page: AddTrip,
  },
  {
    path: '/dashboard/vehicles/list',
    page: ListVehicle,
  },
  {
    path: '/login',
    page: LoginPage,
  },
  {
    path: '/register',
    page: RegisterPage,
  },
  {
    path: '/buyticket/detail/:id',
    page: BuyTicketDetailPage,
  },
  {
    path: '/payment',
    page: PaymentPage,
  },
  {
    path: '*',
    page: NotFoundPage,
  },
];
