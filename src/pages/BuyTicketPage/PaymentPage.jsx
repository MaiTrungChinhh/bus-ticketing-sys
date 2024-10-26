import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const hoten = params.get('hoten');
  const dienthoai = params.get('dienthoai');
  const email = params.get('email');
  const kieudon = params.get('kieudon');
  const magiamgia = params.get('magiamgia');

  return (
    <div>
      <h1>Thông tin thanh toán</h1>
      <p>Họ và tên: {hoten}</p>
      <p>Số điện thoại: {dienthoai}</p>
      <p>Email: {email}</p>
      <p>Điểm lên xe: {kieudon}</p>
      <p>Mã giảm giá: {magiamgia}</p>
    </div>
  );
};

export default PaymentPage;
