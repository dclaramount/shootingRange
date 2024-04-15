import * as React from 'react';
import { ManagementDashboardContext } from '../components/Context/ManagementDashboardContext';
import { ManagementDashboard } from './Dashboard/ManagementDashboard';
/* Locally Used Constants*/
export function BookingManagementSpace() {
  const {summaryBookingSegments} = React.useContext(ManagementDashboardContext);
  return (
    <div>
      <ManagementDashboard/>
    </div>
  );
}