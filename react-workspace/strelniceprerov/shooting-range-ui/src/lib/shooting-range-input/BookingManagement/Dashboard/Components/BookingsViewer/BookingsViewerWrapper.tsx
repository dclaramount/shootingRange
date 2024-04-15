import {BookCalendarTable} from './BookCalendarTable';
import React from 'react';
import { ManagementDashboardContext } from '../../../../components/Context/ManagementDashboardContext';
import { DaysColumn } from './DaysColumn';

export function BookingsViewerWrapper(){
const {daysOfWeek, setDaysOfWeek} = React.useContext(ManagementDashboardContext);
 return (
  <div className="reservation-cal">
    <div className="reservation-cal-table">
      <BookCalendarTable />
      <DaysColumn />
    </div>
  </div>
)}