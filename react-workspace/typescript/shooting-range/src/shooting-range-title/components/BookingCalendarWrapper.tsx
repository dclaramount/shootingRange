import {BookCalendarTable} from './BookCalendarTable';
import React from 'react';
import { DaysColumn } from './DaysColumn';

export function BookingCalendarWrappper(){
 return (
  <div className="reservation-cal" style={{width:'100%'}}>
    <div className="reservation-cal-table">
      <BookCalendarTable />
      <DaysColumn />
    </div>
  </div>
)}