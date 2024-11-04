import React from 'react';
import {format } from 'date-fns';
import {BookingManagementContext} from "../../../../Context/BookingManagementContext";
import {EditBookingsContext} from "../../../../../Common/Contexts/EditBookingsContext.";
import {EditBookingsContextType} from "../../../../../Common/Types/interfaces";
import {daysOfTheWeekCZ} from "../../../../../Common/Types/constants";

function bookedOccupancy(summaryBookings : any, day : any, daysOfWeek:any, isoDaysOfWeek : any, time : any, selectedServiceId: any, locationList:any, allInvoices:any, selectedLocation:any){
    const idx = daysOfWeek.indexOf(day);
  const currentDayToAnalyze = new Date(`${isoDaysOfWeek[idx+1]} ${time}`);
  const formatedCurrentSegmentToAnalyze = format(currentDayToAnalyze, 'yyyy-MM-dd HH:mm:ss');
  const bookingsForTheSegment = summaryBookings.length>0 ? summaryBookings.filter((sb : any) => (sb.segmentStarts===formatedCurrentSegmentToAnalyze) && (parseInt(sb.serviceId)===parseInt(selectedServiceId))) : [];
  const bookingsWithInstructor = bookingsForTheSegment.filter((bfts:any) => parseInt(bfts.instructoresBooked)===1);
  const color = bookingsWithInstructor.length > 0 ? '#F2B51B' : 'black'
  var sum = 0;
  for (var i = 0; i < bookingsForTheSegment.length; i++) {
    sum = sum + parseInt(bookingsForTheSegment[i].occupancyBooked);
  }
  const filtered = allInvoices.filter((sb : any) => ((new Date(sb.startTime * 1000)).toLocaleString('sv-SE', { timeZone: 'CET'}).includes(formatedCurrentSegmentToAnalyze) && (parseInt(sb.serviceId)===parseInt(selectedLocation))));

  const names : string[]= [];
  filtered.forEach((bfts : any, idx:number) => {if(idx<2){names.push(bfts.customerName)}else if(idx===2){names.push(`${bfts.customerName}...`)}})
  const occupancyToShow =   bookingsForTheSegment.length>0 ? sum : ''
  if(bookingsForTheSegment.length>0){
    return (
      <div className="reservation-cal-legend-item occupied" style={{display:'flex', flexDirection:'row', width:'100%', height:'100%', padding:'0 5px 0 5px', margin:'0px'}}>
        <span style={{width:'100%', height:'100%', textAlign:'left'}} id={`${isoDaysOfWeek[idx+1]} ${time}`}>
          {names.map((n:any) => 
            <div style={{fontSize:'8px', margin:'0px', padding:'0px', fontWeight:'lighter', pointerEvents:'none'}}>
            {n}
          </div>
          )}
        </span>
        <em style={{marginBottom:'auto', marginTop:'5px', display: 'inline-block', width:'10px', height:'10px', border:`1px solid ${color}`, background:`${color}`, color:`${color}`, borderRadius:'50%', margin:'0 5px 0 auto', pointerEvents:'none'}}></em>
      </div>
    )
  }
  else{ return('') };
}
export function DaysColumn({context} : any){
    const cEditBookings : EditBookingsContextType = React.useContext(EditBookingsContext);

    //Destructuring Editing Booking Management Tab Context
    const bookingManagementContext    = React.useContext(BookingManagementContext);
    const setSelectedSegment          = bookingManagementContext.setSelectedSegment;
    console.log(cEditBookings);

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
    if(cEditBookings.selectedSegment.includes(clickedCell)){
      if(cEditBookings.selectedSegment.length===1){
        return 'active first active last'
      }
      if(cEditBookings.selectedSegment.indexOf(clickedCell)===0){
        return 'active first'
      }
      else if(cEditBookings.selectedSegment.indexOf(clickedCell)===cEditBookings.selectedSegment.length-1){
        return 'active last'
      }
      else{
        return 'active'
      }
    }
  } 
  return(
    <>
      {cEditBookings.daysOfWeek.map((day : string, idx : number) => {
        return(
        <div className="reservation-cal-table-day">
        <div className="reservation-cal-table-day-head">
          <span>
          {daysOfTheWeekCZ[idx]}
          </span>
          <br/>
          <strong>
            {day}
          </strong>
        </div>
        {cEditBookings.businessHours.map((timeToShow : string) => {
        return(
        <div className={`reservation-cal-table-day-block ${selected(`${cEditBookings.daysOfWeekISOFormat[idx+1]} ${timeToShow}:00`)}`} id={`${cEditBookings.daysOfWeekISOFormat[idx+1]} ${timeToShow}:00`} style={{padding:'0px'}} onClick={(e) => handlerClick(e)}>
          {bookedOccupancy(cEditBookings.summaryBookingSegments, day, cEditBookings.daysOfWeek, cEditBookings.daysOfWeekISOFormat, `${timeToShow}:00`, cEditBookings.selectedLocation, cEditBookings.serviceList,cEditBookings.bookingsSummaryView, cEditBookings.selectedLocation)}
        </div>)
      })}
    </div>)})}
  </>
  )
}