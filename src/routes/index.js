import AddCustomerPage from '../pages/AdminPage/Add/AddCustomerPage.jsx';
import AddEmployeePage from '../pages/AdminPage/Add/AddEmployeePage.jsx'; // Thêm trang thêm nhân viên
import AddEmployeeTypePage from '../pages/AdminPage/Add/AddEmployeeTypePage.jsx';
import AddTrip from '../pages/AdminPage/Add/AddTripPage';
import EditEmployeePage from '../pages/AdminPage/Edit/EditEmployeePage.jsx';
import EditEmployeeTypePage from '../pages/AdminPage/Edit/EditEmployeeTypePage';
import CustomerListPage from '../pages/AdminPage/Page/CustomerListPage.jsx';
import Dashboard from '../pages/AdminPage/Page/DashboardPage';
import EmployeeTypePage from '../pages/AdminPage/Page/EmployeeTypePage.jsx';
import ListEmployeePage from '../pages/AdminPage/Page/ListEmployeePage.jsx';
import ListTrip from '../pages/AdminPage/Page/TripPage';
import ListVehicle from '../pages/AdminPage/Page/VehiclePage';
import BuyTicketDetailPage from '../pages/BuyTicketPage/BuyTicketDetailPage';
import BuyTicketPage from '../pages/BuyTicketPage/BuyTicketPage';
import PaymentPage from '../pages/BuyTicketPage/PaymentPage';
import FooterPage from '../pages/FooterPage/FooterPage';
import HomePage from '../pages/HomePage/HomePage';
import QuyDinhChungPage from '../pages/LinksFooter/QuyDinhChungPage';
import LoginPage from '../pages/LoginLogout/LoginPage';
import RegisterPage from '../pages/LoginLogout/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import OrderPage from '../pages/OrderPage/OrderPage';


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
    path: '/dashboard',
    page: Dashboard,
  },


  {
    path: '/admin',
    page: Dashboard, // Cập nhật để trang /admin chuyển trực tiếp đến Dashboard
  },
  {
    path: '/dashboard/customers/list',
    page: CustomerListPage, 
  },
  {
    path: '/dashboard/customer/add',
    page: AddCustomerPage, 
  },



  {
    path:'/dashboard/employees/type',
    page: EmployeeTypePage,
  },
  {
    path: '/dashboard/employees/type/add',
    page: AddEmployeeTypePage,
  },
  {
    path: '/dashboard/employees/type/edit',
    page: EditEmployeeTypePage,
},
  {
    path: '/dashboard/employees/list',
    page: ListEmployeePage,
  },
  {
    path: '/dashboard/employee/add',
    page: AddEmployeePage,
  },
  {
    path: '/dashboard/employee/edit/:id',
    page: EditEmployeePage,
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
