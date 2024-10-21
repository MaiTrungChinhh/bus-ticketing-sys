import React from 'react';
import DefaultComponent from '../../components/DefaultComponent/DefaultComponent';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import StepProgress from '../../components/StepProgress/StepProgress';
import FormTicketInformation from '../../components/DetailTicket/FormTicketInfor';
import ChooseChair from '../../components/DetailTicket/ChooseChair';

const BuyTicketDetailPage = () => {
  const breadcrumbItems = [
    { label: 'Trang nhất', link: '/' },
    { label: 'Mua vé online', link: '/muave' },
    { label: 'Chọn chuyến' },
  ];

  return (
    <DefaultComponent>
      <div className="mx-20 flex flex-col">
        <Breadcrumb items={breadcrumbItems} />
        <StepProgress currentStep={1} />
        <FormTicketInformation />
        <ChooseChair vehicleId="1" />
      </div>
    </DefaultComponent>
  );
};

export default BuyTicketDetailPage;
