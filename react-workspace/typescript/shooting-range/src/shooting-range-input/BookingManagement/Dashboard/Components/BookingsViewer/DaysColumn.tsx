import React from 'react';
import {format } from 'date-fns';
import { ManagementDashboardContext } from '../../../../Context/ManagementDashboardContext';
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                              CONSTANTS                                                                                                      */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const BLOCKED_CELL = 'occupied';
const EMPTY_OCCUPANCY = '';


export function DaysColumn(){

  const { //locationList, 
          timesToShow,                   
          daysOfWeek,                    
          selectedSegment,              
          setSelectedSegment, 
          isoDaysOfWeek,                
          //selectedOccupancy,            
          //setAvailableSegments,         
          //setSelectedBookingDuration,   
          //setNotAvailableSegments,
          //defaultDuration,              
          summaryBookingSegments, 
          //selectedLocation, 
          //sumInstBookingSegments, 
          //shootingInstructor  
        } 
          = React.useContext(ManagementDashboardContext);

  const daysOftheWeek = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'];
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                      Function to Handle the Click on the Cell                                                                               */
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const handlerClick = (e : any) => {
    if(!e.target.className.includes('occupied')){
      const array = [];
      array.push(e.target.id)
      /*
      setSelectedSegment(array);
      setSelectedBookingDuration(defaultDuration);*/
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
        <div className={`reservation-cal-table-day-block ${selected(`${isoDaysOfWeek[idx+1]} ${timeToShow}:00`)}`} id={`${isoDaysOfWeek[idx+1]} ${timeToShow}:00`} onClick={(e) => handlerClick(e)}>
          'PLACEHOLDER'
        </div>)
      })}
    </div>)})}
  </>
  )
}