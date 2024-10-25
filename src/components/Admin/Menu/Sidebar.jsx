import React from 'react';
import NavMenuItem from './NavMenuItem';

const SidebarMenu = () => {
  return (
    <div className="w-16 bg-gray-800 p-1">
      <div className="h-screen bg-gray-800 text-white overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <nav className="flex flex-col p-2">
          <NavMenuItem label="Dashboard" to="/dashboard" />
          <NavMenuItem
            label="Quản lý người dùng"
            to="/users"
            subMenus={[
              { label: 'Danh sách người dùng', to: '/users/list' },
              { label: 'Thêm người dùng', to: '/users/add' },
            ]}
          />
          <NavMenuItem
            label="Quản lý đặt vé"
            to="/bookings"
            subMenus={[
              { label: 'Danh sách đặt vé', to: '/bookings/list' },
              { label: 'Thêm đặt vé', to: '/bookings/add' },
              { label: 'Lịch sử đặt vé', to: '/bookings/history' },
            ]}
          />
          <NavMenuItem
            label="Quản lý chuyến xe"
            to="/bus-schedule"
            subMenus={[
              { label: 'Danh sách chuyến xe', to: '/bus-schedule/list' },
              { label: 'Thêm chuyến xe', to: '/bus-schedule/add' },
              { label: 'Cập nhật chuyến xe', to: '/bus-schedule/update' },
            ]}
          />
          <NavMenuItem
            label="Quản lý xe"
            to="/vehicles"
            subMenus={[
              { label: 'Danh sách xe', to: '/vehicles/list' },
              { label: 'Thêm xe', to: '/vehicles/add' },
              { label: 'Cập nhật thông tin xe', to: '/vehicles/update' },
            ]}
          />
          <NavMenuItem
            label="Báo cáo & Phân tích"
            to="/reports"
            subMenus={[
              { label: 'Báo cáo doanh thu', to: '/reports/revenue' },
              { label: 'Phân tích người dùng', to: '/reports/user-analysis' },
            ]}
          />
          <NavMenuItem
            label="Cài đặt hệ thống"
            to="/settings"
            subMenus={[
              { label: 'Cài đặt chung', to: '/settings/general' },
              { label: 'Quản lý vai trò', to: '/settings/roles' },
            ]}
          />
        </nav>
      </div>
    </div>
  );
};

export default SidebarMenu;
