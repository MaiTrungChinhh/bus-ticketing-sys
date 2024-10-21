import AdminPage from '../pages/AdminPage/AdminPage';
import BuyTicketPage from '../pages/BuyTicketPage/BuyTicketPage';
import FooterPage from '../pages/FooterPage/FooterPage';
import HomePage from '../pages/HomePage/HomePage';
import QuyDinhChungPage from '../pages/LinksFooter/QuyDinhChungPage';
import LoginPage from '../pages/LoginLogout/LoginPage';
import RegisterPage from '../pages/LoginLogout/RegisterPage';
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
    isShowFooter: true,  // Thêm isShowFooter
    isShowHeader: true,  
  },
  {
    path: '/buyticket',
    page: BuyTicketPage,
    isShowFooter: true,  
    isShowHeader: true,  
  },
  {
    path: '/footer',
    page: FooterPage,
    isShowFooter: true,  
    isShowHeader: false,  // Ẩn header cho trang footer
  },
  {
    path: '/quydinhchung',  // Thêm đường dẫn cho trang Quy Định Chung
    page: QuyDinhChungPage,
    isShowHeader: true,
    isShowFooter: true,
    isShowQuydinhchung:true,
  },
  {
    path: '/admin',
    page: AdminPage,
    isShowAdmin: true, 
  },
   {
    path: '/login',
    page: LoginPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: '/register',
    page: RegisterPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: '*',
    page: NotFoundPage,
    isShowFooter: false,  // Ẩn footer cho trang NotFound
    isShowHeader: false,
  },
];
