import {BookCalendarTable} from './BookCalendarTable';
import React from 'react';
import { BookingContext } from './Context/BookingContext';
import { DaysColumn } from './DaysColumn';

export function BookingCalendarWrappper(){
const {daysOfWeek, setDaysOfWeek} = React.useContext(BookingContext);
 return (
  <div className="reservation-cal">
    <div className="reservation-cal-table">
      <BookCalendarTable />
      <DaysColumn />
    </div>
  </div>
)}