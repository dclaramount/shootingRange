import React from 'react';
import { BookingContext } from '../Context/BookingContext';

export function DurationOfBooking(){
  const { selectedBookingDuration,  setSelectedBookingDuration, 
          selectedSegment,          setShowWarningChooseAnotherSegment, 
          setSelectedSegment,       notAvailableSegments, isNormalComputer
        } = React.useContext(BookingContext);

 /*--------------Handler for Reduction of Length of Reservation----------------*/
  const onReduceSegmentDuration = (e: any) => {
    setSelectedSegment((prev: any) => {
      if (selectedBookingDuration > 1 && prev.length > 0) {
        // Reduce duration first
        setSelectedBookingDuration((d: any) => parseInt(d) - 1);

        // Remove last segment WITHOUT mutating prev
        return prev.slice(0, -1);
      }
      return prev;
    });
  };

  /*--------------Handler for Increase of Length of Reservation----------------*/
  const onIncreaseSegmentDuration = (e: any) => {
    if (selectedBookingDuration >= 3) return;
  
    setSelectedSegment((prev: any) => {
      if (prev.length === 0) return prev;
  
      const base = new Date(prev[0]);
      const day = base.getDate() < 10 ? `0${base.getDate()}` : String(base.getDate());
      const month = base.getMonth() < 9 ? `0${base.getMonth() + 1}` : String(base.getMonth() + 1);
  
      const nextHour = base.getHours() + parseInt(selectedBookingDuration);
      const newToCheckDate = `${base.getFullYear()}-${month}-${day} ${nextHour}:00`;
  
      // If not available, show warning and do not change selection
      if (notAvailableSegments.includes(newToCheckDate)) {
        setShowWarningChooseAnotherSegment(true);
        return prev;
      }
  
      // Otherwise extend duration and add the new segment (new array ref)
      setSelectedBookingDuration((d: any) => parseInt(d) + 1);
      return [...prev, newToCheckDate];
    });
  };
  return(
    <>
    <div id={"Lenght_Reservation"} className="reservation-order-row" style={styles.container(isNormalComputer)}>
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
const styles = {
  container: (isNormalComputer: boolean)  => ({
   width: isNormalComputer ? '100%' : '100%'
  })
};