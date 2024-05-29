import { BookingContext } from "./Context/BookingContext";
import { LegendText } from "./LegentText";
import { HonestWeekPicker } from "./WeekPicker";
import React from 'react';
import axios from 'axios';
export function RenderHeader(){
  const {daysOfWeek, setDaysOfWeek, selectedWeek, setSelectedWeek, selectedLocation, setSelectedLocation, bookings, setBookings, setISODaysOfWeek} = React.useContext(BookingContext);

  const onChange = (week : any) => {
    setSelectedWeek(week);
    const arrayDaysOfWeek = []
    const isoDaysOfWeek = []
    for (let i=0; i<=7; i++){
      const dt = new Date(week.firstDay);
      dt.setDate(dt.getDate() + i);
      if(i>=1){
      isoDaysOfWeek.push(dt.toISOString().split('T')[0]);
      }
      if(i<7){
        arrayDaysOfWeek.push(`${dt.getDate()}.${dt.getMonth() + 1}`);
      }    }
    setISODaysOfWeek(isoDaysOfWeek);
    setDaysOfWeek(arrayDaysOfWeek);
  };

  
  return(
    <>
    <div className="reservation-date">
      <label>Datum</label>
      <HonestWeekPicker onChange={onChange}/>
    </div>
    <LegendText/>
    </>
  )
}