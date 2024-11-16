import React from 'react';
import DefaultComponent from '../../components/DefaultComponent/DefaultComponent';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import StepProgress from '../../components/StepProgress/StepProgress';
import BookingForm from '../../components/FindTicketComponent/BookingForm';
import TableTrip from '../../components/FindTicketComponent/TableTrip';

const BuyTicketPage = () => {
  const breadcrumbItems = [
    { label: 'Trang nhất', link: '/', className: 'text-2xl' },
    { label: 'Mua vé online', link: '/muave', className: 'text-2xl' },
    { label: 'Chọn chuyến', className: 'text-2xl' },
  ];

  return (
    <DefaultComponent>
      <div className="mx-20 flex flex-col">
        <Breadcrumb items={breadcrumbItems} />
        <StepProgress currentStep={0} />
        <div className="flex justify-between mx-10 w-full">
          {' '}
          <div className="flex-grow pr-4">
            {' '}
            <TableTrip />
          </div>
          <div className="flex-grow pl-4">
            {' '}
            <BookingForm />
          </div>
        </div>
      </div>
    </DefaultComponent>
  );
};

export default BuyTicketPage;
