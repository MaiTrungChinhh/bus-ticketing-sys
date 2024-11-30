import React from 'react';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import TicketsSold from '../../../components/Admin/ComponentPage/Statistic/TicketsStatisticsByDay';
import DashboardCards from '../../../components/Admin/ComponentPage/Statistic/DashboardCards';
import CountRevenue from '../../../components/Admin/ComponentPage/Statistic/CountRevenue';

const DashboardPage = () => {
  return (
    <DefaultComponent title="Dashboard">
      <DashboardCards />
      <div className="flex justify-between gap-6 mt-6">
        <div className="w-1/2">
          <TicketsSold />
        </div>
        <div className="w-1/2">
          <CountRevenue />
        </div>
      </div>
    </DefaultComponent>
  );
};

export default DashboardPage;
