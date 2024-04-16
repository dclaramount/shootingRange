import {BookCalendarTable} from './BookCalendarTable';
import React from 'react';
import { DaysColumn } from './DaysColumn';
import { FormWrapper } from './FormWrapper';

export function BookingsViewerWrapper(){
 return (
  <div className="reservation-cal" style={{marginLeft:'15%'}}>
    <div style={{width:'100%', marginLeft:'auto', marginRight:'auto'}}>
      <FormWrapper />
    </div>
    <div className="reservation-cal-table" style={{}}>
      <BookCalendarTable />
      <DaysColumn />
    </div>
  </div>
)}