import React from 'react';
import { BookingContext } from './Context/BookingContext';

export function DaysColumn(){

  const { timesToShow,                   
          daysOfWeek,                    
          selectedSegment,              
          setSelectedSegment, 
          isoDaysOfWeek,                
          selectedOccupancy,            
          setAvailableSegments,         
          setSelectedBookingDuration,   
          setNotAvailableSegments,
          defaultDuration,              
          summaryBookingSegments, 
          selectedLocation, 
          sumInstBookingSegments, 
          shootingInstructor  } = React.useContext(BookingContext);

  const daysOftheWeek = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'];
  function padWithLeadingZeros(num : any, totalLength: any) {
    return String(num).padStart(totalLength, '0');
  }
  function getOccupancy(day : any, time : any){
    const ltime = `${time}:00`
    const lday = padWithLeadingZeros(parseInt(day.split(".")[0]),2);
    const lmonth = padWithLeadingZeros(parseInt(day.split(".")[1]),2);
    const ldate = `${lmonth}-${lday}`;
    const partialDate = `${ldate} ${ltime}`;
    if(!shootingInstructor){
      const filteredValue = summaryBookingSegments.find((sum:any) => sum.segmentStarts.includes(partialDate) && parseInt(sum.locationId)===parseInt(selectedLocation));
      if (filteredValue){
        return `${filteredValue.occupancyBooked}/${filteredValue.maxOccupancy}`
      }
      else{
        return `0/3`
      }
    }else{
      const filteredValue = sumInstBookingSegments.find((sum:any) => sum.segmentStarts.includes(partialDate));
      if (filteredValue){
        return `${filteredValue.occupancyBooked}/${filteredValue.maxOccupancy}`
      }
    }
  }

  function isAvailable(day : any, time : any){
    const ltime = `${time}:00`
    const lday = padWithLeadingZeros(parseInt(day.split(".")[0]),2);
    const lmonth = padWithLeadingZeros(parseInt(day.split(".")[1]),2);
    const ldate = `${lmonth}-${lday}`;
    const partialDate = `${ldate} ${ltime}`;
    if(!shootingInstructor){
      const filteredValue = summaryBookingSegments.find((sum:any) => sum.segmentStarts.includes(partialDate) && parseInt(sum.locationId)===parseInt(selectedLocation));
      if (filteredValue){
        const left = filteredValue.maxOccupancy - filteredValue.occupancyBooked;
        return (left>=parseInt(selectedOccupancy))
      }
      else{
        return false
      }
    }else{ //If Shooting Instructor is Selected
      const filteredValue = sumInstBookingSegments.find((sum:any) => sum.segmentStarts.includes(partialDate));
      if (filteredValue){
        const left = filteredValue.maxOccupancy - filteredValue.occupancyBooked;
          return (left>=parseInt(selectedOccupancy))
      }
      else{
        return false
      }
    }
  }
  /*--------------- Function to Color the Cells of the booking calendar -------------------------------*/
  function status(day : any, time : any){
    const ltime = `${time}:00`
    const lday = padWithLeadingZeros(parseInt(day.split(".")[0]),2);
    const lmonth = padWithLeadingZeros(parseInt(day.split(".")[1]),2);
    const ldate = `${lmonth}-${lday}`;
    const partialDate = `${ldate} ${ltime}`;

    if(!shootingInstructor){
      const filteredValue = summaryBookingSegments.find((sum:any) => sum.segmentStarts.includes(partialDate) && parseInt(sum.locationId)===parseInt(selectedLocation));
      if (filteredValue){
        const left = filteredValue.maxOccupancy - filteredValue.occupancyBooked;
        return (left >= parseInt(selectedOccupancy)) ? 'partlyOccupied' : 'occupied'
      }
      else{
        return ``
      }
    }else{
      const filteredValue = sumInstBookingSegments.find((sum:any) => sum.segmentStarts.includes(partialDate));
      if (filteredValue){
        if (parseInt(filteredValue.occupancyBooked) === 0){
          if(parseInt(selectedOccupancy)===1){
            return ''
          }else{
            return (filteredValue.maxOccupancy >= parseInt(selectedOccupancy)) ? 'partlyOccupied' : 'occupied';
          }
        }else{
          const left = filteredValue.maxOccupancy - filteredValue.occupancyBooked;
          return (left >= parseInt(selectedOccupancy)) ? 'partlyOccupied' : 'occupied';
        }
      }
      else{
        return 'occupied'
      }
    }
  }
  const handlerClick = (e : any) => {
    if(!e.target.className.includes('occupied')){
      const array = [];
      array.push(e.target.id)
      setSelectedSegment(array);
      setSelectedBookingDuration(defaultDuration);
    }
  }
  const selected = (clickedCell : string) => {
    if(selectedSegment.includes(clickedCell)){
      if(selectedSegment.length===1){
        return 'active first active last'
      }
      if(selectedSegment.indexOf(clickedCell)===0){
        return 'active first'
      }
      else if(selectedSegment.indexOf(clickedCell)===selectedSegment.length-1){
        return 'active last'
      }
      else{
        return 'active'
      }
    }
  } 

  //BUILDING CONTROL ARRAY
  React.useEffect(() =>{    
  const available : any[]    = []
  const notAvailable : any[] = []
  daysOfWeek.map((day : any, idx : number)=>{
    timesToShow.map((time:any) => {
      if(isAvailable(day, time)){
        available.push(`${isoDaysOfWeek[idx+1]} ${time}:00`);
      }
      else{
        notAvailable.push(`${isoDaysOfWeek[idx+1]} ${time}:00`);
      }
    })
  })
  setAvailableSegments(available);
  setNotAvailableSegments(notAvailable);
  },[selectedOccupancy])

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