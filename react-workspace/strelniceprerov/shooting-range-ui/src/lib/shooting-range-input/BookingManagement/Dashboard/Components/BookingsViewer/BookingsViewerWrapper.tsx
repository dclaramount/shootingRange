import {BookCalendarTable} from './BookCalendarTable';
import React from 'react';
import { DaysColumn } from './DaysColumn';
import { FormWrapper } from './FormWrapper';
import { ManagementDashboardContext } from '../../../../components/Context/ManagementDashboardContext';

export function BookingsViewerWrapper(){
  const [lastRefreshTime, setLastRefreshTime] = React.useState(new Date().toLocaleString());
  const {selectedLocation} = React.useContext(ManagementDashboardContext);

  React.useEffect(() =>{    
    console.log("REQUEST TO REFREHS");
    setLastRefreshTime(new Date().toLocaleString())
  },[selectedLocation])

 return (
  <div className="reservation-cal" style={{marginLeft:'15%'}}>
    <div style={{width:'100%', marginLeft:'auto', marginRight:'auto'}}>
      <FormWrapper />
      <div style={{color:'gray', fontWeight:'lighter', fontSize:'12px', textAlign:'center'}}>
      {`Table last updated on: ${lastRefreshTime}`}
      </div>
    </div>
    <div className="reservation-cal-table" style={{marginRight:'20%'}}>
      <BookCalendarTable />
      <DaysColumn />
    </div>

  </div>
)}