import React from 'react';

const DashboardCards = () => {
  const cardsData = [
    {
      title: 'Tổng Đơn Hàng',
      value: '13,647',
      icon: 'solar:cart-5-bold-duotone',
      percentage: '2.3%',
      period: 'Tuần Trước',
      color: 'text-primary',
      arrow: 'up',
    },
    {
      title: 'Lượt Đặt Mới',
      value: '9,526',
      icon: 'bx bx-award',
      percentage: '8.1%',
      period: 'Tháng Trước',
      color: 'text-primary',
      arrow: 'up',
    },
    {
      title: 'Giao Dịch',
      value: '976',
      icon: 'bx bxs-backpack',
      percentage: '-0.3%',
      period: 'Tháng Trước',
      color: 'text-primary',
      arrow: 'down',
    },
    {
      title: 'Doanh Thu Đặt Vé',
      value: '$123.6k',
      icon: 'bx bx-dollar-circle',
      percentage: '-10.6%',
      period: 'Tháng Trước',
      color: 'text-primary',
      arrow: 'down',
    },
  ];

  return (
    <div className="col-xxl-5">
      <div className="row">
        {/* Thẻ Quản Lý Đặt Vé */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {cardsData.map((card, index) => (
            <div className="col-md-6" key={index}>
              <div className="card shadow-sm overflow-hidden bg-white rounded-3xl">
                {' '}
                {/* Thêm rounded-3xl */}
                <div className="card-body px-4 py-3">
                  {' '}
                  {/* Thêm padding bên trong */}
                  <div className="row align-items-center">
                    <div className="col-6">
                      <div className="avatar-md bg-soft-primary rounded-3xl">
                        <iconify-icon
                          icon={card.icon}
                          className={`avatar-title fs-40 ${card.color}`} // Tăng kích thước biểu tượng
                        />
                      </div>
                    </div>
                    <div className="col-6 text-end">
                      <p
                        className="text-muted mb-0 text-truncate"
                        style={{ fontSize: '1.2rem', fontWeight: '600' }}
                      >
                        {card.title}
                      </p>
                      <h3
                        className="text-dark mt-1 mb-0"
                        style={{ fontSize: '2rem', fontWeight: '700' }}
                      >
                        {card.value}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="card-footer py-3 px-4 bg-light bg-opacity-50 rounded-3xl">
                  {' '}
                  {/* Thêm padding và bo góc */}
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <span
                        className={`text-${
                          card.arrow === 'up' ? 'success' : 'danger'
                        }`}
                        style={{ fontSize: '1.1rem', fontWeight: '500' }}
                      >
                        <i className={`bx bxs-${card.arrow}-arrow fs-12`} />
                        {card.percentage}
                      </span>
                      <span
                        className="text-muted ms-1 fs-12"
                        style={{ fontSize: '1rem', fontWeight: '500' }}
                      >
                        {card.period}
                      </span>
                    </div>
                    <a
                      href="#!"
                      className="text-reset fw-semibold fs-12"
                      style={{ fontSize: '1rem', fontWeight: '500' }}
                    >
                      Xem Thêm
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
