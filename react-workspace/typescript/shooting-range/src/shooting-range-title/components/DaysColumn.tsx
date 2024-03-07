import React from 'react';
import { BookingContext } from './Context/BookingContext';

export function DaysColumn(){

  const {timesToShow, setTimesToShow, daysOfWeek, setDaysOfWeek, bookings, setBookings, selectedSegment, setSelectedSegment, isoDaysOfWeek} = React.useContext(BookingContext);

  const daysOftheWeek = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'];
  function padWithLeadingZeros(num : any, totalLength: any) {
    return String(num).padStart(totalLength, '0');
  }
  function getOccupancy(day : any, time : any){
    const ltime = `${time}:00`
    const lday = padWithLeadingZeros(parseInt(day.split(".")[0]),2);
    const lmonth = padWithLeadingZeros(parseInt(day.split(".")[1]),2);
    const ldate = `${lmonth}-${lday}`;
    const filtered = bookings.filter((booking : any) => booking.start.includes(ltime) && booking.start.includes(ldate));
    if(filtered.length===1){
      const sum  = parseInt(filtered[0].occupancy);
      const max = parseInt(filtered[0].maxOccupancy);
      return(`${sum}/${max}`);
    }
    else if(filtered.length>1){
      let sum = 0;
      const max = parseInt(filtered[0].maxOccupancy);
      // calculate sum using forEach() method
      filtered.forEach( (booking : any) => {
      sum += parseInt(booking.occupancy);
      })
      return(`${sum}/${max}`);
    }
    else{
      return (`0/3`);
    }
  }
  function status(day : any, time : any){
    const ltime = `${time}:00`
    const lday = padWithLeadingZeros(parseInt(day.split(".")[0]),2);
    const lmonth = padWithLeadingZeros(parseInt(day.split(".")[1]),2);
    const ldate = `${lmonth}-${lday}`;
    const filtered = bookings.filter((booking : any) => booking.start.includes(ltime) && booking.start.includes(ldate));
    if(filtered.length===1){
      const sum = parseInt(filtered[0].occupancy);
      const max = parseInt(filtered[0].maxOccupancy);
      return((sum<max)?'partlyOccupied' : 'occupied');
    }
    else if(filtered.length>1){
      let sum = 0;
      const max = parseInt(filtered[0].maxOccupancy);
      // calculate sum using forEach() method
      filtered.forEach( (booking : any) => {
      sum += parseInt(booking.occupancy);
      })
      return((sum<max)?'partlyOccupied' : 'occupied');
    }
    else{
      return '';
    }
  }
  const handlerClick = (e : any) => {
    console.log(e);
    if(!e.target.className.includes('occupied')){
      setSelectedSegment(e.target.id)
    }
  }
  const selected = (clickedCell : string) => {
    if(selectedSegment === clickedCell){
      return 'active first active last'
    }
  } 
  return(
    <>
      {daysOfWeek.map((day : string, idx : number) => { 
        return(
        <div className="reservation-cal-table-day">
        <div className="reservation-cal-table-day-head">
          <span>
          {daysOftheWeek[idx]}
          </span>
          <br/>
          <strong>
            {day}
          </strong>
        </div>
        {timesToShow.map((timeToShow : string) => {
        return(
        <div className={`reservation-cal-table-day-block ${status(day,timeToShow)} ${selected(`${isoDaysOfWeek[idx+1]} ${timeToShow}:00`)}`} id={`${isoDaysOfWeek[idx+1]} ${timeToShow}:00`} onClick={(e) => handlerClick(e)}>
          {getOccupancy(day,timeToShow)}
        </div>)
      })}
    </div>)})}
  </>
  )
}