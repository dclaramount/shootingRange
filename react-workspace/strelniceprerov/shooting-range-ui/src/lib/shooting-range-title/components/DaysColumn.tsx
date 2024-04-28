import React from 'react';
import { BookingContext } from './Context/BookingContext';
import {format } from 'date-fns';
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                              CONSTANTS                                                                                                      */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const BLOCKED_CELL = 'occupied';
const EMPTY_OCCUPANCY = '';
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                            HELPER FUNCTIONS                                                                                                 */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                         Function to check if the current day being examined is in the past                                                                  */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function isDayInThePast(day : any, daysOfWeek: any, isoDaysOfWeek: any){
  const idx = daysOfWeek.indexOf(day) + 1; 
  if(idx > 0){
    const currentDayToAnalyze = new Date(isoDaysOfWeek[idx]);
    const today = new Date();
    return today>currentDayToAnalyze;
  }
  return false;
}
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*      Function to check if the location of the service selected (for the given segment) is already occupied for the segment in question (E.g. Streliste B and C)             */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function isLocationBookedInDifferentService(summaryBookings : any, day : any, daysOfWeek:any, isoDaysOfWeek : any, time : any, selectedServiceId: any, locationList:any, shootingInstructorSelected : boolean){
  const idx = daysOfWeek.indexOf(day) + 1; 
  const instructor = shootingInstructorSelected ? 1 : 0;
  const currentDayToAnalyze = new Date(`${isoDaysOfWeek[idx]} ${time}`);
  const formatedCurrentSegmentToAnalyze = format(currentDayToAnalyze, 'yyyy-MM-d HH:mm:ss');
  const locationOfSelectedService = locationList.find((ll:any) => parseInt(ll.id)===parseInt(selectedServiceId));
  const bookingsForTheSegment = summaryBookings.filter((sb : any) => sb.segmentStarts===formatedCurrentSegmentToAnalyze && parseInt(sb.locationId)===parseInt(locationOfSelectedService.locationId) && (parseInt(sb.instructoresBooked) >= instructor));
  if(bookingsForTheSegment.length===0){
    //There are no bookings in ANY service for this segment (hence false).
    return false;
  }
  else{
    //Verifies if there is any booking for the given segment from ANOTHER service (this will block this segment for the current service.)
    const atLeastOneForSameLocation = bookingsForTheSegment.filter((bfts : any) => parseInt(bfts.locationId)===parseInt(locationOfSelectedService.locationId) && parseInt(bfts.serviceId)!==parseInt(locationOfSelectedService.id));
    return atLeastOneForSameLocation.length>0;
  }
}
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                              Based on Occupancy (for the given service) determine if is Occupied, Partly Occupied or Available                                              */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function calculateOccupancy(summaryBookings : any, summaryBookingInstructor: any, shootingInstructorSelected : boolean, day : any, daysOfWeek:any, isoDaysOfWeek : any, time : any, selectedServiceId: any, selectedOccupancy:any, locationList:any){
  const idx = daysOfWeek.indexOf(day) + 1; 
  const currentDayToAnalyze = new Date(`${isoDaysOfWeek[idx]} ${time}`);
  const formatedCurrentSegmentToAnalyze = format(currentDayToAnalyze, 'yyyy-MM-dd HH:mm:ss');
  const filteredValue = shootingInstructorSelected ? summaryBookingInstructor.find((sum:any) => sum.segmentStarts.includes(formatedCurrentSegmentToAnalyze)) : 
    summaryBookings.find((sum:any) => sum.segmentStarts.includes(formatedCurrentSegmentToAnalyze) && parseInt(sum.serviceId)===parseInt(selectedServiceId));
  if (filteredValue){
    return `${filteredValue.occupancyBooked}/${filteredValue.maxOccupancy}`;
  }
  else{
    if (shootingInstructorSelected){
      const filteredValue = summaryBookingInstructor.find((sum:any) => sum.segmentStarts.includes(formatedCurrentSegmentToAnalyze));
      if (filteredValue){
        return `${filteredValue.occupancyBooked}/${filteredValue.maxOccupancy}`
      }
    } else{
      return `0/${locationList.find((ll:any) => parseInt(ll.id)===parseInt(selectedServiceId)).capacity}`;
    }

  }
}
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                              Based on Occupancy (for the given service) determine if is Occupied, Partly Occupied or Available                                              */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function getOccupancyStatus(summaryBookings : any, summaryBookingInstructor: any, shootingInstructorSelected : boolean, day : any, daysOfWeek:any, isoDaysOfWeek : any, time : any, selectedServiceId: any, selectedOccupancy:any){
  const idx = daysOfWeek.indexOf(day) + 1; 
  const currentDayToAnalyze = new Date(`${isoDaysOfWeek[idx]} ${time}`);
  const formatedCurrentSegmentToAnalyze = format(currentDayToAnalyze, 'yyyy-MM-dd HH:mm:ss');
  const filteredValue = shootingInstructorSelected ? summaryBookingInstructor.find((sum:any) => sum.segmentStarts.includes(formatedCurrentSegmentToAnalyze)) : 
    summaryBookings.find((sum:any) => sum.segmentStarts.includes(formatedCurrentSegmentToAnalyze) && parseInt(sum.serviceId)===parseInt(selectedServiceId));
  if (filteredValue){
    //If there is a filtered value it means there are bookings done for this time segment for this service.
    const left = parseInt(filteredValue.maxOccupancy) - parseInt(filteredValue.occupancyBooked);
    if(shootingInstructorSelected && parseInt(filteredValue.occupancyBooked)===0){return ''} //Special case to color the segment for the instructor booking calendar
    else {return (left >= parseInt(selectedOccupancy)) ? 'partlyOccupied' : 'occupied'}
  }
  else{
    //If there is no filtered value it means there are not bookings done for this time segment hence the css class is empty.
    return shootingInstructorSelected ? `occupied` : ``;
  }
}

export function DaysColumn(){

  const { locationList, 
    timesToShow,                   
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
          shootingInstructor,
          selectedWeek  } = React.useContext(BookingContext);

  const daysOftheWeek = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'];
  function padWithLeadingZeros(num : any, totalLength: any) {
    return String(num).padStart(totalLength, '0');
  }
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                  Function Display the Occupancy Accordingly                                                                                 */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  function getOccupancy(day : any, time : any){
    const ltime = `${time}:00`
    const lday = padWithLeadingZeros(parseInt(day.split(".")[0]),2);
    const lmonth = padWithLeadingZeros(parseInt(day.split(".")[1]),2);
    const ldate = `${lmonth}-${lday}`;
    const partialDate = `${ldate} ${ltime}`;
    //1st Verification Check if the day is in the past and disable the cell
    if (isDayInThePast(day, daysOfWeek, isoDaysOfWeek)){
        return EMPTY_OCCUPANCY;
    }
    //2nd Verification if there is another booking for the same segment that is already using the same location
    else if (isLocationBookedInDifferentService(summaryBookingSegments, day, daysOfWeek, isoDaysOfWeek, ltime, selectedLocation, locationList, shootingInstructor)){
        return EMPTY_OCCUPANCY;
    }
    else {
      return (calculateOccupancy(summaryBookingSegments, sumInstBookingSegments, shootingInstructor, day, daysOfWeek, isoDaysOfWeek, ltime, selectedLocation, selectedOccupancy, locationList))
    }
  }
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                   Function that helps catalog a segment as available or unavailable (based on bookings done)                                                */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  function isTimeSegmentAvailable(timeSegment : string){
    const filteredValue = shootingInstructor ? sumInstBookingSegments.find((sum:any) => sum.segmentStarts.includes(timeSegment)) : 
      summaryBookingSegments.find((sum:any) => sum.segmentStarts.includes(timeSegment) && parseInt(sum.serviceId)===parseInt(selectedLocation));
    if(filteredValue){
      return (parseInt(filteredValue.occupancyBooked) < parseInt(filteredValue.maxOccupancy))
    }
    else if(typeof filteredValue === 'undefined' && shootingInstructor){
      return false
    }
    else{
      return true;
    }
  }
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                   Function to Color the Cells of the booking calendar and activate/deactivate them                                                          */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  function status(day : any, time : any){
    const ltime = `${time}:00`

    //1st Verification Check if the day is in the past and disable the cell
    if (isDayInThePast(day, daysOfWeek, isoDaysOfWeek)){
      return BLOCKED_CELL;
    }
    //2nd Verification if there is another booking for the same segment that is already using the same location
    else if (isLocationBookedInDifferentService(summaryBookingSegments, day, daysOfWeek, isoDaysOfWeek, ltime, selectedLocation, locationList, shootingInstructor)){
      return BLOCKED_CELL;
    }
    else{
      return getOccupancyStatus(summaryBookingSegments, sumInstBookingSegments, shootingInstructor, day, daysOfWeek, isoDaysOfWeek, ltime, selectedLocation, selectedOccupancy);
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
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                   Use Effect Function that renders our arrays of available and NOT available times                                                          */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  React.useEffect(() =>{    
  const available : any[]    = []
  const notAvailable : any[] = []
  daysOfWeek.map((day : any, idx : number)=>{
    timesToShow.map((time:any) => {
      const segmentToAnalyze = new Date(`${isoDaysOfWeek[idx+1]} ${time}:00`);
      if(isTimeSegmentAvailable(format(segmentToAnalyze, 'yyyy-MM-dd HH:mm:ss'))){
        available.push(`${isoDaysOfWeek[idx+1]} ${time}:00`);
      }
      else{
        notAvailable.push(`${isoDaysOfWeek[idx+1]} ${time}:00`);
      }
    })
  })
  },[selectedLocation, selectedWeek, shootingInstructor])

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