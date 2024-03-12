import React from 'react';
import { BookingContext } from '../Context/BookingContext';


export function DurationOfBooking(){

  const {selectedBookingDuration, setSelectedBookingDuration , selectedSegment,  setSelectedSegment, availableSegments, notAvailableSegments} = React.useContext(BookingContext);


  const onReduceSegmentDuration = (e : any) => {
    console.log(selectedSegment);
    if(selectedBookingDuration>1 && selectedSegment.length>0){
      setSelectedBookingDuration(selectedBookingDuration-1);
    }
    console.log("Reduce Duration");
    console.log(e);
  };
  const onIncreaseSegmentDuration = (e : any) => {
    //TODO MAX HOURS
    if(selectedBookingDuration<3 && selectedSegment.length>0){
      const date = new Date(selectedSegment);
      const baseDate = `${date.toLocaleDateString('en-CA')} ${date.getHours()}:00`;
      const toCheckDate = `${date.toLocaleDateString('en-CA')} ${date.getHours()+1}:00`;
      if(notAvailableSegments.includes(toCheckDate)){
        console.log("ALERT FOR NOT AVAILABILITY")
      }
      else{
        setSelectedBookingDuration(selectedBookingDuration+1);
      }
    }
    console.log("Increase Duration");
    console.log(e);
  };
  
  return(
    <div className="reservation-order-row">
    <label htmlFor="select-box-location">Délka rezervace</label>
    <div className="input-duration-wrap">
        <a className="input-number-minus" onClick={(e) => onReduceSegmentDuration(e)} style={{cursor:'pointer'}}>
            <span className="fa fa-minus">
            </span>
        </a>
        <input type="text" name="duration" maxLength={10} size={50} className="input-duration" data-number-max="3" id="input-duration" value="2">
        </input>
        <input type="text" className="input-duration-display" readOnly={true} value={`${selectedBookingDuration}h`}>
        </input>
        <a className="input-number-plus" onClick={(e) => onIncreaseSegmentDuration(e)} style={{cursor:'pointer'}}>
            <span className="fa fa-plus">
            </span>
        </a>
    </div>
</div>
  )
}