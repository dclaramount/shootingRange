import React from 'react';
import { BookingContext } from '../Context/BookingContext';

export function DurationOfBooking(){
  const { selectedBookingDuration,  setSelectedBookingDuration, 
          selectedSegment,          setShowWarningChooseAnotherSegment, 
          setSelectedSegment,       notAvailableSegments
        } = React.useContext(BookingContext);

  /*--------------Handler for Reduction of Length of Reservation----------------*/
  const onReduceSegmentDuration = (e : any) => {
    if(selectedBookingDuration>1 && selectedSegment.length>0){
      setSelectedBookingDuration(selectedBookingDuration-1);
      const last = selectedSegment.pop();
      const tempArray : any[] = [];
      selectedSegment.map((seg : any, idx: number) => {
        if(last !== seg){
          tempArray.push(seg);
        }
      })
      setSelectedSegment(tempArray);
    }
  };
  /*--------------Handler for Increase of Length of Reservation----------------*/
  const onIncreaseSegmentDuration = (e : any) => {
    //TODO MAX HOURS
    if(selectedBookingDuration<3 && selectedSegment.length>0){
      const date = new Date(selectedSegment[0]);
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      const month = date.getMonth() < 9 ? `0${date.getMonth()+1}` : date.getMonth()+1;

      const newBaseDate = `${date.getFullYear()}-${month}-${day} ${date.getHours()}:00`
      const newToCheckDate = `${date.getFullYear()}-${month}-${day} ${date.getHours()+(parseInt(selectedBookingDuration))}:00`

      console.log(`NOT AVAILABLE SEGMENTS ARE`);
      console.log(notAvailableSegments);
      if(notAvailableSegments.includes(newToCheckDate)){
        setShowWarningChooseAnotherSegment(true);
      }
      else{
        setSelectedBookingDuration(parseInt(selectedBookingDuration)+1);
        const tempArray = selectedSegment;
        selectedSegment.push(newToCheckDate);
        setSelectedSegment(selectedSegment);
      }
    }
  };
  return(
    <>
    <div id={"Lenght_Reservation"} className="reservation-order-row">
    <label htmlFor="select-box-location">Délka rezervace</label>
    <div className="input-duration-wrap">
        <a className="input-number-minus" onClick={(e) => onReduceSegmentDuration(e)} style={{cursor:'pointer'}}>
        <span style={{ display:'flex'}}>&#8722;</span> 
        </a>
        <input type="text" name="duration" maxLength={10} size={50} className="input-duration" data-number-max="3" id="input-duration" value="2">
        </input>
        <input type="text" className="input-duration-display" readOnly={true} value={`${selectedBookingDuration}h`}>
        </input>
        <a className="input-number-plus" onClick={(e) => onIncreaseSegmentDuration(e)} style={{cursor:'pointer'}}>
        <span style={{ display:'flex', marginBottom:'10px'}}>&#43;</span>            
        </a>
    </div>
</div>
    </>
  )
}