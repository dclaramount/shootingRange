import React from 'react';
import {LegendText} from "./LegendText";
import {HonestWeekPicker} from "./HonnestWeekPicker";
import {AdminBookingsContext} from "../Context/AdminBookingsContext";


export function RenderHeader(){
  const {setDaysOfWeek, setSelectedWeek, setISODaysOfWeek} = React.useContext(AdminBookingsContext);

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