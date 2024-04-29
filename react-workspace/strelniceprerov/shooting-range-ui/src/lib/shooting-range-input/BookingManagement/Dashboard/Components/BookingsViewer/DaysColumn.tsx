import React from 'react';
import {format } from 'date-fns';
import { ManagementDashboardContext } from '../../../../components/Context/ManagementDashboardContext';

function bookedOccupancy(summaryBookings : any, day : any, daysOfWeek:any, isoDaysOfWeek : any, time : any, selectedServiceId: any, locationList:any){
  const idx = daysOfWeek.indexOf(day); 
  const currentDayToAnalyze = new Date(`${isoDaysOfWeek[idx]} ${time}`);
  const formatedCurrentSegmentToAnalyze = format(currentDayToAnalyze, 'yyyy-MM-dd HH:mm:ss');
  const bookingsForTheSegment = summaryBookings.length>0 ?  summaryBookings.filter((sb : any) => (sb.segmentStarts===formatedCurrentSegmentToAnalyze) && (parseInt(sb.serviceId)===parseInt(selectedServiceId))) : [];
  let sum = 0;
  for (let i = 0; i < bookingsForTheSegment.length; i++) {
    sum = sum + parseInt(bookingsForTheSegment[i].occupancyBooked);
  }
  return bookingsForTheSegment.length>0 ? sum : ''
}
export function DaysColumn(){

  const { //locationList, 
          timesToShow,                   
          daysOfWeek,                    
          selectedSegment,              
          setSelectedSegment, 
          isoDaysOfWeek,           
          allInvoices,   
          summaryBookingSegments,
          locationList,                   
          selectedLocation 
        } 
          = React.useContext(ManagementDashboardContext);

  const daysOftheWeek = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'];
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                      Function to Handle the Click on the Cell                                                                               */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const handlerClick = (e : any) => {
  if(!e.target.className.includes('occupied')){
    const array = [];
    if(e.target.childNodes[0]){
      array.push(e.target.id)
      setSelectedSegment(array);
    }
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
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                  Function Display the Occupancy Accordingly                                                                                 */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                   Function that helps catalog a segment as available or unavailable (based on bookings done)                                                */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/



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
        <div className={`reservation-cal-table-day-block ${selected(`${isoDaysOfWeek[idx]} ${timeToShow}:00`)}`} id={`${isoDaysOfWeek[idx]} ${timeToShow}:00`} onClick={(e) => handlerClick(e)}>
          {bookedOccupancy(summaryBookingSegments, day, daysOfWeek, isoDaysOfWeek, `${timeToShow}:00`, parseInt(selectedLocation), locationList)}
        </div>)
      })}
    </div>)})}
  </>
  )
}