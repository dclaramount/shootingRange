import React from 'react';
import { BookingContext } from '../Context/BookingContext';

export function DurationOfBooking(){

  const [showAlertMessage, setShowAlertMessage] = React.useState(false);

  const {selectedBookingDuration, setSelectedBookingDuration , selectedSegment,  setShowingPage, setSelectedSegment, availableSegments, notAvailableSegments} = React.useContext(BookingContext);

  const onReduceSegmentDuration = (e : any) => {
    console.log(selectedSegment);
    if(selectedBookingDuration>1 && selectedSegment.length>0){
      setSelectedBookingDuration(selectedBookingDuration-1);
      const tempArray = selectedSegment;
      console.log(tempArray);
      const reduceArray = tempArray.splice(-1)
      console.log(reduceArray);
      setSelectedSegment(tempArray.splice(-1));
    }
    console.log("Reduce Duration");
    console.log(e);
  };
  const onIncreaseSegmentDuration = (e : any) => {
    //TODO MAX HOURS
    if(selectedBookingDuration<3 && selectedSegment.length>0){
      const date = new Date(selectedSegment[0]);
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      const month = date.getMonth() < 9 ? `0${date.getMonth()+1}` : date.getMonth()+1;

      const newBaseDate = `${date.getFullYear()}-${month}-${day} ${date.getHours()}:00`
      const newToCheckDate = `${date.getFullYear()}-${month}-${day} ${date.getHours()+(selectedBookingDuration)}:00`

      const baseDate = `${date.toLocaleDateString('en-CA')} ${date.getHours()}:00`;
      const toCheckDate = `${date.toLocaleDateString('en-CA')} ${date.getHours()+1}:00`;

      console.log();

      console.log(toCheckDate);
      console.log(newToCheckDate);

      if(notAvailableSegments.includes(newToCheckDate)){
        console.log("ALERT FOR NOT AVAILABILITY")
        setShowingPage("POPUP_LENGTH");
      }
      else{
        setSelectedBookingDuration(selectedBookingDuration+1);
        const tempArray = selectedSegment;
        selectedSegment.push(newToCheckDate);
        setSelectedSegment(selectedSegment);
      }
    }
    console.log("Increase Duration");
    console.log(e);
  };
  return(
    <div id={"Lenght_Reservation"} className="reservation-order-row">
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