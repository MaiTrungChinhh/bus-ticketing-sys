import React, { useState } from 'react';
import NavMenuItem from './NavMenuItem';
import {
  FaTachometerAlt,
  FaUsers,
  FaTicketAlt,
  FaBus,
  FaChartLine,
  FaCogs,
  FaList,
  FaPlus,
  FaHistory,
  FaEdit,
  FaFileAlt,
  FaUserFriends,
  FaWrench,
  FaUserShield,
} from 'react-icons/fa';

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(true); // Trạng thái mở/đóng sidebar
  const [isHovered, setIsHovered] = useState(false); // Trạng thái hover
  const [openMenuId, setOpenMenuId] = useState(null); // Trạng thái menu mở

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

  return (
    <div
      className={`flex sidebar transition-all duration-500 ease-in-out ${
        isOpen || isHovered ? 'w-96 opacity-100' : 'w-24 opacity-75'
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
              className={`text-2xl font-bold transition-opacity duration-500 ${
                isOpen || isHovered ? 'block opacity-100' : 'hidden opacity-0'
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
          <NavMenuItem
            label={isOpen || isHovered ? 'Dashboard' : ''} // Hiện text khi hover
            to="/dashboard"
            icon={<FaTachometerAlt />}
            onSubMenuToggle={() => handleSubMenuToggle('dashboard')}
            isOpen={isOpen}
          />
          <NavMenuItem
            label={isOpen || isHovered ? 'Quản lý người dùng' : ''} // Hiện text khi hover
            to="/users"
            icon={<FaUsers />}
            subMenus={[
              {
                label: 'Danh sách người dùng',
                to: '/dashboard/users/list',
                icon: <FaList />,
              },
              { label: 'Thêm người dùng', to: '/users/add', icon: <FaPlus /> },
            ]}
            onSubMenuToggle={() => handleSubMenuToggle('users')}
            isOpen={isOpen}
          />
          <NavMenuItem
            label={isOpen || isHovered ? 'Quản lý đặt vé' : ''} // Hiện text khi hover
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
          <NavMenuItem
            label={isOpen || isHovered ? 'Quản lý xe' : ''} // Hiện text khi hover
            to="/vehicles"
            icon={<FaBus />}
            subMenus={[
              { label: 'Danh sách xe', to: '/dashboard/vehicles/list', icon: <FaList /> },
              { label: 'Thêm xe', to: '/dashboard/vehicles/add', icon: <FaPlus /> },
              {
                label: 'Cập nhật thông tin xe',
                to: '/dashboard/vehicles/update',
                icon: <FaEdit />,
              },
            ]}
            onSubMenuToggle={() => handleSubMenuToggle('vehicles')}
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
