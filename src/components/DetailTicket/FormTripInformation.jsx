import React from 'react';

const TripInfo = ({ tripDetails }) => {
  const route = tripDetails?.route;
  const vehicle = tripDetails?.vehicle;

  return (
    <div className="lg:w-1/3 md:col-span-8 sm:col-span-10 col-span-24">
      <div className="bg-white p-4 shadow-md rounded">
        <ul className="flex space-x-4 border-b" role="tablist">
          <li role="presentation" className="active">
            <a
              href="#booking"
              aria-controls="home"
              role="tab"
              data-toggle="tab"
              className="text-blue-500 hover:text-blue-700"
            >
              Thông tin chuyến
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div role="tabpanel" className="tab-pane active">
            <div className="overflow-hidden">
              <table className="table-auto w-full mb-0">
                <tbody>
                  <tr>
                    <td className="w-5/12">Tuyến:</td>
                    <td className="w-7/12">
                      {route ? (
                        <>
                          {route.departureLocation}{' '}
                          <i className="fas fa-long-arrow-alt-right mx-2"></i>
                          {route.arrivalLocation}
                        </>
                      ) : (
                        'N/A'
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Ngày khởi hành:</td>
                    <td>
                      <strong className="text-red-500">
                        {tripDetails?.departureTime || 'N/A'}
                      </strong>{' '}
                      <span>{tripDetails?.departureDate || 'N/A'}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Thời gian mua còn lại:</td>
                    <td>
                      <strong className="text-blue-500 countdown_time">
                        {/* Countdown or remaining time calculation here */}
                        15:10:55
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="overflow-hidden mt-4">
              <table className="table-auto w-full mb-0">
                <tbody>
                  <tr>
                    <td className="w-5/12">Phương tiện:</td>
                    <td className="w-7/12">
                      <strong className="text-blue-500">
                        {tripDetails?.vehicleName || 'N/A'}
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Tổng số vé:</td>
                    <td>
                      <strong className="text-blue-500">
                        {tripDetails?.availableSeats || 'N/A'}
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Giá vé:</td>
                    <td>
                      <strong className="text-red-500">
                        {' '}
                        {tripDetails?.ticketPrice || 'N/A'}
                      </strong>{' '}
                      VND
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center">
              <div className="flex-1 text-center">
                <img
                  src="/themes/default/images/food_icon.png"
                  alt="food"
                  className="mx-auto"
                />
                <div className="text-blue-500">Phục vụ ăn</div>
              </div>
              <div className="flex-1 text-right">
                <strong>Miễn phí</strong>
                <span className="ml-2">
                  <span
                    className="inline-block bg-water-icon w-6 h-6"
                    title="Miễn phí Nước uống"
                  ></span>
                  <span
                    className="inline-block bg-towel-icon w-6 h-6"
                    title="Miễn phí Khăn lạnh"
                  ></span>
                  <span
                    className="inline-block bg-wifi-icon w-6 h-6"
                    title="Miễn phí Wifi"
                  ></span>
                  <span
                    className="inline-block bg-tv-icon w-6 h-6"
                    title="Miễn phí xem Tivi"
                  ></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 shadow-md rounded mt-6">
        <ul className="flex space-x-4 border-b" role="tablist">
          <li className="active" role="presentation">
            <a
              href="#booking"
              aria-controls="home"
              role="tab"
              data-toggle="tab"
              className="text-blue-500 hover:text-blue-700"
            >
              Sơ đồ giường nằm
            </a>
          </li>
        </ul>

        <div className="tab-content mt-4">
          <div className="tab-pane active">
            <p className="text-justify">
              - <strong>Dãy A</strong> ở phía sau tài xế, <strong>dãy B</strong>{' '}
              nằm giữa xe, <strong>dãy C</strong> ở phía cửa lên xe.
            </p>
            <p className="text-justify">
              - <strong>Giường</strong> lẻ nằm tầng dưới; giường chẵn nằm tầng
              trên. VD:
              <br />
              &nbsp;&nbsp; + Giường <strong>A2</strong> : tầng 2 đầu xe thuộc
              dãy phía sau tài xế.
              <br />
              &nbsp;&nbsp; + Giường <strong>A3</strong> : tầng dưới hàng thứ 2
              thuộc dãy phía sau tài xế.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripInfo;
