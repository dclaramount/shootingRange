import React from 'react';
import { ManagementDashboardContext } from '../../../../components/Context/ManagementDashboardContext';

export function TimeColumn(){

  const {timesToShow} = React.useContext(ManagementDashboardContext);
  return(
  <div className="reservation-cal-table-times">
    <div className="reservation-cal-table-times-time">
    </div>
    {timesToShow.map((timeToShow : string) => {
      return(
      <div className="reservation-cal-table-times-time" id={timeToShow}>
          {timeToShow}:00
        </div>)
    })}
  </div>)
}