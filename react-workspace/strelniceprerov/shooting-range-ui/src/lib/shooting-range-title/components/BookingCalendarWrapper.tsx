import {BookCalendarTable} from './BookCalendarTable';
import React from 'react';
import { BookingContext } from './Context/BookingContext';
import { DaysColumn } from './DaysColumn';

export function BookingCalendarWrappper(){
const {daysOfWeek, setDaysOfWeek, isNormalComputer} = React.useContext(BookingContext);
 return (
  <div className="reservation-cal" style={style.container(isNormalComputer)}>
    <div className="reservation-cal-table">
      <BookCalendarTable />
      <DaysColumn />
    </div>
  </div>
)}

const style = {
  container: (isNormalComputer: boolean)  => ({
   width: '100%',
   overflowX: isNormalComputer ? 'unset' : 'scroll' as React.CSSProperties["overflowX"] 
  })
};