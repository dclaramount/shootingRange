import { BookingContext } from "./Context/BookingContext";
import { LegendText } from "./LegentText";
import { HonestWeekPicker } from "./WeekPicker";
import React from 'react';




export function RenderHeader(){
  const {daysOfWeek, setDaysOfWeek, selectedWeek, setSelectedWeek} = React.useContext(BookingContext);

  const onChange = (week : any) => {
    setSelectedWeek(week);
    const arrayDaysOfWeek = []
    for (let i=0; i<=6; i++){
      const dt = new Date(week.firstDay);
      dt.setDate(dt.getDate() + i);
      arrayDaysOfWeek.push(`${dt.getDate()}.${dt.getMonth() + 1}`)
    }
    console.log(arrayDaysOfWeek);
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