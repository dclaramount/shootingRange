import React from 'react';
import { BookingContext } from '../Context/BookingContext';


export function DurationOfBooking(){

  const {selectedBookingDuration, setSelectedBookingDuration} = React.useContext(BookingContext);


  const onReduceSegmentDuration = (e : any) => {
    if(selectedBookingDuration>1){
      setSelectedBookingDuration(selectedBookingDuration-1);
    }
    console.log("Reduce Duration");
    console.log(e);
  };
  const onIncreaseSegmentDuration = (e : any) => {
    if(selectedBookingDuration<3){
      setSelectedBookingDuration(selectedBookingDuration+1);
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