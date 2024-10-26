import React from 'react';

const TicketInfo = () => {
  return (
    <div className="min-h-[100px] p-4 border border-gray-300 rounded-lg">
      <p className="text-center text-blue-600 uppercase font-bold">
        Thông tin vé
      </p>

      <table className="table-auto w-full mt-4">
        <tbody>
          <tr>
            <td className="w-1/3">Tuyến:</td>
            <td className="w-2/3">Quảng Ngãi - Bx.An Sương</td>
          </tr>
          <tr>
            <td>Ngày khởi hành:</td>
            <td>
              <strong className="text-red-600">14:00</strong>{' '}
              <span>24/10/2024</span>
            </td>
          </tr>
          <tr>
            <td>Giường/Ghế:</td>
            <td>
              <strong className="text-blue-600">B4</strong>
            </td>
          </tr>
          <tr>
            <td>Điểm lên xe:</td>
            <td>Bx.Chín Nghĩa</td>
          </tr>
          <tr>
            <td>Họ và tên:</td>
            <td>dsfasdfasd</td>
          </tr>
          <tr>
            <td>Số điện thoại:</td>
            <td>0966782508</td>
          </tr>
          <tr>
            <td>Tổng tiền vé:</td>
            <td>
              <strong className="text-red-600">455.000</strong> VND
            </td>
          </tr>
          <tr>
            <td>Mã giảm giá:</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TicketInfo;
