import React from 'react';
import TableTrip from './TableTrip';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../Breadcrumb/Breadcrumb';
import { FaCog, FaPlus } from 'react-icons/fa'; // Import icons from react-icons

const breadcrumbItems = [
  {
    label: 'Quản lý đặt vé',
    link: '/dashboard/trip/list',
    className: 'text-3xl ',
  },
  { label: 'Thêm đặt vé', className: 'text-3xl font-bold' },
];

const ContentAdd = ({ bookings, totalResults }) => {
  return (
    <div className="content-trip">
      <div className="card bg-light-subtle bg-white shadow-md p-5">
        <div className="card-header border-0">
          <div className="flex justify-between items-center">
            <div className="w-full lg:w-1/2">
              <Breadcrumb items={breadcrumbItems} />
              <p className="mb-0 text-2xl">
                Hiển thị{' '}
                <span className="text-red-500 font-semibold">
                  {totalResults}
                </span>{' '}
                kết quả
              </p>
            </div>
            <div className="w-full lg:w-1/2 mt-3 lg:mt-0 flex justify-end">
              <button
                type="button"
                className="text-xl btn btn-outline-secondary me-1 flex items-center text-blue-500 hover:text-blue-600 p-2 m-2 bg-blue-100 hover:bg-blue-200 rounded-xl"
              >
                More Setting <FaCog className="ms-2" /> {/* Icon after text */}
              </button>
            </div>
          </div>
        </div>
      </div>
      {bookings && bookings.length > 0 ? (
        <TableTrip bookings={bookings} />
      ) : (
        <p>Không có xe nào.</p>
      )}
    </div>
  );
};

export default ContentAdd;
