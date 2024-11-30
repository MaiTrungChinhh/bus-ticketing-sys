import React, { useEffect, useState } from 'react';
import {
  FaBus,
  FaBusAlt,
  FaChartLine,
  FaCogs,
  FaEdit,
  FaFileAlt,
  FaHistory,
  FaList,
  FaPlus,
  FaRoute,
  FaTachometerAlt,
  FaTicketAlt,
  FaUserFriends,
  FaUsers,
  FaUserShield,
  FaWrench
} from 'react-icons/fa';
import { IoPricetags } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import NavMenuItem from './NavMenuItem';

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(true); // Trạng thái mở/đóng sidebar
  const [isHovered, setIsHovered] = useState(false); // Trạng thái hover
  const [openMenuId, setOpenMenuId] = useState(null); // Trạng thái menu mở
  const [userRole, setUserRole] = useState(null); // Vai trò của người dùng

  // Lấy vai trò từ localStorage
  useEffect(() => {
    const role = localStorage.getItem('roles'); // Lấy vai trò từ localStorage
    console.log('Vai trò hiện tại:', role); // Kiểm tra giá trị
    setUserRole(role); // Lưu vai trò vào state
  }, []);



  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Chuyển đổi sidebar
    setOpenMenuId(null); // Đóng menu khi sidebar đóng
  };

  // Xử lý việc mở/đóng submenu
  const handleSubMenuToggle = (menuId) => {
    if (openMenuId === menuId && isHovered) {
      setOpenMenuId(null); // Đóng nếu đã mở
    } else {
      setOpenMenuId(menuId); // Mở menu đã chọn
    }
  };
  const hasAccess = (requiredRoles) => {
    if (!userRole) {
      console.warn('Không tìm thấy vai trò người dùng.');
      return false;
    }
    return requiredRoles.includes(userRole); // Kiểm tra vai trò
  };


  return (
    <div
      className={`flex sidebar transition-all duration-500 ease-in-out ${isOpen || isHovered ? 'w-96 opacity-100' : 'w-24 opacity-75'
        } bg-gradient-to-r from-blue-400 to-blue-600 p-1 shadow-lg`}
      onMouseEnter={() => setIsHovered(true)} // Hiện sidebar khi hover
      onMouseLeave={() => {
        setIsHovered(false); // Ẩn sidebar khi không hover
        setOpenMenuId(null); // Đóng tất cả các submenu
      }}
    >
      <div className="h-screen text-white overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-200">
        <nav className="flex flex-col p-4">
          <div className="flex items-center justify-between mb-4">
            <h1
              className={`text-2xl font-bold transition-opacity duration-500 ${isOpen || isHovered ? 'block opacity-100' : 'hidden opacity-0'
                }`}
            >
              {isOpen || isHovered ? 'Quản lý Hệ thống' : ''}
            </h1>
            <button
              onClick={toggleSidebar}
              className="text-white bg-blue-700 p-2 rounded focus:outline-none transition-all duration-300 hover:bg-blue-800"
            >
              {isOpen ? 'Đóng' : 'Mở'}
            </button>
          </div>

          {/* Các mục menu */}
          {hasAccess(['ADMIN', 'EMPLOYEE']) && (
            <NavMenuItem
              label={isOpen || isHovered ? 'Dashboard' : ''}
              to="/dashboard"
              icon={<FaTachometerAlt />}
              onSubMenuToggle={() => handleSubMenuToggle('dashboard')}
              isOpen={isOpen}
            />
          )}

          {hasAccess(['ADMIN']) && (
            <NavMenuItem
              label={isOpen || isHovered ? 'Quản lý người dùng' : ''}
              to="/users"
              icon={<FaUsers />}
              subMenus={[
                {
                  label: 'Loại nhân viên',
                  to: '/dashboard/employees/type',
                  icon: <FaList />,
                },
                {
                  label: 'Danh sách nhân viên',
                  to: '/dashboard/employees/list',
                  icon: <FaList />,
                },
                {
                  label: 'Danh sách người dùng',
                  to: '/dashboard/customers/list',
                  icon: <FaList />,
                },
              ]}
              onSubMenuToggle={() => handleSubMenuToggle('customers')}
              isOpen={isOpen}
            />
          )}

          {hasAccess(['ADMIN', 'EMPLOYEE']) && (
            <NavMenuItem
              label={isOpen || isHovered ? 'Quản lý đặt vé' : ''}
              to="/bookings"
              icon={<FaTicketAlt />}
              subMenus={[
                {
                  label: 'Danh sách đặt vé',
                  to: '/bookings/list',
                  icon: <FaList />,
                },
                { label: 'Thêm đặt vé', to: '/bookings/add', icon: <FaPlus /> },
                {
                  label: 'Lịch sử đặt vé',
                  to: '/bookings/history',
                  icon: <FaHistory />,
                },
              ]}
              onSubMenuToggle={() => handleSubMenuToggle('bookings')}
              isOpen={isOpen}
            />
          )}


          {hasAccess(['ADMIN', 'EMPLOYEE']) && (
            <NavMenuItem
              label={isOpen || isHovered ? 'Quản lý chuyến xe' : ''} // Hiện text khi hover
              to="/bus-schedule"
              icon={<FaBus />}
              subMenus={[
                {
                  label: 'Danh sách chuyến xe',
                  to: '/dashboard/trip/list',
                  icon: <FaList />,
                },
                {
                  label: 'Thêm chuyến xe',
                  to: '/dashboard/trip/add',
                  icon: <FaPlus />,
                },
                {
                  label: 'Cập nhật chuyến xe',
                  to: '/dashboard/trip/edit',
                  icon: <FaEdit />,
                },
              ]}

              onSubMenuToggle={() => handleSubMenuToggle('busSchedule')}
              isOpen={isOpen}
            />
          )}

          {hasAccess(['ADMIN', 'EMPLOYEE']) && (
            <NavMenuItem
              label={isOpen || isHovered ? 'Quản lý xe' : ''}
              to="/vehicles"
              icon={<FaBusAlt />}
              subMenus={[
                { label: 'Loại xe', to: '/dashboard/vehicles/type', icon: <FaList /> },
                { label: 'Danh sách xe', to: '/dashboard/vehicles/list', icon: <FaList /> },
                { label: 'Danh sách xe không còn hoạt động', to: '/dashboard/vehicles/list/inactive', icon: <FaList /> },
              ]}
              onSubMenuToggle={() => handleSubMenuToggle('vehicles')}
              isOpen={isOpen}
            />
          )}

          {hasAccess(['ADMIN']) && (
            <NavMenuItem
              label={isOpen || isHovered ? 'Quản lý tuyến' : ''}
              to="/routes"
              icon={<FaRoute />}
              subMenus={[
                { label: 'Danh sách tuyến', to: '/dashboard/routes/list', icon: <FaList /> }
              ]}
              onSubMenuToggle={() => handleSubMenuToggle('routes')}
              isOpen={isOpen}
            />
          )}

          <NavMenuItem
            label={isOpen || isHovered ? 'Quản lý giá' : ''} // Hiện text khi hover
            to="/prices"
            icon={<IoPricetags />}
            subMenus={[
              { label: 'Danh sách giá', to: '/dashboard/prices/list', icon: <FaList /> },
            ]}
            onSubMenuToggle={() => handleSubMenuToggle('prices')}
            isOpen={isOpen}
          />
          <NavMenuItem
            label={isOpen || isHovered ? 'Quản lý phương thức thanh toán' : ''} // Hiện text khi hover
            to="/paymentmethod"
            icon={<MdOutlinePayment />}
            subMenus={[
              { label: 'Danh sách phương thức thanh toán', to: '/dashboard/paymentmethod/list', icon: <FaList /> },
            ]}
            onSubMenuToggle={() => handleSubMenuToggle('paymentmethod')}
            isOpen={isOpen}
          />
          <NavMenuItem
            label={isOpen || isHovered ? 'Báo cáo & Phân tích' : ''} // Hiện text khi hover
            to="/reports"
            icon={<FaChartLine />}
            subMenus={[
              {
                label: 'Báo cáo doanh thu',
                to: '/reports/revenue',
                icon: <FaFileAlt />,
              },
              {
                label: 'Phân tích người dùng',
                to: '/reports/user-analysis',
                icon: <FaUserFriends />,
              },
            ]}
            onSubMenuToggle={() => handleSubMenuToggle('reports')}
            isOpen={isOpen}
          />
          <NavMenuItem
            label={isOpen || isHovered ? 'Cài đặt hệ thống' : ''} // Hiện text khi hover
            to="/settings"
            icon={<FaCogs />}
            subMenus={[
              {
                label: 'Cài đặt chung',
                to: '/settings/general',
                icon: <FaWrench />,
              },
              {
                label: 'Quản lý vai trò',
                to: '/settings/roles',
                icon: <FaUserShield />,
              },
            ]}
            onSubMenuToggle={() => handleSubMenuToggle('settings')}
            isOpen={isOpen}
          />
        </nav>
      </div>
    </div>
  );
};

export default SidebarMenu;     