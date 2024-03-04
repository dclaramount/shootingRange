import React from 'react';
import { BookingContext } from './Context/BookingContext';

export function DaysColumn(){

  const {timesToShow, setTimesToShow, daysOfWeek, setDaysOfWeek} = React.useContext(BookingContext);
  

  return(
    <>
      {daysOfWeek.map((day) => { 
        return(
        <div className="reservation-cal-table-day">
        <div className="reservation-cal-table-day-head">
          {day}
        </div>
        {timesToShow.map((timeToShow : string) => {
        return(
        <div className="reservation-cal-table-day-block " id={timeToShow}>
        </div>)
      })}
    </div>)})}
  </>
  )
}