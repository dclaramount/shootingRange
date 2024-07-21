import React from 'react';
import {format } from 'date-fns';
import { ManagementDashboardContext } from '../../../../Context/ManagementDashboardContext';

function bookedOccupancy(summaryBookings : any, day : any, daysOfWeek:any, isoDaysOfWeek : any, time : any, selectedServiceId: any, locationList:any){
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
  const names = [];
  //bookingsForTheSegment.forEach((bfts : any) => names.push(bfts.))
  const occupancyToShow =   bookingsForTheSegment.length>0 ? sum : ''
  if(bookingsForTheSegment.length>0){
    return (
      <div className="reservation-cal-legend-item occupied" style={{display:'flex', flexDirection:'row', width:'100%', height:'100%', padding:'0 5px 0 5px', margin:'0px'}}>
        <span style={{width:'100%', height:'100%', textAlign:'left'}}>
          {/*
            <div style={{fontSize:'8px', margin:'0px', padding:'0px', fontWeight:'lighter'}}>
              Jiri Kolacia
            </div>
            <div style={{fontSize:'8px', margin:'0px', padding:'0px', fontWeight:'lighter'}}>
              Diego Claramount
            </div>
            <div style={{fontSize:'8px', margin:'0px', padding:'0px', fontWeight:'lighter'}}>
              Frankie Claramount...
            </div>*/}
            {occupancyToShow}
        </span>
        <em style={{marginBottom:'auto', marginTop:'5px', display: 'inline-block', width:'10px', height:'10px', border:`1px solid ${color}`, background:`${color}`, color:`${color}`, borderRadius:'50%', margin:'0 5px 0 auto'}}></em>
      </div>
    )
  }
  else{ return('') };
  
}
export function DaysColumn(){

  const { 
          timesToShow,                   
          daysOfWeek,                    
          selectedSegment,              
          setSelectedSegment, 
          isoDaysOfWeek,
          allInvoices,  
          summaryBookingSegments, 
          locationList,             
          selectedLocation, 
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
        <div className={`reservation-cal-table-day-block ${selected(`${isoDaysOfWeek[idx]} ${timeToShow}:00`)}`} id={`${isoDaysOfWeek[idx]} ${timeToShow}:00`} style={{padding:'0px'}} onClick={(e) => handlerClick(e)}>
          {bookedOccupancy(summaryBookingSegments, day, daysOfWeek, isoDaysOfWeek, `${timeToShow}:00`, parseInt(selectedLocation), locationList)}
        </div>)
      })}
    </div>)})}
  </>
  )
}