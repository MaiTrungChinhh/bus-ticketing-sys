import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts'; // Import CanvasJSReact
import { getCountRevenue } from '../../../../services/statistic'; // Thay thế với hàm getCountRevenue

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const CountRevenue = () => {
  const [dataPoints, setDataPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('route'); // Mặc định là 'route'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCountRevenue(selectedType);

        // Kiểm tra dữ liệu trả về
        if (response && response[0]) {
          const data = response[0]; // Lấy dữ liệu mảng đầu tiên từ API

          // Format lại dữ liệu để phù hợp với thư viện vẽ biểu đồ
          const formattedData = data.map((item) => ({
            label: item.x, // Giá trị x (ví dụ: ngày hoặc tuyến)
            y: item.y, // Giá trị y (doanh thu)
          }));

          setDataPoints(formattedData);
        } else {
          setError('Dữ liệu từ API không hợp lệ');
        }
        setLoading(false);
      } catch (err) {
        console.error('Lỗi khi gọi API:', err);
        setError('Không thể tải dữ liệu từ API');
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedType]); // Cập nhật khi selectedType thay đổi

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  const options = {
    animationEnabled: true,
    title: {
      text: 'Thống kê doanh thu',
    },
    data: [
      {
        type: 'line',
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <div className="flex justify-center p-5 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Sidebar */}
      <div className="w-1/6 p-4 bg-gray-100 rounded-l-lg">
        <h2 className="text-xl font-semibold text-center mb-6">Thống kê</h2>

        {/* Dropdown để chọn loại thống kê */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="route">Theo tuyến</option>
          <option value="day">Theo ngày</option>
          <option value="month">Theo tháng</option>
          <option value="year">Theo năm</option>
        </select>
      </div>

      {/* Chart */}
      <div className="w-3/4 p-4">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Biểu đồ thống kê doanh thu
        </h1>

        {/* Biểu đồ */}
        <div className="flex justify-center">
          <CanvasJSChart options={options} />
        </div>
      </div>
    </div>
  );
};

export default CountRevenue;
