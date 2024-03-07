import React from 'react';
import { BookingContext } from '../Context/BookingContext';


export function NumberOfPeople(){

  const {selectedOccupancy, setSelectedOccupancy} = React.useContext(BookingContext);


  const onReduceOccupancy = (e : any) => {
    if(selectedOccupancy>1){
      setSelectedOccupancy(selectedOccupancy-1);
    }
    console.log("Reduce Occupancy");
    console.log(e);
  };
  const onIncreaseOccupancy = (e : any) => {
    if(selectedOccupancy<3){
      setSelectedOccupancy(selectedOccupancy+1);
    }
    console.log("Increase Occupancy");
    console.log(e);
  };
  
  return(
    <div className="reservation-order-row">
      <label htmlFor="select-box-location">Počet osob</label>
        <div className="input-duration-wrap">
          <a className="input-number-minus" onClick={(e) => onReduceOccupancy(e)} style={{cursor:'pointer'}}>
            <span className="fa fa-minus" />
          </a>
          <input type="text" name="personCount" maxLength={10} size={50} className="input-number" data-number-max="3" id="frm-reservationCalendar-orderForm-personsCount" value={selectedOccupancy}/>
          <a className="input-number-plus" onClick={(e) => onIncreaseOccupancy(e)} style={{cursor:'pointer'}}>
            <span className="fa fa-plus" />
          </a>
        </div>
    </div>
  )
}