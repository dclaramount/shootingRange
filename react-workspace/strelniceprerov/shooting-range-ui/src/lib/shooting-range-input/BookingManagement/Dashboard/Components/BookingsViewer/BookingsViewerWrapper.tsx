import {BookCalendarTable} from './BookCalendarTable';
import React from 'react';
import { DaysColumn } from './DaysColumn';
import { FormWrapper } from './FormWrapper';

export function BookingsViewerWrapper(){
 return (
  <div className="reservation-cal" style={{marginLeft:'15%'}}>
    <div style={{width:'100%', marginLeft:'auto', marginRight:'auto'}}>
      <FormWrapper />
      <div style={{color:'gray', fontWeight:'lighter', fontSize:'12px'}}>
      {`Table last updated on: ${new Date().toLocaleString()}`}
      </div>
    </div>
    <div className="reservation-cal-table" style={{marginRight:'20%'}}>
      <BookCalendarTable />
      <DaysColumn />
    </div>

  </div>
)}