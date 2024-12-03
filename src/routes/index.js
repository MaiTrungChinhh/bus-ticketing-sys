import TicketLookup from '../components/DetailTicket/TicketInfoComponent.jsx';
import AddBookingPage from '../pages/AdminPage/Add/AddBookingPage.jsx';
import AddCustomerPage from '../pages/AdminPage/Add/AddCustomerPage.jsx';
import AddEmployeePage from '../pages/AdminPage/Add/AddEmployeePage.jsx'; // Thêm trang thêm nhân viên
import AddEmployeeTypePage from '../pages/AdminPage/Add/AddEmployeeTypePage.jsx';
import AddPaymentMethodPage from '../pages/AdminPage/Add/AddPaymentMethodPage.jsx';
import AddPricePage from '../pages/AdminPage/Add/AddPricePage.jsx';
import AddRoutePage from '../pages/AdminPage/Add/AddRoutePage.jsx';
import AddTrip from '../pages/AdminPage/Add/AddTripPage';
import AddVehiclePage from '../pages/AdminPage/Add/AddVehiclePage.jsx';
import AddVehicleTypePage from '../pages/AdminPage/Add/AddVehicleTypePage.jsx';
import EditEmployeePage from '../pages/AdminPage/Edit/EditEmployeePage.jsx';
import {
  default as EditEmployeeTypePage,
  default as EditVehicleType,
} from '../pages/AdminPage/Edit/EditEmployeeTypePage';
import EditPaymentMethodPage from '../pages/AdminPage/Edit/EditPaymentMethodPage.jsx';
import EditPricePage from '../pages/AdminPage/Edit/EditPricePage.jsx';
import EditRoutePage from '../pages/AdminPage/Edit/EditRoute.jsx';
import EditTripPage from '../pages/AdminPage/Edit/EditTripPage.jsx';
import EditVehiclePage from '../pages/AdminPage/Edit/EditVehiclePage.jsx';
import AssignmentTrip from '../pages/AdminPage/Page/AssignmentTrip.jsx';
import AssignmentVehicle from '../pages/AdminPage/Page/AssignmentVehicle.jsx';
import BookTicketPage from '../pages/AdminPage/Page/BookTicketPage.jsx';
import CustomerListPage from '../pages/AdminPage/Page/CustomerListPage.jsx';
import Dashboard from '../pages/AdminPage/Page/DashboardPage';
import EmployeeTypePage from '../pages/AdminPage/Page/EmployeeTypePage.jsx';
import ListEmployeePage from '../pages/AdminPage/Page/ListEmployeePage.jsx';
import PaymentMethodPage from '../pages/AdminPage/Page/PaymentMethodPage.jsx';
import PricePage from '../pages/AdminPage/Page/PricePage.jsx';
import RoutePage from '../pages/AdminPage/Page/RoutePage.jsx';
import ListTrip from '../pages/AdminPage/Page/TripPage';
import VehicleInactivePage from '../pages/AdminPage/Page/VehicleInactivePage.jsx';
import VehicleListPage from '../pages/AdminPage/Page/VehicleListPage.jsx';
import VehicleTypePage from '../pages/AdminPage/Page/VehicleTypePage.jsx';
import BuyTicketDetailPage from '../pages/BuyTicketPage/BuyTicketDetailPage';
import BuyTicketPage from '../pages/BuyTicketPage/BuyTicketPage';
import PaymentPage from '../pages/BuyTicketPage/PaymentPage';
import FooterPage from '../pages/FooterPage/FooterPage';
import ChangePasswordPage from '../pages/ForgotPasswordPage/ChangePasswordPage.jsx';
import InputEmail from '../pages/ForgotPasswordPage/InputEmail.jsx';
import VerifyOtpPage from '../pages/ForgotPasswordPage/VerifyOtpPage.jsx';
import HomePage from '../pages/HomePage/HomePage';
import QuyDinhChungPage from '../pages/LinksFooter/QuyDinhChungPage';
import LoginPage from '../pages/LoginLogout/LoginPage';
import RegisterPage from '../pages/LoginLogout/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import OrderPage from '../pages/OrderPage/OrderPage';
import AssignmentTripAdd from '../pages/AdminPage/Add/AddAssignmentTrip.jsx';
import AssignmentVehicleAdd from '../pages/AdminPage/Add/AddAssignmentVehicle.jsx';

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
    path: '/dashboard/employees/type',
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

  // quản lý xe
  {
    path: '/dashboard/vehicles/type',
    page: VehicleTypePage,
  },
  {
    path: '/dashboard/vehicle/type/add',
    page: AddVehicleTypePage,
  },

  {
    path: '/dashboard/vehicles/list',
    page: VehicleListPage,
  },
  {
    path: '/dashboard/vehicle/add',
    page: AddVehiclePage,
  },
  {
    path: '/dashboard/vehicles/list/inactive',
    page: VehicleInactivePage,
  },
  {
    path: '/dashboard/vehicle/edit',
    page: EditVehiclePage,
  },
  {
    path: '/dashboard/vehicletype/edit',
    page: EditVehicleType,
  },

  // quản lý giá
  {
    path: '/dashboard/prices/list',
    page: PricePage,
  },
  {
    path: '/dashboard/price/edit',
    page: EditPricePage,
  },
  {
    path: '/dashboard/price/add',
    page: AddPricePage,
  },
  //quản lý phương thức thanh toán

  {
    path: '/dashboard/paymentmethod/list',
    page: PaymentMethodPage,
  },
  {
    path: '/dashboard/paymentmethod/edit/:id',
    page: EditPaymentMethodPage,
  },
  {
    path: '/dashboard/paymentmethod/add',
    page: AddPaymentMethodPage,
  },

  // Quản lý tuyến
  {
    path: '/dashboard/routes/list',
    page: RoutePage,
  },
  {
    path: '/dashboard/route/add',
    page: AddRoutePage,
  },
  {
    path: '/dashboard/route/edit/:id',
    page: EditRoutePage,
  },

  // quản lý chuyến xe
  {
    path: '/dashboard/trip/list',
    page: ListTrip,
  },
  {
    path: '/dashboard/trip/add',
    page: AddTrip,
  },
  {
    path: '/dashboard/trip/edit/:id',
    page: EditTripPage,
  },
  {
    path: '/dashboard/assignmentTrip/list',
    page: AssignmentTrip,
  },
  {
    path: '/dashboard/assignmentVehicle/list',
    page: AssignmentVehicle,
  },
  {
    path: 'dashboard/assignmentTrip/add',
    page: AssignmentTripAdd,
  },
  {
    path: 'dashboard/assignmentVehicle/add',
    page: AssignmentVehicleAdd,
  },
  // {
  //   path: '/dashboard/vehicles/list',
  //   page: ListVehicle,
  // },
  {
    path: '/dashboard/bookings/list',
    page: BookTicketPage,
  },
  {
    path: '/dashboard/bookings/add',
    page: AddBookingPage,
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
    path: '/ticketlookup',
    page: TicketLookup,
  },
  {
    path: '*',
    page: NotFoundPage,
  },

  // Quên mật khẩu
  {
    path: '/user/forgotpassword',
    page: InputEmail,
  },
  {
    path: '/user/verifyotp',
    page: VerifyOtpPage,
  },
  {
    path: '/user/changepassword',
    page: ChangePasswordPage,
  },
];
