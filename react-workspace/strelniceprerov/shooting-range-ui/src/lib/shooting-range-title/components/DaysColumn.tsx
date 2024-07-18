import React from 'react';
import { BookingContext } from './Context/BookingContext';
import {format } from 'date-fns';
import { Translations } from '../types/translations';
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                              CONSTANTS                                                                                                      */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const BLOCKED_CELL = 'occupied';
const EMPTY_OCCUPANCY = '';
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                            HELPER FUNCTIONS                                                                                                 */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                        Function the reason for blocked segment                                                                              */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function getBlockedReason(day : any, daysOfWeek: any, isoDaysOfWeek: any, hour:any, blockedSegments:any, selectedServiceId: any, locationList:any){
  const idx = daysOfWeek.indexOf(day); 
  if(idx >= 0){
    //const currentDayToAnalyze = new Date(isoDaysOfWeek[idx]);
    const dateObject = new Date(isoDaysOfWeek[idx]);
    const currentDayToAnalyze = new Date(Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate(), hour-2,0,0,0))
    const locationOfSelectedService = locationList.find((ll:any) => parseInt(ll.id)===parseInt(selectedServiceId));
    const _locationId = parseInt(locationOfSelectedService.locationId);
    const fBlockedSegment = blockedSegments.find((seg:any) => new Date(seg.startTime).toISOString()===new Date(currentDayToAnalyze).toISOString() && seg.locationId===_locationId);
    return (
              <div style={{margin:'auto'}}>
                {fBlockedSegment.name.substring(0,6)}
              </div>
            );
  }
  return EMPTY_OCCUPANCY;
}
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                        Function to Check if segment is Blocked                                                                               */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function isSegmentBlocked(day : any, daysOfWeek: any, isoDaysOfWeek: any, hour:any, blockedSegments:any, selectedServiceId: any, locationList:any){
  const idx = daysOfWeek.indexOf(day); 
  if(idx >= 0){
    //const currentDayToAnalyze = new Date(isoDaysOfWeek[idx]);
    const dateObject = new Date(isoDaysOfWeek[idx]);
    const currentDayToAnalyze = new Date(Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate(), hour-2,0,0,0))
    const locationOfSelectedService = locationList.find((ll:any) => parseInt(ll.id)===parseInt(selectedServiceId));
    const _locationId = parseInt(locationOfSelectedService.locationId);
    const fBlockedSegment = blockedSegments.filter((seg:any) => new Date(seg.startTime).toISOString()===new Date(currentDayToAnalyze).toISOString() && seg.locationId===_locationId);
    return fBlockedSegment.length >0;
  }
  return false;
}
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                         Function to check if the current day being examined is in the past                                                                  */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function isDayInThePast(day : any, daysOfWeek: any, isoDaysOfWeek: any, hour:any){
  const idx = daysOfWeek.indexOf(day); 
  if(idx >= 0){
    const dateObject = new Date(isoDaysOfWeek[idx]);
    const currentDayToAnalyze = new Date(Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate(), hour-2,0,0,0))
    //const currentDayToAnalyze = new Date(isoDaysOfWeek[idx]);
    //currentDayToAnalyze.setHours(hour);
    const todayDateObject = new Date();
    const today = new Date(Date.UTC(todayDateObject.getFullYear(), todayDateObject.getMonth(), todayDateObject.getDate(), todayDateObject.getHours()+todayDateObject.getTimezoneOffset()/60,0,0,0))
    //today.setMinutes(0);
    //today.setSeconds(0);
    //today.setMilliseconds(0);
    //console.log(`Current day to analyze ${currentDayToAnalyze}`);
    return today>currentDayToAnalyze;
  }
  return false;
}
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*      Function to check if the location of the service selected (for the given segment) is already occupied for the segment in question (E.g. Streliste B and C)             */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function isLocationBookedInDifferentService(summaryBookings : any, day : any, daysOfWeek:any, isoDaysOfWeek : any, time : any, selectedServiceId: any, locationList:any, shootingInstructorSelected : boolean){
  const idx = daysOfWeek.indexOf(day); 
  const instructor = shootingInstructorSelected ? 1 : 0;
  const currentDayToAnalyze = new Date(`${isoDaysOfWeek[idx]} ${time}`);
  const formatedCurrentSegmentToAnalyze = format(currentDayToAnalyze, 'yyyy-MM-dd HH:mm:ss');
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
  const idx = daysOfWeek.indexOf(day); 
  const currentDayToAnalyze = new Date(`${isoDaysOfWeek[idx]} ${time}`);
  const formatedCurrentSegmentToAnalyze = format(currentDayToAnalyze, 'yyyy-MM-dd HH:mm:ss');
  const segmentLocationStatus = summaryBookings.find((sum:any) => sum.segmentStarts.includes(formatedCurrentSegmentToAnalyze) && parseInt(sum.serviceId)===parseInt(selectedServiceId));
  const filteredValue = shootingInstructorSelected ? summaryBookingInstructor.find((sum:any) => sum.segmentStarts.includes(formatedCurrentSegmentToAnalyze)) : 
    summaryBookings.find((sum:any) => sum.segmentStarts.includes(formatedCurrentSegmentToAnalyze) && parseInt(sum.serviceId)===parseInt(selectedServiceId));
  
  if (filteredValue){
    if(segmentLocationStatus && segmentLocationStatus.segmentLocationFullyBooked){ 
      //For the case that the location is full (we will show the occupancy (for the given configuration (Instructors or NOT instructors) accordingly.))
      return (
        <div style={{width:'100%', height:'100%', display:'flex', flexDirection:'column', pointerEvents:'none'}}>
          <div style={{fontSize:'xx-small', marginLeft:'auto', marginRight:'auto', pointerEvents:'none'}}>
            {Translations.BookingDashboard.FullyOccupied}
          </div>
          <div style={{fontSize:'xx-small', fontWeight:'lighter', paddingRight:'5px', pointerEvents:'none'}}>
            {`${filteredValue.maxOccupancy}/${filteredValue.maxOccupancy}`}
          </div>
        </div>
      );
    }
    if(segmentLocationStatus && shootingInstructorSelected){
      const normalOccupancyBookedLocation = parseInt(segmentLocationStatus.occupancyBooked) - parseInt(segmentLocationStatus.instructoresBooked);
      const occupancyLeftForInstructors   = parseInt(segmentLocationStatus.maxOccupancy) - normalOccupancyBookedLocation;
      /* We will check how many slots for instructors are left, and if are greater or equal to the real available instructos slots we will show ALL otherwise we will adjust accordingly*/
      const maxOccupancyInstructors       = occupancyLeftForInstructors >= parseInt(filteredValue.maxOccupancy) ?  filteredValue.maxOccupancy : occupancyLeftForInstructors;
      /*There are other types of bookings in this segment (E.g.) and we have to decide whether to handle as fully free or partially free*/
      if (parseInt(filteredValue.occupancyBooked) >= maxOccupancyInstructors){ //FULLY OCCUPIED INSTRUCTOR
        return (
          <div style={{width:'100%', height:'100%', display:'flex', flexDirection:'column', pointerEvents:'none'}}>
            <div style={{fontSize:'xx-small', marginLeft:'auto', marginRight:'auto', pointerEvents:'none'}}>
              {Translations.BookingDashboard.FullyOccupied}
            </div>
            <div style={{fontSize:'xx-small', fontWeight:'lighter', paddingRight:'5px', pointerEvents:'none'}}>
              {`${filteredValue.occupancyBooked}/${maxOccupancyInstructors}`}
            </div>
          </div>
        );
      }
      else if(parseInt(filteredValue.occupancyBooked) > 0){
        return (
          <div style={{width:'100%', height:'100%', display:'flex', flexDirection:'column', pointerEvents:'none'}}>
            <div style={{fontSize:'xx-small', marginLeft:'auto', marginRight:'auto', pointerEvents:'none'}}>
              {Translations.BookingDashboard.Partially_Occupied}
            </div>
            <div style={{fontSize:'xx-small', fontWeight:'lighter', paddingRight:'5px', pointerEvents:'none'}}>
              {`${filteredValue.occupancyBooked}/${maxOccupancyInstructors}`}
            </div>
          </div>
        );
      }
      else{
        return (
          <div style={{width:'100%', height:'100%', display:'flex', flexDirection:'column', pointerEvents:'none'}}>
            <div style={{fontSize:'xx-small', marginLeft:'auto', marginRight:'auto', pointerEvents:'none'}}>
              {Translations.BookingDashboard.Free_Segment}
            </div>
            <div style={{fontSize:'xx-small', fontWeight:'lighter', paddingRight:'5px', pointerEvents:'none'}}>
              {`${filteredValue.occupancyBooked}/${maxOccupancyInstructors}`}
            </div>
          </div>
        );
      }
    }
    else if(!segmentLocationStatus && shootingInstructorSelected){
      /* This is the case where there are no normal bookings for the segmentLocation (which means instructor capacity (if there is) is fully available)*/
      return (<div style={{width:'100%', height:'100%', display:'flex', flexDirection:'column', pointerEvents:'none'}}>
        <div style={{fontSize:'xx-small', marginLeft:'auto', marginRight:'auto', pointerEvents:'none'}}>
          {Translations.BookingDashboard.Free_Segment}
        </div>
        <div style={{fontSize:'xx-small', fontWeight:'lighter', paddingRight:'5px', pointerEvents:'none'}}>
          {`${filteredValue.occupancyBooked}/${filteredValue.maxOccupancy}`}
        </div>
      </div>)
    }
    /*  Normal Bookings (W/out instructors) */
    return (
            <div style={{width:'100%', height:'100%', display:'flex', flexDirection:'column', pointerEvents:'none'}}>
              <div style={{fontSize:'xx-small', marginLeft:'auto', marginRight:'auto', pointerEvents:'none'}}>
                {Translations.BookingDashboard.Partially_Occupied}
              </div>
              <div style={{fontSize:'xx-small', fontWeight:'lighter', paddingRight:'5px', pointerEvents:'none'}}>
                {`${filteredValue.occupancyBooked}/${filteredValue.maxOccupancy}`}
              </div>
            </div>
    );
  }
  else{ 
    /* This is for the cases that dont return results */
    /* For the case of normal bookings this means 0 occupancy booked */
    /* For the case of Instructors this means that needs to be calculated */
    if (shootingInstructorSelected){
      const filteredValue = summaryBookingInstructor.find((sum:any) => sum.segmentStarts.includes(formatedCurrentSegmentToAnalyze));
      if (filteredValue){
        return (
                <div style={{width:'100%', height:'100%', display:'flex', flexDirection:'column', pointerEvents:'none'}}>
                  <div style={{fontSize:'xx-small', marginLeft:'auto', marginRight:'auto', pointerEvents:'none'}}>
                    {Translations.BookingDashboard.Free_Segment}
                  </div>
                  <div style={{fontSize:'xx-small', fontWeight:'lighter', paddingRight:'5px', pointerEvents:'none'}}>
                    {`${filteredValue.occupancyBooked}/${filteredValue.maxOccupancy}`}
                  </div>
                </div>
                ) 
      }
    } else{
      return (<div style={{width:'100%', height:'100%', display:'flex', flexDirection:'column', pointerEvents:'none'}}>
                <div style={{fontSize:'xx-small', marginLeft:'auto', marginRight:'auto', pointerEvents:'none'}}>
                  {Translations.BookingDashboard.Free_Segment}
                </div>
                <div style={{fontSize:'xx-small', fontWeight:'lighter', paddingRight:'5px', pointerEvents:'none'}}>
                  {`0/${locationList.find((ll:any) => parseInt(ll.id)===parseInt(selectedServiceId)).capacity}`}
                </div>
              </div>)
    }

  }
}
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                              Based on Occupancy (for the given service) determine if is Occupied, Partly Occupied or Available                                              */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function getOccupancyStatus(summaryBookings : any, summaryBookingInstructor: any, shootingInstructorSelected : boolean, day : any, daysOfWeek:any, isoDaysOfWeek : any, time : any, selectedServiceId: any, selectedOccupancy:any){
  const idx = daysOfWeek.indexOf(day); 
  const currentDayToAnalyze = new Date(`${isoDaysOfWeek[idx]} ${time}`);
  const formatedCurrentSegmentToAnalyze = format(currentDayToAnalyze, 'yyyy-MM-dd HH:mm:ss');
  const segmentLocationStatus = summaryBookings.find((sum:any) => sum.segmentStarts.includes(formatedCurrentSegmentToAnalyze) && parseInt(sum.serviceId)===parseInt(selectedServiceId));
  const filteredValue = shootingInstructorSelected ? summaryBookingInstructor.find((sum:any) => sum.segmentStarts.includes(formatedCurrentSegmentToAnalyze)) : 
    summaryBookings.find((sum:any) => sum.segmentStarts.includes(formatedCurrentSegmentToAnalyze) && parseInt(sum.serviceId)===parseInt(selectedServiceId));
  if (filteredValue){
    //First Check is if the control column for the given segment of time and location is fully booked.
    if(segmentLocationStatus && segmentLocationStatus.segmentLocationFullyBooked){
      return 'occupied';
    }
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
          refreshEntirePlugin,
          selectedWeek,
          blockingSegments  } = React.useContext(BookingContext);

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
    //0 is Segment Blocked
    if (isSegmentBlocked(day, daysOfWeek, isoDaysOfWeek, time, blockingSegments, selectedLocation, locationList)){
      return getBlockedReason(day, daysOfWeek, isoDaysOfWeek, time, blockingSegments, selectedLocation, locationList);
    }
    //1st Verification Check if the day is in the past and disable the cell
    if (isDayInThePast(day, daysOfWeek, isoDaysOfWeek, time)){
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
    const segmentLocationStatus = summaryBookingSegments.find((sum:any) => sum.segmentStarts.includes(timeSegment) && parseInt(sum.serviceId)===parseInt(selectedLocation));
    const normalBookings = summaryBookingSegments.find((sum:any) => sum.segmentStarts.includes(timeSegment) && parseInt(sum.serviceId)===parseInt(selectedLocation));
    const filteredValue = shootingInstructor ? sumInstBookingSegments.find((sum:any) => sum.segmentStarts.includes(timeSegment)) : 
      summaryBookingSegments.find((sum:any) => sum.segmentStarts.includes(timeSegment) && parseInt(sum.serviceId)===parseInt(selectedLocation));
    if(filteredValue){
      if(!shootingInstructor){
        return (parseInt(filteredValue.occupancyBooked) < parseInt(filteredValue.maxOccupancy))
      }
      else{
        //For the case of Shooting Instructor (FALSE means is not Available)
        if(segmentLocationStatus){
          const shouldBeBlocked = parseInt(segmentLocationStatus.occupancyBooked) >= parseInt(segmentLocationStatus.maxOccupancy) && //Evaluate if the Location has Capacity
                                  parseInt(filteredValue.occupancyBooked) >= parseInt(filteredValue.maxOccupancy)                    //Evaluate if Instructors have Capacity
          return shouldBeBlocked;
        }
        else if(typeof filteredValue === 'undefined' && shootingInstructor){
          return false
        }
        else{
          return true
        }
      }
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
    //0 is Segment Blocked
    if (isSegmentBlocked(day, daysOfWeek, isoDaysOfWeek, time, blockingSegments, selectedLocation, locationList)){
      return BLOCKED_CELL;
    }
    //1st Verification Check if the day is in the past and disable the cell
    if (isDayInThePast(day, daysOfWeek, isoDaysOfWeek, time)){
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
      const segmentToAnalyze = new Date(`${isoDaysOfWeek[idx]} ${time}:00`);
      if(isTimeSegmentAvailable(format(segmentToAnalyze, 'yyyy-MM-dd HH:mm:ss'))){
        available.push(`${isoDaysOfWeek[idx]} ${time}:00`);
      }
      else{
        notAvailable.push(`${isoDaysOfWeek[idx]} ${time}:00`);
      }
    })
  })
  setAvailableSegments(available);
  setNotAvailableSegments(notAvailable);
  },[selectedLocation, selectedWeek, shootingInstructor, refreshEntirePlugin])

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
        <div className={`reservation-cal-table-day-block ${status(day,timeToShow)} ${selected(`${isoDaysOfWeek[idx]} ${timeToShow}:00`)}`} id={`${isoDaysOfWeek[idx]} ${timeToShow}:00`} style={{margin:'0px', padding:'0px'}} onClick={(e) => handlerClick(e)}>
          {getOccupancy(day,timeToShow)}
        </div>)
      })}
    </div>)})}
  </>
  )
}